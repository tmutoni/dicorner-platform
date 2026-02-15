import Link from "next/link";
import {
  Lightbulb,
  BarChart3,
  Shield,
  CheckCircle,
  ArrowRight,
  Eye,
  TrendingUp,
  GitBranch,
  FileText,
} from "lucide-react";
import { WhyDiCornerSection } from "@/components/GlobalSections";

export default function DecisionIntelligencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Lightbulb className="w-4 h-4" />
          Decision Intelligence
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto">
          Every Decision Logged, Explained, and Auditable
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          DiCorner&apos;s decision intelligence layer provides complete
          transparency into how every scoring decision and action recommendation
          was made.
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
          Full decision transparency from data to action.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Decision Capture",
              desc: "Every scoring computation and action recommendation is logged with its full context: inputs, rules applied, thresholds checked, and outputs generated.",
              icon: FileText,
            },
            {
              step: "2",
              title: "Explanation Generation",
              desc: "Human-readable explanations are generated for each decision. Understand not just what happened, but why in language stakeholders and regulators can follow.",
              icon: Eye,
            },
            {
              step: "3",
              title: "Audit & Review",
              desc: "Access decision logs through the dashboard or API. Filter, search, and export for compliance reviews, stakeholder reporting, and continuous improvement.",
              icon: Shield,
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
                icon: GitBranch,
                title: "Decision Trees Visualization",
                desc: "See the exact path each decision took through your rule set. Understand which conditions were met, which were bypassed, and why.",
              },
              {
                icon: BarChart3,
                title: "Impact Analytics",
                desc: "Measure the business impact of every decision. Track conversion lifts, churn reductions, and revenue attribution back to specific rules.",
              },
              {
                icon: Shield,
                title: "Compliance Reporting",
                desc: "Generate regulatory-ready reports that document your decision-making process. SOC 2, GDPR, and industry-specific templates included.",
              },
              {
                icon: TrendingUp,
                title: "Continuous Optimization",
                desc: "Identify underperforming rules and optimize thresholds based on measured outcomes. Data-driven refinement, not guesswork.",
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
              title: "Regulatory Compliance",
              desc: "Meet the explainability requirements of GDPR, CCPA, and industry-specific regulations with built-in decision documentation.",
              points: [
                "Automated audit trails",
                "Regulatory report generation",
                "Right-to-explanation support",
              ],
            },
            {
              title: "Stakeholder Reporting",
              desc: "Show executives and board members exactly how behavioral intelligence drives business outcomes, with data to prove it.",
              points: [
                "Executive dashboards",
                "ROI attribution reports",
                "Decision impact summaries",
              ],
            },
            {
              title: "Model Governance",
              desc: "Maintain full control over your scoring rules with version tracking, approval workflows, and rollback capabilities.",
              points: [
                "Rule version history",
                "Change approval workflows",
                "A/B testing frameworks",
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
            Ready for Explainable Intelligence?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            See how decision intelligence turns your scoring system into a
            fully transparent, auditable asset.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-api-key"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              Get API Key <ArrowRight className="w-4 h-4" />
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
