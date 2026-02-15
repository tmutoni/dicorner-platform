import Link from "next/link";
import { ArrowRight, TrendingUp, Zap } from "lucide-react";

const caseStudies = [
  {
    slug: "maximus-energy",
    company: "Maximus Energy",
    industry: "Fintech / Energy",
    icon: TrendingUp,
    headline: "How Maximus Energy Reduced Churn by 34% in 90 Days",
    summary:
      "Maximus Energy used DiCorner's cognitive scoring to identify at-risk customers weeks before traditional metrics flagged them, enabling proactive interventions that dramatically reduced churn.",
    stats: [
      { label: "Churn Reduction", value: "34%" },
      { label: "Time to Value", value: "12 days" },
      { label: "ROI", value: "8.2x" },
    ],
  },
  {
    slug: "time-to-insight",
    company: "Time to Insight",
    industry: "SaaS / Analytics",
    icon: Zap,
    headline: "Time to Insight Increased Trial Conversions by 28%",
    summary:
      "By deploying DiCorner's NBA engine during the trial period, Time to Insight delivered personalized activation nudges that converted more trial users into paying customers.",
    stats: [
      { label: "Conversion Lift", value: "28%" },
      { label: "Implementation", value: "5 days" },
      { label: "ROI", value: "6.1x" },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Case Studies
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how companies use DiCorner&apos;s cognitive behavioral
            intelligence to drive measurable business outcomes.
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study) => (
            <div
              key={study.slug}
              className="bg-white rounded-xl shadow-lg p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <study.icon className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">
                      {study.industry}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {study.company}
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    {study.headline}
                  </p>
                  <p className="text-gray-600 mb-6">{study.summary}</p>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                  >
                    Read Full Case Study <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex md:flex-col gap-6 md:gap-4 md:min-w-[160px]">
                  {study.stats.map((stat) => (
                    <div key={stat.label} className="text-center md:text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Want Results Like These?
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Schedule a demo to see how DiCorner can deliver measurable
              improvements for your specific use case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/schedule-demo"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Schedule Demo
              </Link>
              <Link
                href="/contact"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
