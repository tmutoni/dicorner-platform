// app/docs/compliance-security/page.tsx
import Link from "next/link";

export default function ComplianceSecurity() {
  return (
    <main>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/docs" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Docs
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Compliance & Security
          </h1>
          <p className="text-lg text-gray-600">
            Built for regulated industries. Privacy, security, and auditability
            are non-negotiable.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {/* Architecture */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Compliance-First Architecture
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "LLM Never Scores or Decides",
                  desc: "The LLM layer is strictly limited to narration. All scoring and decision-making is handled by the deterministic ML core (logistic regression, GBDT). This separation ensures predictable, auditable outputs.",
                },
                {
                  title: "No Protected Attributes",
                  desc: "DiCorner does not use race, gender, income, or any protected attribute in modeling. Behavioral events only.",
                },
                {
                  title: "Complete Audit Trail",
                  desc: "Every decision is reproducible. Each output includes a trace_id linking to: input events, model version, rule pack version, NBA output, explanation output, and any human overrides.",
                },
                {
                  title: "Circuit Breakers",
                  desc: "If ML model drift exceeds 20%, the system auto-reverts to rule-based recommendations. No 'AI gone rogue' scenarios.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-6"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Security
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Measure</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Encryption in transit", "TLS 1.2+"],
                    ["Encryption at rest", "AES-256"],
                    ["Access control", "Role-based access, multi-factor authentication"],
                    ["Monitoring", "24/7 security monitoring, intrusion detection"],
                    ["Audits", "Regular security audits, penetration testing"],
                    ["Incident response", "Breach notification within 72 hours"],
                  ].map(([measure, detail]) => (
                    <tr key={measure} className="border-t border-gray-200">
                      <td className="p-3 font-medium text-gray-700">{measure}</td>
                      <td className="p-3 text-gray-600">{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regulatory Compliance */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Regulatory Compliance
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "GDPR",
                  items: [
                    "Right to access, rectification, erasure",
                    "Data portability",
                    "Consent management",
                    "Standard Contractual Clauses for transfers",
                  ],
                },
                {
                  title: "CCPA",
                  items: [
                    "Right to know, delete, opt-out",
                    "No sale of personal information",
                    "Non-discrimination for exercising rights",
                  ],
                },
              ].map((reg) => (
                <div
                  key={reg.title}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-6"
                >
                  <h3 className="font-bold text-gray-900 mb-3">{reg.title}</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {reg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Retention
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Data Type</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Builder</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Growth</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Behavioral events", "7 days", "90 days", "Up to 2 years"],
                    ["Cognitive scores", "7 days", "90 days", "Custom"],
                    ["Audit logs", "7 days", "1 year", "Custom"],
                    ["Account data", "Until deletion", "Until deletion", "Until deletion"],
                  ].map(([type, builder, growth, enterprise]) => (
                    <tr key={type} className="border-t border-gray-200">
                      <td className="p-3 font-medium text-gray-700">{type}</td>
                      <td className="p-3 text-gray-600">{builder}</td>
                      <td className="p-3 text-gray-600">{growth}</td>
                      <td className="p-3 text-gray-600">{enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enterprise Deployment */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Enterprise Deployment Options
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "SaaS (Multi-Tenant)",
                  desc: "Hosted by DiCorner. Fully managed, auto-scaling, shared infrastructure with logical isolation.",
                },
                {
                  title: "Single-Tenant (Dedicated)",
                  desc: "Isolated infrastructure for your organization. Same SaaS convenience with dedicated resources.",
                },
                {
                  title: "VPC / On-Premises",
                  desc: "Deploy DiCorner within your own cloud VPC or on-premises infrastructure. Full data sovereignty.",
                },
              ].map((opt) => (
                <div
                  key={opt.title}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {opt.title}
                  </h3>
                  <p className="text-sm text-gray-600">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-gray-600 mb-4">
            Need a security review or compliance questionnaire?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Contact Security Team
            </Link>
            <Link
              href="/schedule-demo"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Schedule Enterprise Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}