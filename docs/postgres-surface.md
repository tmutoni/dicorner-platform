# Backend: DiCorner App Development

## Roadmap 

### Phase 0: Integration, validation \+ Observability (logging, trace, persistence)

goals

1. Link to Postgres” (get a `DATABASE_URL` and plug into Vercel \+ [Next.js](http://Next.js)) \-\>instructions  
2. Exact SQL for `events` \+ `rejected_events` (+ `decisions`, `explanations` for later)  
3. Minimal TypeScript glue to start writing events

---

## **1\. Link Postgres to your app (DATABASE\_URL)**

You need exactly one thing from any managed Postgres (Neon, Supabase, Vercel Postgres, etc.):

A connection string like:

`postgres://USER:PASSWORD@HOST:PORT/DB_NAME?sslmode=require`

Once you have that:

### **a) Add `DATABASE_URL` in Vercel**

In Vercel dashboard for `dicorner` project:

* Settings → Environment Variables:  
  * Key: `DATABASE_URL`  
  * Value: your full Postgres URL  
  * Target: `Production` (and `Preview` if you want)

Deployments will now see `process.env.DATABASE_URL`.

### **b) Add `DATABASE_URL` locally**

In your repo root (or `web/` if you keep env there), create `.env.local`:

DATABASE\_URL="postgres://USER:PASSWORD@HOST:PORT/DB\_NAME?sslmode=require"

Never commit this file.

### **c) Install Postgres client in your Next.js app**

From `web/`:

npm install pg

Create `web/src/lib/db.ts`:

// web/src/lib/db.ts  
import { Pool } from "pg";

if (\!process.env.DATABASE\_URL) {  
  throw new Error("DATABASE\_URL is not set");  
}

const pool \= new Pool({  
  connectionString: process.env.DATABASE\_URL,  
  // ssl: { rejectUnauthorized: false }, // uncomment if your provider requires  
});

export async function query\<T \= unknown\>(text: string, params?: unknown\[\]) {  
  const res \= await pool.query\<T\>(text, params);  
  return res;  
}

You now have a single entrypoint for DB: `query(sql, params)`.

---

## **2\. Create the core tables in Postgres**

Use your provider’s SQL console (or `psql`). Run these statements **once**.

### **a) `events` (canonical events)**

CREATE TABLE IF NOT EXISTS events (  
  id UUID PRIMARY KEY,  
  trace\_id UUID NOT NULL,  
  client\_id TEXT NOT NULL,  
  user\_id TEXT NOT NULL,  
  session\_id TEXT NOT NULL,  
  event\_name TEXT NOT NULL,  
  funnel\_stage TEXT NOT NULL,  
  properties JSONB NOT NULL,  
  timestamp TIMESTAMPTZ NOT NULL,  
  raw\_source TEXT NOT NULL,  
  raw\_event\_name TEXT NOT NULL,  
  created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
);

CREATE INDEX IF NOT EXISTS idx\_events\_trace\_id ON events (trace\_id);  
CREATE INDEX IF NOT EXISTS idx\_events\_client\_user\_session  
  ON events (client\_id, user\_id, session\_id);

### **b) `rejected_events` (bad payloads, unmapped events, etc.)**

CREATE TABLE IF NOT EXISTS rejected\_events (  
  id UUID PRIMARY KEY,  
  trace\_id UUID NOT NULL,  
  client\_id TEXT,  
  raw\_payload JSONB NOT NULL,  
  reason\_code TEXT NOT NULL,  
  created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
);

CREATE INDEX IF NOT EXISTS idx\_rejected\_trace\_id ON rejected\_events (trace\_id);  
CREATE INDEX IF NOT EXISTS idx\_rejected\_reason ON rejected\_events (reason\_code);

### **c) `decisions` (NBA outputs) – for Week 2+**

CREATE TABLE IF NOT EXISTS decisions (  
  id UUID PRIMARY KEY,  
  trace\_id UUID NOT NULL,  
  client\_id TEXT NOT NULL,  
  user\_id TEXT,  
  session\_id TEXT,  
  nba\_action TEXT NOT NULL,  
  nba\_category TEXT NOT NULL,  
  impact\_direction TEXT NOT NULL,  
  confidence DOUBLE PRECISION NOT NULL,  
  effort TEXT NOT NULL,  
  why TEXT NOT NULL,  
  rule\_pack\_version TEXT NOT NULL,  
  created\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
);

CREATE INDEX IF NOT EXISTS idx\_decisions\_trace\_id ON decisions (trace\_id);

### **d) `explanations` (LLM layer) – for Week 3+**

CREATE TABLE IF NOT EXISTS explanations (  
  id UUID PRIMARY KEY,  
  trace\_id UUID NOT NULL,  
  client\_id TEXT NOT NULL,  
  user\_id TEXT,  
  session\_id TEXT,  
  decision\_id UUID,  
  scores JSONB NOT NULL,  
  segments JSONB,  
  nba JSONB,  
  text TEXT NOT NULL,  
  explanation\_version TEXT NOT NULL,  
  explanation\_source TEXT NOT NULL,  
  generated\_at TIMESTAMPTZ NOT NULL DEFAULT now()  
);

CREATE INDEX IF NOT EXISTS idx\_explanations\_trace\_id ON explanations (trace\_id);

For today, you only **need** `events` and `rejected_events`. The others are ready for when you wire NBA \+ explainability.

---

## **3\. Wire `/api/ingest` to Postgres**

You already have `mapToCanonical` \+ logging. Now add persistence.

### **a) Add helpers**

`web/src/lib/eventsStore.ts`:

// web/src/lib/eventsStore.ts  
import { query } from "./db";  
import { CanonicalEvent } from "./schema";

export async function saveEvent(e: CanonicalEvent) {  
  await query(  
    \`  
    INSERT INTO events (  
      id,  
      trace\_id,  
      client\_id,  
      user\_id,  
      session\_id,  
      event\_name,  
      funnel\_stage,  
      properties,  
      timestamp,  
      raw\_source,  
      raw\_event\_name  
    )  
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)  
    \`,  
    \[  
      e.event\_id,  
      e.trace\_id,  
      e.client\_id,  
      e.user\_id,  
      e.session\_id,  
      e.event\_name,  
      e.funnel\_stage,  
      JSON.stringify(e.properties ?? {}),  
      e.timestamp,  
      e.raw\_source,  
      e.raw\_event\_name,  
    \],  
  );  
}

export async function saveRejectedEvent(args: {  
  id: string;  
  trace\_id: string;  
  client\_id?: string;  
  raw\_payload: unknown;  
  reason\_code: string;  
}) {  
  await query(  
    \`  
    INSERT INTO rejected\_events (  
      id,  
      trace\_id,  
      client\_id,  
      raw\_payload,  
      reason\_code  
    )  
    VALUES ($1,$2,$3,$4,$5)  
    \`,  
    \[  
      args.id,  
      args.trace\_id,  
      args.client\_id ?? null,  
      JSON.stringify(args.raw\_payload ?? {}),  
      args.reason\_code,  
    \],  
  );  
}

### **b) Use them in `/api/ingest/route.ts`**

// web/src/app/api/ingest/route.ts  
import { NextRequest, NextResponse } from "next/server";  
import { mapToCanonical, validateCanonical, RawEventPayload } from "@/lib/schema";  
import { logEvent, logRejected, newTraceId } from "@/lib/logging";  
import { saveEvent, saveRejectedEvent } from "@/lib/eventsStore";

export async function POST(req: NextRequest) {  
  const headerTrace \= req.headers.get("x-trace-id");  
  const traceId \= newTraceId(headerTrace);

  let raw: RawEventPayload;

  try {  
    raw \= await req.json();  
  } catch {  
    const id \= crypto.randomUUID();  
    await saveRejectedEvent({  
      id,  
      trace\_id: traceId,  
      client\_id: undefined,  
      raw\_payload: null,  
      reason\_code: "INVALID\_JSON",  
    });  
    logRejected(null, undefined, "INVALID\_JSON", traceId);  
    return NextResponse.json(  
      { error: "invalid\_json", trace\_id: traceId },  
      { status: 400 },  
    );  
  }

  try {  
    const canonical \= mapToCanonical(raw, traceId);  
    validateCanonical(canonical);

    await saveEvent(canonical);  
    logEvent(canonical);

    return NextResponse.json(  
      { status: "accepted", trace\_id: traceId },  
      { status: 202 },  
    );  
  } catch (err: unknown) {  
    const reason \=  
      err instanceof Error ? err.message : "UNKNOWN\_INGEST\_ERROR";

    const id \= crypto.randomUUID();  
    await saveRejectedEvent({  
      id,  
      trace\_id: traceId,  
      client\_id: raw.client\_id,  
      raw\_payload: raw,  
      reason\_code: reason.startsWith("UNMAPPED\_EVENT")  
        ? "UNMAPPED\_EVENT"  
        : "INVALID\_EVENT",  
    });

    logRejected(raw, raw.client\_id, reason, traceId);

    const status \= reason.startsWith("UNMAPPED\_EVENT") ? 422 : 400;

    return NextResponse.json(  
      { error: "invalid\_event", reason, trace\_id: traceId },  
      { status },  
    );  
  }  
}

You now have:

* Canonical events landing in `events`.  
* Rejected payloads landing in `rejected_events`.  
* Logs in Vercel with `trace_id`.

---

## **4\. Minimal Postgres “rest of steps” for Week 0–1**

In Postgres, your work for this week is exactly:

1. Create `events` and `rejected_events` tables (SQL above).  
2. Confirm inserts work:  
   * Hit `/api/ingest` with a good payload → row exists in `events`.  
   * Hit with malformed payload → row exists in `rejected_events` with `reason_code`.  
3. Add simple read query for debugging:

\-- Show latest events  
SELECT \* FROM events ORDER BY created\_at DESC LIMIT 20;

\-- Show latest rejected  
SELECT \* FROM rejected\_events ORDER BY created\_at DESC LIMIT 20;

\-- Reconstruct a trace  
SELECT \* FROM events WHERE trace\_id \= '...'  
ORDER BY timestamp;

That’s the full Postgres surface area you need right now.

Everything else (cognitive scoring, NBA, explanations) can build on this foundation without changing the DB shape you just created.

**Neon**  
Create account → New Project   
2\. Choose Postgres version → Create   
3\. Go to: Dashboard → Connection Details → “Connection string”   
4\. Copy: postgres://USER:PASSWORD@HOST/dbname   
1\. Put into:  
  .env.local   
2\. Vercel → Settings → Environment Variables → DATABASE\_URL.

Current step: [https://github.com/login/oauth/authorize?scope=user%3Aemail\&state=CBegi9kCl8N1V\_fGDMpYZ5w3vyUHFIFNLi\_dA\_ThzVs.-jUfwy12sLI.FggMbeJNQvGDpiNKH3TE\_A.eyJydSI6Imh0dHBzOi8vY29uc29sZS5uZW9uLnRlY2gvYXV0aC9rZXljbG9hay9jYWxsYmFjayIsInJ0IjoiY29kZSIsInN0IjoiRUczOEV2V0syRjQ0ZFF1QU8tYVE5UT09LCwsIn0\&response\_type=code\&client\_id=08cb4f3eb1c9976a92ee\&redirect\_uri=https%3A%2F%2Fconsole.neon.tech%2Frealms%2Fprod-realm%2Fbroker%2Fgithub%2Fendpoint](https://github.com/login/oauth/authorize?scope=user%3Aemail&state=CBegi9kCl8N1V_fGDMpYZ5w3vyUHFIFNLi_dA_ThzVs.-jUfwy12sLI.FggMbeJNQvGDpiNKH3TE_A.eyJydSI6Imh0dHBzOi8vY29uc29sZS5uZW9uLnRlY2gvYXV0aC9rZXljbG9hay9jYWxsYmFjayIsInJ0IjoiY29kZSIsInN0IjoiRUczOEV2V0syRjQ0ZFF1QU8tYVE5UT09LCwsIn0&response_type=code&client_id=08cb4f3eb1c9976a92ee&redirect_uri=https%3A%2F%2Fconsole.neon.tech%2Frealms%2Fprod-realm%2Fbroker%2Fgithub%2Fendpoint) 