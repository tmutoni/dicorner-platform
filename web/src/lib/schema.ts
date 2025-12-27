// web/src/lib/schema.ts
export type CanonicalEvent = {
    event_id: string;
    trace_id: string;
    client_id: string;
    user_id: string;
    session_id: string;
    timestamp: string;           // ISO
    event_name: string;          // e.g. VIEW_PRICING
    funnel_stage: string;        // e.g. PRICING, KYC
    properties: Record<string, unknown>;
    raw_source: string;          // e.g. "fintech_client_x"
    raw_event_name: string;
  };
  
  export type RawEventPayload = {
    client_id: string;
    raw_event_name: string;
    user_id: string;
    session_id: string;
    timestamp: string;
    properties?: Record<string, unknown>;
  };
  
  export function mapToCanonical(raw: RawEventPayload, traceId: string): CanonicalEvent {
    // TODO: replace with config lookup by client_id + raw_event_name
    const mapping = basicMapping(raw.raw_event_name);
  
    return {
      event_id: crypto.randomUUID(),
      trace_id: traceId,
      client_id: raw.client_id,
      user_id: raw.user_id,
      session_id: raw.session_id,
      timestamp: raw.timestamp,
      event_name: mapping.event_name,
      funnel_stage: mapping.funnel_stage,
      properties: raw.properties ?? {},
      raw_source: raw.client_id,
      raw_event_name: raw.raw_event_name,
    };
  }
  
  function basicMapping(rawName: string): { event_name: string; funnel_stage: string } {
    switch (rawName) {
      case 'loan_view':
        return { event_name: 'VIEW_LOAN', funnel_stage: 'COMPARE' };
      case 'apr_click':
        return { event_name: 'VIEW_PRICING', funnel_stage: 'PRICING' };
      default:
        throw new Error(`UNMAPPED_EVENT:${rawName}`);
    }
  }
  
  // minimal validation to start
  export function validateCanonical(event: CanonicalEvent): void {
    if (!event.user_id || !event.session_id || !event.event_name || !event.timestamp) {
      throw new Error('INVALID_EVENT:missing_required_fields');
    }
    // extend with sanity checks later
  }
  