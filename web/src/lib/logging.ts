// web/src/lib/logging.ts

export type BaseLog = {
    log_type: string;
    trace_id: string;
    client_id: string;
    user_id?: string;
    session_id?: string;
    timestamp: string;
  };
  
  function emit(log: Record<string, unknown>) {
    // Vercel will capture stdout JSON logs
    console.log(JSON.stringify(log));
  }
  
  // ---- trace id helper ----
  export function newTraceId(existing?: string | null): string {
    if (existing && existing.length > 0) return existing;
    return crypto.randomUUID();
  }
  
  // ---- event logging ----
  export function logEvent(event: {
    trace_id: string;
    client_id: string;
    user_id: string;
    session_id: string;
    event_name: string;
    funnel_stage: string;
    properties: Record<string, unknown>;
    timestamp: string;
  }) {
    emit({
      log_type: "EVENT_LOG",
      ...event,
    });
  }
  
  export function logRejected(raw: unknown, clientId: string | undefined, reason: string, traceId: string) {
    emit({
      log_type: "REJECTED_EVENT",
      trace_id: traceId,
      client_id: clientId ?? "unknown",
      timestamp: new Date().toISOString(),
      reason,
      raw,
    });
  }
  
  // ---- score logging ----
  export function logScore(args: {
    trace_id: string;
    client_id: string;
    user_id?: string;
    session_id?: string;
    score: unknown;          // keep generic to avoid tight coupling
    model_version?: string;
    fallback_used?: boolean;
  }) {
    emit({
      log_type: "SCORE_LOG",
      timestamp: new Date().toISOString(),
      ...args,
    });
  }
  
  // ---- decision logging ----
  export function logDecision(args: {
    trace_id: string;
    client_id: string;
    user_id?: string;
    session_id?: string;
    nba: unknown;            // again: generic; you can tighten later
    rule_pack_version?: string;
  }) {
    emit({
      log_type: "DECISION_LOG",
      timestamp: new Date().toISOString(),
      ...args,
    });
  }
  