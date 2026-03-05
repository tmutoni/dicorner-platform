# DiCorner — Postgres Surface
# Provider: Neon (neon.tech)
# Connection string format: postgres://USER:PASSWORD@HOST:PORT/DB_NAME?sslmode=require
# SSL required — do not use without sslmode=require in fintech context

---

## Environment Setup

### .env.local (never commit)
```
DATABASE_URL="postgres://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require"
```

### Vercel Environment Variables
Key: `DATABASE_URL`
Value: full connection string
Target: Production + Preview

---

## Table Definitions (run once in Neon SQL console)

### events — canonical ingested events
```sql
CREATE TABLE IF NOT EXISTS events (
  id              UUID          PRIMARY KEY,
  trace_id        UUID          NOT NULL,
  client_id       TEXT          NOT NULL,
  user_id         TEXT          NOT NULL,
  session_id      TEXT          NOT NULL,
  event_name      TEXT          NOT NULL,
  funnel_stage    TEXT          NOT NULL,
  properties      JSONB         NOT NULL DEFAULT '{}',
  timestamp       TIMESTAMPTZ   NOT NULL,
  raw_source      TEXT          NOT NULL,
  raw_event_name  TEXT          NOT NULL,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_trace_id
  ON events (trace_id);

CREATE INDEX IF NOT EXISTS idx_events_client_user_session
  ON events (client_id, user_id, session_id);

CREATE INDEX IF NOT EXISTS idx_events_timestamp
  ON events (timestamp DESC);
```

### rejected_events — bad payloads, unmapped events, validation failures
```sql
CREATE TABLE IF NOT EXISTS rejected_events (
  id          UUID          PRIMARY KEY,
  trace_id    UUID          NOT NULL,
  client_id   TEXT,
  raw_payload JSONB         NOT NULL DEFAULT '{}',
  reason_code TEXT          NOT NULL,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rejected_trace_id
  ON rejected_events (trace_id);

CREATE INDEX IF NOT EXISTS idx_rejected_reason
  ON rejected_events (reason_code);

CREATE INDEX IF NOT EXISTS idx_rejected_created
  ON rejected_events (created_at DESC);
```

### decisions — NBA outputs (created Phase 0, populated Phase 2)
```sql
CREATE TABLE IF NOT EXISTS decisions (
  id                UUID          PRIMARY KEY,
  trace_id          UUID          NOT NULL,
  client_id         TEXT          NOT NULL,
  user_id           TEXT,
  session_id        TEXT,
  nba_action        TEXT          NOT NULL,
  nba_category      TEXT          NOT NULL,  -- "Do Now" | "Try Experiment" | "Ignore"
  impact_direction  TEXT          NOT NULL,
  confidence        DOUBLE PRECISION NOT NULL,
  effort            TEXT          NOT NULL,
  why               TEXT          NOT NULL,
  rule_pack_version TEXT          NOT NULL,
  scores            JSONB         NOT NULL DEFAULT '{}',  -- snapshot of cognitive scores
  segments          JSONB         NOT NULL DEFAULT '{}',  -- segment flags at decision time
  model_version     TEXT          NOT NULL,
  fallback_used     BOOLEAN       NOT NULL DEFAULT false,
  created_at        TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_decisions_trace_id
  ON decisions (trace_id);

CREATE INDEX IF NOT EXISTS idx_decisions_client_id
  ON decisions (client_id);

CREATE INDEX IF NOT EXISTS idx_decisions_created
  ON decisions (created_at DESC);
```

### explanations — LLM narration layer (created Phase 0, populated Phase 3)
```sql
CREATE TABLE IF NOT EXISTS explanations (
  id                  UUID          PRIMARY KEY,
  trace_id            UUID          NOT NULL,
  client_id           TEXT          NOT NULL,
  user_id             TEXT,
  session_id          TEXT,
  decision_id         UUID,
  scores              JSONB         NOT NULL DEFAULT '{}',
  segments            JSONB,
  nba                 JSONB,
  text                TEXT          NOT NULL,
  explanation_version TEXT          NOT NULL,
  explanation_source  TEXT          NOT NULL,  -- "LLM" | "fallback_template" | "cached"
  generated_at        TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_explanations_trace_id
  ON explanations (trace_id);

CREATE INDEX IF NOT EXISTS idx_explanations_decision_id
  ON explanations (decision_id);
```

---

## Debug Queries (002_debug_queries.sql)

```sql
-- 1. Reconstruct full trace chain for any trace_id
SELECT 'event' AS layer, id::text, trace_id::text, event_name AS label, timestamp::text AS ts
  FROM events WHERE trace_id = '<YOUR_TRACE_ID>'
UNION ALL
SELECT 'decision', id::text, trace_id::text, nba_action, created_at::text
  FROM decisions WHERE trace_id = '<YOUR_TRACE_ID>'
UNION ALL
SELECT 'explanation', id::text, trace_id::text, LEFT(text, 80), generated_at::text
  FROM explanations WHERE trace_id = '<YOUR_TRACE_ID>'
ORDER BY ts;

-- 2. Latest 20 events
SELECT * FROM events ORDER BY created_at DESC LIMIT 20;

-- 3. Latest rejections with reason
SELECT reason_code, count(*) FROM rejected_events
  GROUP BY reason_code ORDER BY count DESC;

-- 4. All events for a session
SELECT event_name, funnel_stage, timestamp, properties
  FROM events
  WHERE session_id = '<YOUR_SESSION_ID>'
  ORDER BY timestamp;

-- 5. Decisions without explanations (for explain-batch job)
SELECT d.id, d.trace_id, d.nba_action, d.created_at
  FROM decisions d
  LEFT JOIN explanations e ON e.decision_id = d.id
  WHERE e.id IS NULL
  ORDER BY d.created_at DESC;

-- 6. Score distribution check (sanity — no nulls)
SELECT
  count(*) AS total,
  count(*) FILTER (WHERE scores->>'dfi' IS NULL) AS missing_dfi,
  count(*) FILTER (WHERE scores->>'cli' IS NULL) AS missing_cli
FROM decisions;
```

---

## Minimum Acceptance Rule

Connection string MUST include `sslmode=require`. Without SSL this is not acceptable for fintech context.
