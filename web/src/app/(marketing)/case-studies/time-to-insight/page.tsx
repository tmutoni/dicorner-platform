// app/case-studies/time-to-insight/page.tsx
import Link from "next/link";
import GlobalSections from "@/components/GlobalSections";

export default function TimeToInsight() {
  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
            SaaS Case Study
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
            From 90 Days to Hours: Proving Value with Golden Session Replay
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            How a SaaS company eliminated the 30–90 day cohort maturity wait
            and proved trial conversion ROI on day one.
          </p>
        </div>
      </section>

      {/* Key metrics */}
      <section className="border-y border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "90 to 1", label: "Days to Insight" },
            { value: "13%", label: "Conversion Lift" },
            { value: "90%", label: "Predictive Alignment" },
            { value: "2M+", label: "Expert Validators" },
          ].map((m) => (
            <div key={m.label}>
              <div className="text-3xl font-bold text-blue-600">{m.value}</div>
              <div className="text-sm text-gray-500 mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {/* Challenge */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              The Challenge
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A mid-market SaaS company offered 14-day free trials but couldn't
              measure the impact of UX changes until cohorts matured, 30 to 90
              days after users had already churned or converted.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This delay created a vicious cycle: by the time the team had data,
              the product had changed, users had moved on, and the insights were
              stale. Board presentations relied on lagging indicators, and the
              growth team couldn't prove ROI on interventions during trial
              periods.
            </p>
          </div>

          {/* Solution */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              The Solution
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              DiCorner's golden session replay methodology replaced the cohort
              maturity wait with real-time cognitive insights.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              Programmatic Cognitive Labeling
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Instead of waiting for outcome data, DiCorner captured session
              replays and applied programmatic labeling: session outcomes mapped
              directly to training labels, validated by cognitive science
              researchers from a global network of 2M+ experts.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              Real-Time Scoring
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Five cognitive metrics (DFI, DOI, TH, ER, CLI) scored user
              behavior within seconds of event ingestion. The growth team could
              see decision fatigue spikes and trust erosion patterns on day one
              of a trial.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              Validated Interventions
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Every NBA recommendation was validated against golden session
              replays before delivery, achieving 90% predictive alignment with
              human cognitive science experts.
            </p>
          </div>

          {/* Results */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              The Results
            </h2>
            <div className="space-y-4">
              {[
                {
                  metric: "Days-to-hours insight delivery",
                  detail:
                    "Golden session replay eliminated the 30–90 day wait. The team received cognitive insights within hours of integration.",
                },
                {
                  metric: "13% increase in trial-to-paid conversion",
                  detail:
                    "Targeted interventions based on cognitive scores converted users who would have otherwise churned.",
                },
                {
                  metric: "90% predictive alignment",
                  detail:
                    "Model accuracy validated by cognitive science experts, not just statistical correlation.",
                },
                {
                  metric: "Audit-ready reporting",
                  detail:
                    "Every recommendation included confidence bounds, psychological justification, and a complete audit trail for board presentations.",
                },
              ].map((r) => (
                <div
                  key={r.metric}
                  className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">{r.metric}</div>
                    <div className="text-sm text-gray-600">{r.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="border-l-4 border-blue-600 pl-6 py-2">
            <p className="text-lg text-gray-700 italic">
              "We used to wait months for cohort data. With DiCorner, we had
              actionable cognitive insights on the first day of our trial
              rollout. The board finally had real-time proof of ROI."
            </p>
            <p className="text-sm text-gray-500 mt-2">
              — VP of Product, SaaS Client
            </p>
          </div>
        </div>
      </section>

      <GlobalSections />

      {/* CTA */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Prove Value in Days, Not Months
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/schedule-demo"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Schedule Demo
            </Link>
            <Link
              href="/contact"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}