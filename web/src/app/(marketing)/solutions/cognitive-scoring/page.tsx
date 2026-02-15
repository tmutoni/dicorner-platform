import Link from "next/link";
import {
  Brain,
  BarChart3,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Users,
  TrendingUp,
  FileText,
} from "lucide-react";
import { WhyDiCornerSection } from "@/components/GlobalSections";

export default function CognitiveScoringPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Brain className="w-4 h-4" />
          Cognitive Behavioral Scoring
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto">
          Deterministic Scores You Can Explain to Regulators
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          DiCorner&apos;s cognitive scoring engine transforms raw behavioral events
          into deterministic, explainable, and auditable scores.
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
          Three stages transform raw events into actionable intelligence.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Ingest Events",
              desc: "Send behavioral events via REST API or SDK. Page views, clicks, form interactions, session timing — any user action becomes a data point.",
              icon: Zap,
            },
            {
              step: "2",
              title: "Compute Scores",
              desc: "Our deterministic engine applies weighted formulas across engagement, friction, momentum, and intent dimensions. Every score has a clear formula.",
              icon: BarChart3,
            },
            {
              step: "3",
              title: "Explain & Act",
              desc: "Receive scores with full breakdowns: which events contributed, how weights were applied, and what actions to take next.",
              icon: FileText,
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
                icon: Brain,
                title: "Multi-Dimensional Scoring",
                desc: "Evaluate users across engagement, friction, momentum, and intent dimensions simultaneously. Each dimension uses transparent, weighted formulas.",
              },
              {
                icon: Shield,
                title: "Audit-Ready Output",
                desc: "Every score includes a full audit trail: input events, formula applied, weights used, and resulting classification. Perfect for regulated industries.",
              },
              {
                icon: TrendingUp,
                title: "Real-Time Computation",
                desc: "Scores update in real-time as new events arrive. No batch processing delays — act on user behavior as it happens.",
              },
              {
                icon: Users,
                title: "Cohort Analysis",
                desc: "Group users by behavioral patterns, not just demographics. Identify at-risk segments before churn signals appear in traditional metrics.",
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
              title: "Trial Conversion",
              desc: "Identify which trial users are genuinely engaged vs. just browsing. Target interventions at the right moment to convert.",
              points: [
                "Engagement depth scoring",
                "Feature adoption tracking",
                "Conversion probability signals",
              ],
            },
            {
              title: "Churn Prediction",
              desc: "Detect behavioral decay patterns weeks before users cancel. Act on deterministic signals, not probabilistic guesses.",
              points: [
                "Momentum decay detection",
                "Friction accumulation alerts",
                "Re-engagement triggers",
              ],
            },
            {
              title: "Compliance & Audit",
              desc: "Meet regulatory requirements with fully explainable scoring. Every decision has a clear, auditable rationale.",
              points: [
                "Complete audit trails",
                "Explainable decision logic",
                "Regulatory reporting",
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
            Ready to See Cognitive Scoring in Action?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Get started with a free sandbox API key or schedule a personalized
            demo with our team.
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
