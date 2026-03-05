# Backend: DiCorner App Development

- [ ] ### Phase 0: Integration, validation \+ Observability (logging, trace, persistence)

- [ ] ### Phase 1: Scoring \+ Sanity Gates

- [ ] ### Phase 2: NBA Engine \+ Domain Rules

- [ ] ### Phase 3: Explainability \+ Dashboard

- [ ] ### Phase 4: Audit \+ Compliance Artifacts\_ Security \+ Ops

### Phase 0: Integration, validation \+ Observability (logging, trace, persistence)

1. **event mapping → canonical schema**  
2. **ingestion validation \+ rejection rules**  
3. **logging scaffolding (event/score/decision/override/explanation)**  
4. **trace\_id propagation end-to-end**

## Phase0\_Epic 0: Integration \+ Observability 

Goal: For any `trace_id`, reconstruct `events → scores → decisions` reliably.

**Step 1: DB Persistence for Events**

1. Add `events` table in Postgres.  
2. Implement `saveEvent(canonicalEvent)` in `lib/db.ts`.  
3. Call `saveEvent` at the end of `/api/ingest` after validation.

**Step 2: Rejection Store**

1. Create `rejected_events` table with:  
   * `id`, `trace_id`, `client_id`, `raw_payload`, `reason_code`, `created_at`.  
2. In `/api/ingest`, when validation/mapping fails:  
   * write into `rejected_events`.  
   * return structured error with `reason_code`.

**Step 3: Logging \+ Trace Consistency**

1. Ensure:  
   * `EVENT_LOG` fires after mapping (and before `saveEvent` failure).  
   * `SCORE_LOG`, `DECISION_LOG` already wired via `logging.ts`.  
2. Confirm every log includes:  
   * `trace_id`, `client_id`, `user_id`, `session_id`, `timestamp`.  
3. Add `EXPLANATION_LOG` type definition to `logging.ts` (no implementation yet; just shape).

**Step 4: Traceability Query**

1. Write a short SQL script or manual query set to:  
   * list all events for a `trace_id`  
   * list score logs for the same `trace_id`  
   * list decision logs for the same `trace_id`  
2. Manually run this for a few test sessions until you can trace:  
   * raw request → canonical events → score response → logs.

When this is stable, Week 0–1 is actually done.

Assumptions 

* I control an ingestion service (`ingestion-api`).  
* I have (or can add) a scoring service \+ decision engine.  
* Services can log structured JSON.  
* I can add 1–2 small tables/collections for events and logs.

**Ingestion API**

## **1\. Define Canonical Event Schema (event mapping → canonical schema)**

### **1.1. Canonical schema (lock this)**

Define a single canonical event format used internally:

{

  "event\_id": "uuid",

  "trace\_id": "uuid",            // added later, but reserve field

  "user\_id": "string",

  "session\_id": "string",

  "timestamp": "ISO8601",

  "event\_name": "string",        // e.g., VIEW\_PRICING, VERIFY\_IDENTITY

  "funnel\_stage": "string",      // e.g., BROWSE, COMPARE, KYC, REVIEW, SUBMIT

  "properties": {                // free-form, typed

    "loan\_id": "string",

    "num\_options\_viewed": 7,

    "apr\_value": 6.2,

    "device": "mobile",

    "referrer": "landing\_page"

  },

  "raw\_source": "string",        // "fintech\_client\_x"

  "raw\_event\_name": "string"     // original event name from client

}

Non-negotiable: `user_id`, `session_id`, `timestamp`, `event_name`, `properties`.

### **1.2. Create a mapping spec (config, not code-only)**

Define a mapping config per client/domain, e.g. in JSON/YAML:

client: fintech\_client\_x

mappings:

  \- raw\_event: "loan\_view"

    canonical\_event\_name: "VIEW\_LOAN"

    funnel\_stage: "COMPARE"

    property\_mappings:

      loan\_id: "loan\_id"

      term\_months: "term"

      apr: "apr\_value"

  \- raw\_event: "apr\_click"

    canonical\_event\_name: "VIEW\_PRICING"

    funnel\_stage: "PRICING"

    property\_mappings:

      apr: "apr\_value"

Goal: you can add new clients without editing core code.

### **1.3. Implement mapping function**

In ingestion-api:

1. Accept raw event payload  
2. Look up mapping by `raw_event_name` and `client_id`  
3. Construct canonical event object:  
   * fill `event_name`, `funnel_stage`  
   * map properties  
   * attach `raw_source`, `raw_event_name`  
4. If mapping missing → reject with clear reason (see validation section).

Do this first. Everything downstream assumes canonical events.

---

## **2\. Ingestion Validation \+ Rejection Rules**

You need a **hard gate** before anything hits scoring.

### **2.1. Syntactic validation (schema-level)**

For each incoming raw event (pre-mapping):

* Required fields present: `user_id`, `session_id`, `timestamp`, `event_type`/`raw_event_name`  
* Types:  
  * `timestamp` parseable ISO8601  
  * `user_id`, `session_id` strings  
