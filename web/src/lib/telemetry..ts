export function track(event: string, data: Record<string, any> = {}) {
    try {
      // placeholder: send to PostHog / Segment later
      console.log("[telemetry]", event, data);
    } catch {
      // swallow errors — telemetry must never break app
    }
  }
  