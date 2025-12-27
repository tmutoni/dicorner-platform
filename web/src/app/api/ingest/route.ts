// web/src/app/api/ingest/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { mapToCanonical, validateCanonical, RawEventPayload } from '@/lib/schema';
import { logEvent, logRejected, newTraceId } from '@/lib/logging';
// import { saveEvent } from '@/lib/db'; // once DB is wired

export async function POST(req: NextRequest) {
  const headerTrace = req.headers.get('x-trace-id');
  const traceId = newTraceId(headerTrace);

  let raw: RawEventPayload;

  try {
    raw = await req.json();
  } catch {
    logRejected(null, undefined, 'INVALID_JSON', traceId);
    return NextResponse.json(
      { error: 'invalid_json', trace_id: traceId },
      { status: 400 },
    );
  }

  try {
    const canonical = mapToCanonical(raw, traceId);
    validateCanonical(canonical);

    // TODO: persist to DB
    // await saveEvent(canonical);

    logEvent(canonical);

    return NextResponse.json(
      { status: 'accepted', trace_id: traceId },
      { status: 202 },
    );
  } catch (err: unknown) {
    const reason =
      err instanceof Error ? err.message : 'UNKNOWN_INGEST_ERROR';
    logRejected(raw, raw.client_id, reason, traceId);

    // distinguish mapping error vs other errors if you want
    const status = reason.startsWith('UNMAPPED_EVENT') ? 422 : 400;

    return NextResponse.json(
      { error: 'invalid_event', reason, trace_id: traceId },
      { status },
    );
  }
}