* Drop/flag if:  
  * timestamp in the future beyond reasonable skew (e.g. \>5 min)  
  * invalid JSON  
  * missing required keys

If invalid → respond 4xx (for API) \+ log to ingestion\_errors.

### **2.2. Mapping validation**

After syntactic check:

* Confirm mapping entry exists for `(client_id, raw_event_name)`  
* If no mapping:  
  * Reject event as `UNMAPPED_EVENT`  
  * Log with reason, client\_id, raw\_event\_name  
* This prevents silent garbage entering your system.

### **2.3. Canonical validation (post-mapping)**

Once mapped:

* Ensure canonical fields present: `event_name`, `funnel_stage`, `timestamp`, `user_id`, `session_id`  
* Basic business rules:  
  * `apr_value` within sane bounds (e.g. 0–100)  
  * negative counts refused  
  * string lengths bounded (avoid logging megabytes)

If fails:

* Log to `rejected_events` table with `reason`  
* Do not call scoring for this event.

### **2.4. Dead-letter / quarantine**

Create a `rejected_events` storage (table/collection):

Fields:

* `rejected_event_id`  
* `client_id`  
* `raw_payload`  
* `reason_code`  
* `created_at`

This lets you:

* debug client integration  
* show diligence to compliance

## **3\. Logging Scaffolding (event/score/decision/override/explanation)**

Your goal: every decision traceable end-to-end via `trace_id`.

### **3.1. Define log schema types**

You need 5 structured log “types”:

1. `EVENT_LOG`  
2. `SCORE_LOG`  
3. `DECISION_LOG`  
4. `OVERRIDE_LOG`  
5. `EXPLANATION_LOG`

All share:

* `trace_id`  
* `timestamp`  
* `client_id`  
* `user_id`  
* `session_id`  
* `log_type`

examples

#### Data logs acceptance criteria \- trace\_id chain

a. Events\_log

`{ "log_type": "EVENT_LOG",`

 `"trace_id": "uuid",` 

`"client_id": "fintech_client_x",`

 `"user_id": "u123",`

 `"session_id": "s456",`

 `"timestamp": "2025-12-26T01:23:45Z",`

 `"event": { "event_name": "VIEW_PRICING",`

 `"funnel_stage": "PRICING",`

 `"properties": { "apr_value": 6.2 }`

 `}` 

`}`  

b. Score Log

`SCORE_LOG` JSON (logged \+ optionally stored):

{

  "log\_type": "SCORE\_LOG",

  "trace\_id": "uuid",

  "client\_id": "fintech\_x",

  "user\_id": "user\_123",

  "session\_id": "sess\_456",

  "model\_version": "behavioral\_v1.0",

  "features": {

    "step\_views": 5,

    "backtracks": 2,

    "doc\_views": 3,

    "errors": 1

  },

  "scores": {

    "decision\_fatigue": 0.78,

    "drop\_off\_intent": 0.63,

    "trust\_health": 0.41,

    "engagement\_readiness": 0.55,

    "conversion\_likelihood\_under\_intervention": 0.32

  },

  "fallback\_used": false,

  "timestamp": "..."

}

c. Decision Log

{

  "log\_type": "DECISION\_LOG",

  "trace\_id": "uuid",

  "client\_id": "fintech\_x",

  "user\_id": "user\_123",

  "session\_id": "sess\_456",

  "nba": {

    "action": "simplify\_options",

    "category": "Do Now",

    "impact\_direction": "Reduce friction",

    "confidence": 0.81,

    "effort": "Medium",

    "why": "High decision fatigue \+ good engagement readiness"

  },

  "rule\_pack\_version": "fintech\_rules\_v1.0",

  "timestamp": "..."

}

d. Explanation Log

{

  "log\_type": "EXPLANATION\_LOG",

  "trace\_id": "uuid",

  "client\_id": "fintech\_x",

  "user\_id": "user\_123",

  "session\_id": "sess\_456",

  "decision\_ref": "decision\_id or prediction\_id",

  "explanation\_version": "llm\_expl\_v1.0",

  "explanation\_source": "LLM",

  "text": "This user compared many loan options without committing...",

  "generated\_at": "..."

}

With this, i can literally walk the chain for any `trace_id`.

---

4\. How I Actually Prove It (Practically)

4.1. Golden Session Replays

Create a small set of “golden sessions”:

* For each golden session:  
  * Fixed synthetic event stream:  
    * Example: “high decision fatigue, but high intent”  
    * Example: “low trust after APR disclosure”  
  * Known intended cognitive outcome.  
  * Known expected NBA.

Process:

1. Ingest those events via `/api/ingest`.  
2. Let the system run scoring \+ NBA as usual.  
3. Query by `trace_id`:  
   * `events`  
   * `SCORE_LOG`  
   * `DECISION_LOG`  
   * `EXPLANATION_LOG`  
4. Replay scoring logic offline using the `events` table and your scoring function.

You want:

* Replay outputs \== logged outputs.  
* Logged features match what your mental model predicts.  
* NBA rationale aligns with rule pack.

If not, your chain is not causal or not deterministic.

4.2. Monotonic Sanity Suite

Design test cases with clear expected directional behavior:

