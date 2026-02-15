import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Clock,
  BarChart3,
} from "lucide-react";

export default function MaximusEnergyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Back Link */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span className="text-sm font-medium text-blue-600 mb-2 block">
            Fintech / Energy
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How Maximus Energy Reduced Churn by 34% in 90 Days
          </h1>
          <p className="text-xl text-gray-600">
            A leading energy fintech used DiCorner&apos;s cognitive behavioral
            scoring to detect at-risk customers weeks earlier than traditional
            analytics and took action before it was too late.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: TrendingUp,
              value: "34%",
              label: "Churn Reduction",
            },
            {
              icon: Clock,
              value: "12 days",
              label: "Time to Value",
            },
            {
              icon: BarChart3,
              value: "8.2x",
              label: "ROI in First Year",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Challenge */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            The Challenge
          </h2>
          <p className="text-gray-600 mb-4">
            Maximus Energy, a fast-growing energy fintech serving over 50,000
            customers, was experiencing a 12% monthly churn rate that was
            threatening their growth trajectory. Their existing analytics stack
            relied on lagging indicators by the time a customer showed up as
            &quot;at-risk&quot; in their dashboards, it was often too late.
          </p>
          <p className="text-gray-600">
            Key challenges included:
          </p>
          <ul className="mt-4 space-y-3">
            {[
              "Traditional metrics (login frequency, support tickets) detected churn too late",
              "Customer success team was reactive, not proactive",
              "No way to prioritize which customers needed immediate attention",
              "Compliance requirements meant they needed explainable decision-making",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Solution */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            The Solution
          </h2>
          <p className="text-gray-600 mb-4">
            Maximus Energy deployed DiCorner&apos;s cognitive scoring engine and
            NBA (Next-Best-Action) system to transform their approach to
            customer retention:
          </p>
          <div className="space-y-6">
            {[
              {
                title: "Behavioral Event Ingestion",
                desc: "Integrated DiCorner's SDK to capture 15+ behavioral signals including session depth, feature usage patterns, billing page visits, and support interaction sentiment.",
              },
              {
                title: "Multi-Dimensional Scoring",
                desc: "Configured engagement, friction, momentum, and intent scores tailored to their customer journey. Each score uses transparent, auditable formulas.",
              },
              {
                title: "Automated NBA Triggers",
                desc: "Set up action rules that automatically dispatched personalized interventions from in-app tips to CSM outreach based on score thresholds.",
              },
              {
                title: "Compliance Documentation",
                desc: "Every scoring decision and action recommendation was logged with full audit trails, meeting their regulatory requirements for explainability.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            The Results
          </h2>
          <p className="text-gray-600 mb-6">
            Within 90 days of deployment, Maximus Energy saw transformative
            results:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                metric: "34% reduction in monthly churn",
                detail: "From 12% to 7.9% monthly churn rate",
              },
              {
                metric: "3 weeks earlier detection",
                detail: "At-risk customers identified 21 days sooner",
              },
              {
                metric: "8.2x ROI in first year",
                detail: "Revenue saved vs. DiCorner investment",
              },
              {
                metric: "12-day implementation",
                detail: "From SDK integration to first actionable scores",
              },
              {
                metric: "92% audit pass rate",
                detail: "First-time pass on regulatory compliance review",
              },
              {
                metric: "45% CSM efficiency gain",
                detail: "Customer success team focused on highest-impact cases",
              },
            ].map((item) => (
              <div key={item.metric} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">
                    {item.metric}
                  </div>
                  <div className="text-sm text-gray-500">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section className="bg-blue-600 rounded-xl p-8 mb-8 text-white">
          <blockquote className="text-lg italic mb-4">
            &quot;DiCorner gave us something we&apos;ve never had before:
            the ability to explain exactly why we flagged a customer as at-risk
            and what we did about it. Our regulators love it, and our churn
            numbers speak for themselves.&quot;
          </blockquote>
          <div className="font-semibold">— VP of Customer Success, Maximus Energy</div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to See Similar Results?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/schedule-demo"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              Schedule Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies/time-to-insight"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Read Next Case Study
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
