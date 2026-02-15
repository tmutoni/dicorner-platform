import Link from "next/link";
import {
  ClipboardCheck,
  Shield,
  FileText,
  CheckCircle,
  ArrowRight,
  Lock,
  Database,
  Clock,
  Search,
} from "lucide-react";
import { WhyDiCornerSection } from "@/components/GlobalSections";

export default function AuditServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <ClipboardCheck className="w-4 h-4" />
          Audit Service
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto">
          Compliance-Ready Audit Trails for Every Decision
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          DiCorner&apos;s audit service provides immutable, tamper-evident logs
          of every scoring decision, action recommendation, and system event,
          ready for regulators on day one.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/get-api-key"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get API Key
          </Link>
          <Link
            href="/schedule-demo"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Schedule Demo
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Automated compliance from event to report.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Automatic Capture",
              desc: "Every API call, scoring computation, and action dispatch is automatically logged with timestamps, inputs, outputs, and the user context.",
              icon: Database,
            },
            {
              step: "2",
              title: "Immutable Storage",
              desc: "Audit records are stored in append-only, tamper-evident logs. Cryptographic hashing ensures no record can be altered after creation.",
              icon: Lock,
            },
            {
              step: "3",
              title: "Search & Export",
              desc: "Query audit logs by user, time range, decision type, or outcome. Export in standard formats for regulatory submissions.",
              icon: Search,
            },
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mb-4">
                {item.step}
              </div>
              <item.icon className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Key Capabilities
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Shield,
                title: "SOC 2 Type II Compliance",
                desc: "Audit service is designed to meet SOC 2 requirements out of the box. Controls mapping, evidence collection, and reporting are built in.",
              },
              {
                icon: Clock,
                title: "Configurable Retention",
                desc: "Set retention policies per data type and jurisdiction. Automatic archival and purging ensure compliance with GDPR right-to-erasure and data minimization.",
              },
              {
                icon: FileText,
                title: "Regulatory Report Templates",
                desc: "Pre-built report templates for common regulatory frameworks. Generate compliance documentation with a single API call.",
              },
              {
                icon: Search,
                title: "Full-Text Search",
                desc: "Search across all audit records with powerful filtering. Find specific decisions, trace user journeys, or identify patterns across your scoring history.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Use Cases
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Financial Services",
              desc: "Meet strict regulatory requirements for decision documentation in lending, insurance, and banking applications.",
              points: [
                "Fair lending compliance",
                "Decision documentation",
                "Examiner-ready reports",
              ],
            },
            {
              title: "Healthcare & Life Sciences",
              desc: "Document decision-making for patient-facing applications with HIPAA-compliant audit trails.",
              points: [
                "HIPAA audit support",
                "Patient data tracking",
                "Clinical decision logs",
              ],
            },
            {
              title: "Enterprise Governance",
              desc: "Provide board-level visibility into how automated decisions affect customers and business outcomes.",
              points: [
                "Board reporting",
                "Risk assessment trails",
                "Policy compliance tracking",
              ],
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
              <ul className="space-y-2">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why DiCorner */}
      <WhyDiCornerSection />

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready for Audit-Ready Intelligence?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            See how DiCorner&apos;s audit service makes compliance a feature,
            not a burden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-api-key"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              Get API Key 
            </Link>
            <Link
              href="/schedule-demo"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
