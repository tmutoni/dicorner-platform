// app/docs/sdks/page.tsx
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

export default function SDKsPage() {
  return (
    <main>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/docs" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Docs
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SDKs & Libraries</h1>
          <p className="text-lg text-gray-600">
            Pre-built SDKs for React, Python, and Node.js. Get from install to
            first cognitive score in under 2 hours.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {/* React / Next.js */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              React / Next.js
            </h2>
            <CodeBlock title="Install">
              {`npm install @dicorner/react-sdk`}
            </CodeBlock>
            <CodeBlock title="Quick Start">
              {`import { DiCornerProvider, useScores, useNBA } from '@dicorner/react-sdk';

// Wrap your app
function App() {
  return (
    <DiCornerProvider apiKey="dc_free_your_key">
      <YourApp />
    </DiCornerProvider>
  );
}

// Use in any component
function PricingPage() {
  const { scores, loading } = useScores('current-user-id');
  const { recommendations } = useNBA('current-user-id');

  // Track events automatically
  // DiCorner SDK auto-captures page views, scroll depth, dwell time

  if (scores?.decision_fatigue_index?.level === 'critical') {
    // Show simplified pricing (NBA recommendation)
    return <SimplifiedPricing />;
  }

  return <FullPricing />;
}`}
            </CodeBlock>
          </div>

          {/* Python */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Python</h2>
            <CodeBlock title="Install">
              {`pip install dicorner`}
            </CodeBlock>
            <CodeBlock title="Quick Start">
              {`from dicorner import DiCornerClient

client = DiCornerClient(api_key="dc_free_your_key")

# Send events
client.track(
    user_id="usr_12345",
    event_type="page_view",
    page="pricing",
    properties={"dwell_time_ms": 45000}
)

# Get cognitive scores
scores = client.get_scores("usr_12345")
print(f"Decision Fatigue: {scores.dfi.value} ({scores.dfi.level})")

# Get NBA recommendations
nba = client.get_nba("usr_12345")
for rec in nba.recommendations:
    print(f"[{rec.tier}] {rec.action} (Confidence: {rec.confidence})")`}
            </CodeBlock>
          </div>

          {/* Node.js */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Node.js</h2>
            <CodeBlock title="Install">
              {`npm install @dicorner/node-sdk`}
            </CodeBlock>
            <CodeBlock title="Quick Start">
              {`import { DiCorner } from '@dicorner/node-sdk';

const dc = new DiCorner({ apiKey: 'dc_free_your_key' });

// Send events
await dc.track({
  userId: 'usr_12345',
  eventType: 'page_view',
  page: 'pricing',
  properties: { dwellTimeMs: 45000 }
});

// Get cognitive scores
const scores = await dc.getScores('usr_12345');
console.log(\`DFI: \${scores.decisionFatigueIndex.value}\`);

// Get NBA recommendations
const nba = await dc.getNBA('usr_12345');
nba.recommendations.forEach(rec => {
  console.log(\`[\${rec.tier}] \${rec.action}\`);
});`}
            </CodeBlock>
          </div>

          {/* Webhooks */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Webhooks (Growth + Enterprise)
            </h2>
            <p className="text-gray-600 mb-4">
              Receive real-time notifications when cognitive scores cross
              critical thresholds. Configure webhooks in your dashboard or via
              API.
            </p>
            <CodeBlock title="Webhook Payload">
              {`{
  "event": "score_threshold_crossed",
  "user_id": "usr_12345",
  "metric": "decision_fatigue_index",
  "value": 85,
  "level": "critical",
  "previous_level": "elevated",
  "timestamp": "2026-02-13T10:30:00Z",
  "nba": {
    "tier": "do_now",
    "action": "Simplify pricing comparison"
  }
}`}
            </CodeBlock>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-gray-600 mb-4">Need help with integration?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/get-api-key"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Get API Key
            </Link>
            <Link
              href="/contact"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}