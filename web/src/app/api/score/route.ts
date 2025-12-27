// web/src/app/api/score/route.ts
import { NextRequest, NextResponse } from "next/server";
import { newTraceId, logScore, logDecision } from "@/lib/logging";

type Event = {
  name: string;
  timestamp: string;
  properties?: Record<string, unknown>;
};

type ScoreRequest = {
  account_id: string;
  user_id?: string;
  events: Event[];
};

type FeatureContribution = {
  feature: string;
  value: number;
  contribution: number;
};

type ScoreResponse = {
  prediction_id: string;
  score: number;
  risk_label: string;
  explanation: {
    contributions: FeatureContribution[];
    generated_at: string;
  };
};

export async function POST(req: NextRequest) {
  const traceId = newTraceId(req.headers.get("x-trace-id"));

  const body = (await req.json()) as Partial<ScoreRequest>;

  if (!body.account_id || !Array.isArray(body.events)) {
    return NextResponse.json(
      {
        error: "invalid_payload",
        message: "account_id and events are required",
        trace_id: traceId,
      },
      { status: 422 },
    );
  }

  const events = body.events;

  // TODO: replace toy scoring with fintech cognitive scoring
  // current placeholder: more events → higher risk
  const eventCount = events.length;
  const score = Math.min(100, eventCount * 10);
  const risk_label =
    score >= 70 ? "high" : score >= 40 ? "medium" : "low";

  const response: ScoreResponse = {
    prediction_id: `demo_${Date.now()}`,
    score,
    risk_label,
    explanation: {
      contributions: [
        {
          feature: "event_count",
          value: eventCount,
          contribution: score,
        },
        // later: add cognitive metrics here, e.g.
        // { feature: "decision_fatigue", value: fatigueIndex, contribution: ... }
      ],
      generated_at: new Date().toISOString(),
    },
  };

  // Structured logs for observability
  logScore({
    trace_id: traceId,
    client_id: body.account_id,
    user_id: body.user_id,
    session_id: undefined, // wire from events later if you add it
    score: response,
    model_version: "demo_v1",      // later: "behavioral_fintech_v1"
    fallback_used: false,
  });

  // For now, log a stub NBA; replace with real NBA engine later
  logDecision({
    trace_id: traceId,
    client_id: body.account_id,
    user_id: body.user_id,
    session_id: undefined,
    nba: {
      action: "no_op_demo",
      category: "Ignore",
      impact_direction: "None",
      confidence: 0.0,
      effort: "Low",
      why: "NBA engine not wired yet; demo-only scoring.",
    },
    rule_pack_version: "none",
  });

  return NextResponse.json(response, { status: 200 });
}
