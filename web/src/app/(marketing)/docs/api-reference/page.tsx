// app/docs/api-reference/page.tsx
import Link from "next/link";

function CodeBlock({ title, children }: { title?: string; children: string }) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden my-4">
      {title && (
        <div className="bg-gray-100 px-4 py-2 text-xs font-mono text-gray-500 border-b border-gray-200">
          {title}
        </div>
      )}
      <pre className="bg-gray-50 p-4 overflow-x-auto text-sm font-mono text-gray-800">
        {children}
      </pre>
    </div>
  );
}

export default function APIReference() {
  return (
    <main>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/docs"
            className="text-sm text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Back to Docs
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            API Reference
          </h1>
          <p className="text-lg text-gray-600">
            REST API endpoints for cognitive scoring, event ingestion, and NBA
            recommendations.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {/* Base URL */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Base URL</h2>
            <CodeBlock>{`https://api.dicornerusa.com/v1`}</CodeBlock>
            <p className="text-gray-600 text-sm">
              All API requests require an API key in the{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                Authorization
              </code>{" "}
              header:{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                Bearer YOUR_API_KEY
              </code>
            </p>
          </div>

          {/* Authentication */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Authentication
            </h2>
            <CodeBlock title="Request Header">
              {`Authorization: Bearer dc_live_abc123...`}
            </CodeBlock>
            <p className="text-gray-600 text-sm">
              Get your API key from the{" "}
              <Link href="/get-api-key" className="text-blue-600 hover:underline">
                Get API Key
              </Link>{" "}
              page. Builder tier keys are prefixed with{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                dc_free_
              </code>
              , Growth/Enterprise with{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                dc_live_
              </code>
              .
            </p>
          </div>

          {/* Ingest Events */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ingest Events
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                POST
              </span>
              <code className="text-sm font-mono text-gray-800">
                /v1/events
              </code>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Send behavioral events for cognitive scoring. Events are processed
              and scored within 300ms (p95).
            </p>
            <CodeBlock title="Request Body (JSON)">
              {`{
  "user_id": "usr_12345",
  "session_id": "sess_abc",
  "events": [
    {
      "type": "page_view",
      "page": "pricing",
      "timestamp": "2026-02-13T10:30:00Z",
      "properties": {
        "dwell_time_ms": 45000,
        "scroll_depth": 0.85
      }
    }
  ]
}`}
            </CodeBlock>
            <CodeBlock title="Response (200 OK)">
              {`{
  "status": "accepted",
  "events_processed": 1,
  "scoring_available_in_ms": 300
}`}
            </CodeBlock>
          </div>

          {/* Get Cognitive Scores */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Get Cognitive Scores
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                GET
              </span>
              <code className="text-sm font-mono text-gray-800">
                /v1/scores/:user_id
              </code>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Retrieve the latest cognitive scores for a user across all five
              metrics.
            </p>
            <CodeBlock title="Response (200 OK)">
              {`{
  "user_id": "usr_12345",
  "scores": {
    "decision_fatigue_index": { "value": 85, "level": "critical", "confidence": 0.89 },
    "trust_health": { "value": 72, "level": "moderate", "confidence": 0.91 },
    "drop_off_intent": { "value": 64, "level": "elevated", "confidence": 0.78 },
    "engagement_readiness": { "value": 45, "level": "low", "confidence": 0.82 },
    "conversion_likelihood": { "value": 31, "level": "at_risk", "confidence": 0.85 }
  },
  "scored_at": "2026-02-13T10:30:00.300Z",
  "model_version": "v2.4.1",
  "explainability": {
    "summary": "User experiencing decision fatigue from comparison paralysis. Trust intact but engagement declining.",
    "key_signals": ["pricing_view x4 in 10min", "feature_compare x3", "no_action 10min"]
  }
}`}
            </CodeBlock>
          </div>

          {/* Get NBA Recommendations */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Get NBA Recommendations
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                GET
              </span>
              <code className="text-sm font-mono text-gray-800">
                /v1/nba/:user_id
              </code>
            </div>
            <CodeBlock title="Response (200 OK)">
              {`{
  "user_id": "usr_12345",
  "recommendations": [
    {
      "tier": "do_now",
      "action": "Simplify pricing comparison—reduce from 4 tiers to 2",
      "confidence": 0.87,
      "expected_impact": "+12% conversion",
      "effort": "medium",
      "time_to_effect": "<24 hours",
      "justification": "User stuck in comparison paralysis (DFI: 85). Reducing options lowers cognitive load.",
      "trace_id": "nba_trace_xyz789"
    }
  ]
}`}
            </CodeBlock>
          </div>

          {/* Rate Limits */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Rate Limits
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">
                      Plan
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700">
                      Requests/Hour
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700">
                      Events/Month
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="p-3 text-gray-700">Builder (Free)</td>
                    <td className="p-3 text-gray-700">100</td>
                    <td className="p-3 text-gray-700">10,000</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="p-3 text-gray-700">Growth</td>
                    <td className="p-3 text-gray-700">10,000</td>
                    <td className="p-3 text-gray-700">Up to 2M+</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="p-3 text-gray-700">Enterprise</td>
                    <td className="p-3 text-gray-700">Unlimited</td>
                    <td className="p-3 text-gray-700">Custom</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Error Codes */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Error Codes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Code</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["400", "Bad Request. Invalid event schema or missing required fields"],
                    ["401", "Unauthorized. Invalid or missing API key"],
                    ["403", "Forbidden. Plan does not support this endpoint"],
                    ["404", "Not Found. User or resource does not exist"],
                    ["429", "Rate Limited. Exceeded plan rate limit"],
                    ["500", "Server Error. Contact support with the trace_id"],
                  ].map(([code, meaning]) => (
                    <tr key={code} className="border-t border-gray-200">
                      <td className="p-3 font-mono text-gray-700">{code}</td>
                      <td className="p-3 text-gray-600">{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-gray-600 mb-4">
            Ready to start integrating?
          </p>
          <Link
            href="/get-api-key"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition inline-block"
          >
            Get Your Free API Key
          </Link>
        </div>
      </section>
    </main>
  );
}