* Case A: Add more backtracks → decision fatigue should **not decrease**.  
* Case B: Remove all error events → drop\_off\_intent should **not increase**.  
* Case C: Increase doc\_or\_disclosure\_view without errors → trust\_health should **not improve** beyond a bound.

Codify as tests:

// pseudo-code

const baseline \= computeCognitiveScores(events\_base);

const moreBacktracks \= computeCognitiveScores(events\_base\_plus\_backtracks);

assert(moreBacktracks.decision\_fatigue \>= baseline.decision\_fatigue);

If any monotonic expectations fail, you don’t trust the scores.

4.3. Trace-Based Debug Queries

You should be able to run:

\-- 1\) Get all events for a trace

SELECT \* FROM events WHERE trace\_id \= '...';

\-- 2\) Get the score log

SELECT \* FROM logs WHERE log\_type \= 'SCORE\_LOG' AND trace\_id \= '...';

\-- 3\) Get the decision log

SELECT \* FROM logs WHERE log\_type \= 'DECISION\_LOG' AND trace\_id \= '...';

\-- 4\) Get explanation

SELECT \* FROM logs WHERE log\_type \= 'EXPLANATION\_LOG' AND trace\_id \= '...';

From those rows alone, you can reconstruct:

* what user did, in what order  
* what features were computed  
* what the model thought  
* what decision was taken  
* how it was explained

That’s causal traceability.

---

5\. Circuit Breaker \+ Rollback in This Context

“Proving causality” also means you can detect when outputs stop making sense and correct course.

Concrete rules:

* If `decision_fatigue` ever \> 0 when event\_count \= 0 → bug → trip circuit.  
* If average scores on golden sessions drift \> X from baseline → revert model.  
* If `SCORE_LOG` anomaly detector sees \>20% deviation from validation distribution → mark `fallback_used = true` and hand control to deterministic rules.

Implementation pattern:

* Version your scoring function (`model_version`).  
* Keep previous version available.  
* Add small runtime check:

if (distributionShiftDetected(scores)) {

  logScore({ ..., fallback\_used: true });

  return deterministicScores(events);

}

Now your system not only has a causal chain, it has a *self-protection* layer.

---

## Checklist

**Phase 0: Canonical Data Pipeline**

- [ ] \[ \] Canonical event schema defined and written (doc \+ types)  
- [ ] \[ \] Mapping function actually maps → canonical struct  
- [ ] \[ \] `UNMAPPED_EVENT` rejection path implemented  
- [ ] \[ \] `rejected_events` store table exists (don’t silently drop)

Then:

- [ ] \[ \] syntactic validation  
- [ ] \[ \] canonical semantic sanity rules  
- [ ] \[ \] reason-coded rejections

Once this is true → ingestion layer is enterprise-grade.

AC\_canonical\_data\_pipeline

- [ ] Canonical schema finalization  
- [ ] Mapping correctness  
- [ ] Validation \+ Rejection  
- [ ] Logging stability  
- [ ] Trace pipeline fully tested

### Minimal Checklist For “Scoring Can Trust the Data”

For each `trace_id`, all must be true:

- [ ] \[ \] Every event used in scoring exists as a row in `events`.  
- [ ] \[ \] `SCORE_LOG` references the same `trace_id` and matches the features you’d recompute from `events`.  
- [ ] \[ \] `DECISION_LOG` uses those scores and rule version you expect.  
- [ ] \[ \] Replaying `computeCognitiveScores` on `events` yields the logged scores.  
- [ ] \[ \] Replaying `selectNBA` on the logged scores yields the logged NBA.  
- [ ] \[ \] Explanation references the same scores \+ NBA and doesn’t contradict them.  
- [ ] \[ \] All outputs are bounded, no `NaN` / `undefined`.  
- [ ] \[ \] Circuit breaker path is defined and tested.

If any box fails, you don’t trust the chain yet.

This is what “proving causality across the chain” actually becomes in a production behavioral system: replayability, determinism, invariants, and observable end-to-end traces.

Note on Software Choice: Neon Postgress  
Acceptance Criteria (DoD)

- [ ] pipeline runs stable end-to-end  
- [ ] scores behave logically \+ pass sanity checks  
- [ ] NBA never returns trash; always returns safe output  
- [ ] explanations comprehensible \+ policy-safe  
- [ ] compliance objections are answerable with artifacts (audit, retention, governance)  
- [ ] dashboard communicates confidence \+ traceability

### Neon Postgres

[https://neon.tech](https://neon.tech)

Why: free forever, modern, serverless, SSL works out-of-box, super simple UI.

Steps:

1. Create account → New Project  
2. Choose Postgres version → Create  
   Go to:  
    **Dashboard → Connection Details → “Connection string”**  
3. Copy:

postgres://USER:PASSWORD@HOST/dbname

1. Put into:  
* `.env.local`  
* Vercel → Settings → Environment Variables → `DATABASE_URL`

**Minimum Acceptance Rule**

`You must have a connection string that looks like:`

`postgres://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require`

`If it doesn’t have SSL, do not use it for fintech context.`

