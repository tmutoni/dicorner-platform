// app/docs/no-code-nba/page.tsx
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

export default function NoCodeNBA() {
  return (
    <main>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/docs" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Docs
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            No-Code NBA Injection
          </h1>
          <p className="text-lg text-gray-600">
            Inject Next Best Action recommendations directly into your UI—no
            backend changes required.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {/* Overview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              DiCorner's no-code NBA injection embeds a lightweight script tag
              in your app. When a user's cognitive scores cross a threshold,
              the script automatically renders a contextual intervention—such as
              a tooltip, banner, or simplified UI variant—without any backend
              code changes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Configure triggers, placements, and intervention types from the
              DiCorner dashboard. The script handles rendering, tracking, and
              outcome measurement automatically.
            </p>
          </div>

          {/* Setup */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Setup</h2>
            <p className="text-gray-600 text-sm mb-4">
              Add this script tag before your closing{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                &lt;/body&gt;
              </code>{" "}
              tag:
            </p>
            <CodeBlock title="HTML">
              {`<script
  src="https://cdn.dicornerusa.com/nba-inject.js"
  data-api-key="dc_free_your_key"
  data-user-id="CURRENT_USER_ID"
  async
></script>`}
            </CodeBlock>
          </div>

          {/* Configuration */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Dashboard Configuration
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              From the DiCorner dashboard, configure:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Triggers",
                  desc: "Set cognitive score thresholds that activate interventions (e.g., DFI > 80, TH < 50).",
                },
                {
                  title: "Placements",
                  desc: "Choose where interventions appear: inline tooltips, top banners, slide-in panels, or modal overlays.",
                },
                {
                  title: "Intervention Types",
                  desc: "Select from pre-built templates: simplified UI variant, contextual help, urgency messaging, or trust reinforcement.",
                },
                {
                  title: "A/B Testing",
                  desc: "Run experiments on 'Try Experiment' tier recommendations. DiCorner handles randomization and outcome tracking.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Example */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Example: Pricing Page Simplification
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-sm text-blue-800 mb-3">
                <strong>Trigger:</strong> Decision Fatigue Index &gt; 80 on
                /pricing
              </p>
              <p className="text-sm text-blue-800 mb-3">
                <strong>Intervention:</strong> Replace 4-tier pricing table
                with simplified 2-tier comparison
              </p>
              <p className="text-sm text-blue-800 mb-3">
                <strong>Placement:</strong> Inline replacement (swaps existing
                pricing component)
              </p>
              <p className="text-sm text-blue-800">
                <strong>Measured Outcome:</strong> +12% trial-to-paid
                conversion for users who saw the simplified view
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-gray-600 mb-4">
            Available on Growth and Enterprise plans.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/schedule-demo"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Schedule Demo
            </Link>
            <Link
              href="/pricing"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}