import { NextResponse } from "next/server";

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

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<ScoreRequest>;

  if (!body.account_id || !Array.isArray(body.events)) {
    return NextResponse.json(
      {
        error: "invalid_payload",
        message: "account_id and events are required",
      },
      { status: 422 },
    );
  }

  const events = body.events;

  // toy scoring logic: more events → higher score
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
      ],
      generated_at: new Date().toISOString(),
    },
  };

  return NextResponse.json(response);
}
