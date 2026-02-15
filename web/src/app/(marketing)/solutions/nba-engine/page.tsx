import Link from "next/link";
import {
  Target,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Settings,
  BarChart3,
  MessageSquare,
  Layers,
} from "lucide-react";
import { WhyDiCornerSection } from "@/components/GlobalSections";

export default function NbaEnginePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Target className="w-4 h-4" />
          Next-Best-Action Engine
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto">
          Prescriptive Actions, Not Just Predictions
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          DiCorner&apos;s NBA engine translates behavioral scores into specific,
          prioritized actions your team can execute immediately, with full
          audit trails.
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
          From behavioral scores to concrete actions in three steps.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Score Analysis",
              desc: "The engine reads cognitive scores across all engagement, friction, momentum, and intent to understand the user's current state.",
              icon: BarChart3,
            },
            {
              step: "2",
              title: "Rule Matching",
              desc: "Deterministic rules match score patterns to action templates. Every recommendation traces back to a specific rule and threshold.",
              icon: Settings,
            },
            {
              step: "3",
              title: "Action Dispatch",
              desc: "Prioritized actions are delivered via API with confidence levels, urgency flags, and full explanations for why each action was recommended.",
              icon: Zap,
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
                icon: Target,
                title: "No-Code Rule Builder",
                desc: "Configure action rules through a visual interface. Set thresholds, define conditions, and map actions — no engineering required.",
              },
              {
                icon: Layers,
                title: "Priority & Conflict Resolution",
                desc: "When multiple actions qualify, the engine applies priority rules and conflict resolution to deliver the single best action per user.",
              },
              {
                icon: Shield,
                title: "Circuit Breakers",
                desc: "Built-in safeguards prevent action fatigue. Rate limits, cooldown periods, and escalation thresholds protect the user experience.",
              },
              {
                icon: MessageSquare,
                title: "Multi-Channel Delivery",
                desc: "Actions can trigger in-app messages, emails, webhooks, or CRM updates. Each channel has its own throttling and delivery rules.",
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
              title: "Onboarding Optimization",
              desc: "Guide new users through critical activation steps with contextual nudges based on their real-time behavioral state.",
              points: [
                "Step-by-step guidance triggers",
                "Friction point interventions",
                "Activation milestone tracking",
              ],
            },
            {
              title: "Retention Campaigns",
              desc: "Automatically trigger re-engagement actions when momentum scores drop below thresholds you define.",
              points: [
                "Automated re-engagement flows",
                "Personalized offer triggers",
                "Win-back campaign rules",
              ],
            },
            {
              title: "Upsell & Expansion",
              desc: "Identify power users ready for expansion and trigger the right offer at the right moment.",
              points: [
                "Usage pattern detection",
                "Feature adoption signals",
                "Upgrade timing optimization",
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
            Ready to Move From Insights to Actions?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            See how the NBA engine turns behavioral scores into revenue-driving
            actions for your team.
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
