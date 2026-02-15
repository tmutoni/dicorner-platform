// app/docs/page.tsx
import Link from "next/link";

const sections = [
  {
    title: "API Reference",
    href: "/docs/api-reference",
    description:
      "REST API endpoints for cognitive scoring, NBA recommendations, and event ingestion.",
  },
  {
    title: "SDKs & Libraries",
    href: "/docs/sdks",
    description:
      "Pre-built SDKs for React, Python, and Node.js with quick-start guides.",
  },
  {
    title: "No-Code NBA Injection",
    href: "/docs/no-code-nba",
    description:
      "Inject Next Best Action recommendations into your UI without writing code.",
  },
  {
    title: "Compliance & Security",
    href: "/docs/compliance-security",
    description:
      "Architecture overview, data handling, audit trails, and regulatory compliance."
  },
];

const quickLinks = [
  { label: "Get API Key", href: "/get-api-key" },
  { label: "Pricing", href: "/pricing" },
  { label: "Schedule Demo", href: "/schedule-demo" },
  { label: "Contact Support", href: "/contact" },
];

export default function DocsLanding() {
  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to integrate DiCorner's cognitive behavioral
            intelligence into your product.
          </p>
        </div>
      </section>

      {/* Quick start */}
      <section className="py-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              Quick Start
            </h2>
            <p className="text-blue-800 text-sm mb-4">
              Get from zero to first cognitive score in under 2 hours:
            </p>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>
                <Link href="/get-api-key" className="underline hover:text-blue-600">
                  Get your free API key
                </Link>{" "}
                (instant, no credit card)
              </li>
              <li>Install the SDK for your framework (React, Python, or Node.js)</li>
              <li>Send your first event and receive cognitive scores in &lt;300ms</li>
              <li>View NBA recommendations in your dashboard</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Doc sections grid */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-4"></div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition">
                {s.title}
              </h2>
              <p className="text-gray-600 text-sm">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="bg-white border border-gray-200 px-6 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}