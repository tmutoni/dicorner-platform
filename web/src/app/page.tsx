"use client";

import { useState } from "react";

type PresetKey = "good" | "sparse" | "bad";

const presets: Record<PresetKey, string> = {
  good: JSON.stringify(
    {
      account_id: "acct_demo",
      user_id: "user_demo",
      events: [
        {
          name: "session_start",
          timestamp: new Date().toISOString(),
          properties: { device: "web", plan: "trial" },
        },
        {
          name: "feature_click",
          timestamp: new Date().toISOString(),
          properties: { feature: "dashboard_insights" },
        },
        {
          name: "checkout_view",
          timestamp: new Date().toISOString(),
          properties: { value: 120 },
        },
      ],
    },
    null,
    2
  ),
  sparse: JSON.stringify(
    {
      account_id: "acct_sparse",
      user_id: "user_sparse",
      events: [
        {
          name: "session_start",
          timestamp: new Date().toISOString(),
          properties: { device: "mobile" },
        },
      ],
    },
    null,
    2
  ),
  bad: JSON.stringify(
    {
      // missing account_id & events to trigger validation error
      user_id: "broken_payload",
    },
    null,
    2
  ),
};

export default function Home() {
  const [payload, setPayload] = useState(presets.good);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [activePreset, setActivePreset] = useState<PresetKey>("good");

  async function runScore() {
    setLoading(true);
    setResult("// running...");
    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      const data = await res.json();
      const wrapped = { http_status: res.status, ...data };
      setResult(JSON.stringify(wrapped, null, 2));
    } catch (e) {
      setResult(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero + vision */}
      <section className="px-6 py-10 md:px-16 md:py-16 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">
              Act on customer risk the moment it emerges.
            </h1>
            <p className="text-neutral-300 mb-4">
              DiCorner is a behavioral AI copilot for small and mid-sized
              businesses. We turn raw product and API events into real-time{" "}
              <span className="font-semibold">risk scores, explanations,</span>{" "}
              and <span className="font-semibold">next-best actions</span> your
              teams can actually use.
            </p>
            <p className="text-neutral-400 mb-6">
              Bring together signals you already generate — sessions,
              feature-usage, billing, and support activity — and get a
              production-ready score in seconds.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={runScore}
                disabled={loading}
                className="rounded-md bg-white text-black px-4 py-2 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Scoring..." : "Run a test score"}
              </button>
              <a
                href="#api"
                className="text-sm text-neutral-300 underline underline-offset-4"
              >
                Explore the API
              </a>
            </div>
          </div>

          {/* Instant Score Demo */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 md:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-neutral-100">
                Instant Behavioral Score Demo
              </h2>
              <span className="text-[11px] text-neutral-500">
                Edit JSON → Send → Inspect score + explanation
              </span>
            </div>

            <div className="flex gap-2 mb-3">
              {(
                [
                  ["good", "Good coverage"],
                  ["sparse", "Sparse events"],
                  ["bad", "Bad schema"],
                ] as [PresetKey, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActivePreset(key);
                    setPayload(presets[key]);
                    setResult("");
                  }}
                  className={`text-xs px-2 py-1 rounded-md border ${
                    activePreset === key
                      ? "border-white text-white"
                      : "border-neutral-700 text-neutral-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <textarea
              className="w-full h-48 text-xs font-mono bg-black border border-neutral-800 rounded-md p-2 text-neutral-100 resize-none"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
            />

            <button
              onClick={runScore}
              disabled={loading}
              className="mt-3 rounded-md bg-white text-black px-3 py-1.5 text-xs font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Scoring..." : "Run Score"}
            </button>

            <pre className="mt-4 bg-neutral-900 border border-neutral-800 rounded-md p-2 text-[11px] text-green-300 overflow-x-auto min-h-[100px]">
              {result || "// score + explanation will appear here"}
            </pre>
          </div>
        </div>
      </section>

      {/* Section 2 — How it works */}
      <section className="px-6 py-10 md:px-16 md:py-14 border-b border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold mb-3">
            How real-time behavioral scoring works
          </h2>
          <p className="text-neutral-300 mb-5 text-sm">
            DiCorner ingests behavioral signals from your app, APIs, billing,
            and support tools, then maintains an always-fresh feature profile
            for every account and user. Our models score churn risk and
            activation intent in real time, with explanations you can inspect
            and override.
          </p>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3">
              <h3 className="font-semibold mb-1 text-neutral-100">
                1. Capture events
              </h3>
              <p className="text-neutral-300">
                Send product and API events using a single JSON envelope. We
                enforce schema contracts so your signals stay clean.
              </p>
            </div>
            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3">
              <h3 className="font-semibold mb-1 text-neutral-100">
                2. Score in real time
              </h3>
              <p className="text-neutral-300">
                Features are updated in <strong>&lt;45s</strong> and scored via
                a low-latency API designed for in-flow experiences.
              </p>
            </div>
            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3">
              <h3 className="font-semibold mb-1 text-neutral-100">
                3. Explain and act
              </h3>
              <p className="text-neutral-300">
                Every score ships with feature contributions so your teams know{" "}
                <em>why</em> risk changed and what to do next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — API quickstart */}
      <section
        id="api"
        className="px-6 py-10 md:px-16 md:py-14 border-b border-neutral-900"
      >
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-xl font-semibold mb-3">
              API quickstart — from key to score in 3 steps
            </h2>
            <ol className="list-decimal list-inside text-sm text-neutral-300 space-y-1 mb-4">
              <li>Create an API key in the DiCorner console.</li>
              <li>
                POST events to <code>/v1/score</code> using our JSON schema.
              </li>
              <li>
                Read back <code>{`{score, risk_label, explanation}`}</code> and
                route users accordingly.
              </li>
            </ol>
            <p className="text-neutral-400 text-xs">
              We provide SDKs for JavaScript and Python, plus copy-paste
              snippets for cURL and popular HTTP clients.
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3">
            <p className="text-[11px] text-neutral-400 mb-2">
              Example: first score in cURL
            </p>
            <pre className="text-[11px] font-mono text-neutral-100 whitespace-pre-wrap">
{`curl -X POST https://api.dicorner.com/v1/score \\
  -H "Authorization: Bearer <YOUR_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "account_id": "acct_123",
    "user_id": "user_456",
    "events": [
      {
        "name": "session_start",
        "timestamp": "2025-11-23T00:00:00Z",
        "properties": {"device": "web"}
      }
    ]
  }'`}
            </pre>
          </div>
        </div>
      </section>

      {/* Section 4 — Pricing + onboarding */}
      <section className="px-6 py-10 md:px-16 md:py-14">
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-xl font-semibold mb-3">
              Pricing that matches your stage
            </h2>
            <ul className="text-sm text-neutral-300 space-y-2">
              <li>
                <span className="font-semibold">Builder</span> — Free tier for
                early-stage products; limited events and scoring calls.
              </li>
              <li>
                <span className="font-semibold">Growth</span> — Volume-based
                pricing with higher SLAs, webhooks, and replay.
              </li>
              <li>
                <span className="font-semibold">Enterprise</span> — Dedicated
                tenant, custom retention, and private deployments.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">
              Developer onboarding in two clicks
            </h2>
            <ol className="list-decimal list-inside text-sm text-neutral-300 space-y-1 mb-3">
              <li>Sign in with your work email; copy your API key.</li>
              <li>Send your first event using our JSON envelope.</li>
            </ol>
            <p className="text-neutral-400 text-sm">
              Everything else — dashboards, alerts, and advanced routing —
              stays gated until you are reliably sending events. The first goal
              is simple: get a trustworthy score and explanation in your stack.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
