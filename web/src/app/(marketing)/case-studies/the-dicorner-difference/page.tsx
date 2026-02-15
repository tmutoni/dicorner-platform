// web/src/app/(marketing)/case-studies/the-dicorner-difference/page.tsx
// COMMIT 2: feat: add The DiCorner Difference case study page
// Contains: migrated sections (Compliance-First, Circuit Breakers, Known Limitations)
// + hybrid testimonial with Why DiCorner value props

import Link from "next/link";

export default function TheDiCornerDifference() {
  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
            Why We&rsquo;re Different
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
            The DiCorner Difference
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Built for compliance-first teams who refuse to trade auditability
            for intelligence. Here&rsquo;s how DiCorner is fundamentally
            different from black-box analytics.
          </p>
        </div>
      </section>

      {/* Built for Compliance-First Teams */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Built for Compliance-First Teams
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Most analytics platforms treat compliance as an afterthought.
            DiCorner is architected from the ground up for regulated industries
            where every decision must be explainable, reproducible, and
            auditable.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Deterministic Scoring",
                description:
                  "Hybrid system of hard-coded rules and interpretable ML (logistic regression, GBDT) ensures every score is reproducible. Run the same inputs twice, get the same outputs.",
              },
              {
                title: "LLM Never Scores or Decides",
                description:
                  "The LLM layer is strictly limited to narration. All scoring and decision-making is handled by the deterministic ML core. This separation ensures predictable, auditable outputs.",
              },
              {
                title: "No Protected Attributes",
                description:
                  "DiCorner does not use race, gender, income, or any protected attribute in modeling. Behavioral events only. Zero risk of discriminatory profiling.",
              },
              {
                title: "Complete Audit Trail",
                description:
                  "Every decision includes a trace_id linking to input events, model version, rule pack version, NBA output, explanation output, and any human overrides. Reproduce any recommendation months later.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Circuit Breakers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Circuit Breakers Built In
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            AI systems fail. The question is whether they fail safely. DiCorner
            includes automatic safeguards that prevent runaway ML from making
            decisions your compliance team hasn&rsquo;t approved.
          </p>

          <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
            {[
              {
                trigger: "Model drift exceeds 20%",
                action:
                  "System auto-reverts to rule-based recommendations. No human intervention needed.",
              },
              {
                trigger: "Confidence drops below threshold",
                action:
                  "Recommendations are downgraded from 'Do Now' to 'Try Experiment' or 'Ignore' automatically.",
              },
              {
                trigger: "Human override logged",
                action:
                  "System tracks 'recommendation_ignored' events to refine future precision. Every disagreement improves the model.",
              },
              {
                trigger: "Anomalous input patterns",
                action:
                  "Flagged for manual review. Scores are held until validated rather than served with false confidence.",
              },
            ].map((cb, i) => (
              <div
                key={i}
                className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  !
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {cb.trigger}
                  </div>
                  <div className="text-gray-600 text-sm">{cb.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Known Limitations */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Known Limitations (Phase 1)
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Transparency means telling you what we can&rsquo;t do yet, not just
            what we can. Here&rsquo;s what&rsquo;s on our roadmap.
          </p>

          <div className="space-y-4">
            {[
              {
                limitation: "Training data from 15 SMB clients",
                context:
                  "Our models are trained on 6 months of anonymized data from 15 SMB clients (30K+ users). Enterprise-specific patterns may require fine-tuning during onboarding.",
              },
              {
                limitation: "No fintech-specific training data",
                context:
                  "We intentionally excluded fintech-specific data to avoid domain overfitting. Fintech clients benefit from our general behavioral models, validated by cognitive science experts.",
              },
              {
                limitation: "Minimum 50 events per user",
                context:
                  "Reliable cognitive scoring requires at least 50 behavioral events per user. Users below this threshold are flagged as 'insufficient data' rather than scored with false confidence.",
              },
              {
                limitation: "Explainability layer is batch-generated",
                context:
                  "LLM narration of scores is not real-time. Scoring is real-time (<300ms), but natural language explanations are generated in batch. Dashboard updates reflect this.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.limitation}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.context}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial + Value Props Hybrid */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Trusted by Industry Leaders
          </h2>

          {/* Primary testimonial */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 mb-10">
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-2">5/5 UX/UI</span>
            </div>
            <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
              &ldquo;The predictive transparency provided by the DiCorner team
              was the deciding factor for us. Unlike other black-box analytics
              tools, her platform allowed our Risk &amp; Compliance leads to see
              exactly how ML scores were generated. This level of auditability
              gave us the confidence to automate behavioral decisions that were
              previously manual.&rdquo;
            </blockquote>
            <div className="text-sm text-gray-500 font-medium">
              Maximus Energy Consultation
            </div>
          </div>

          {/* Value prop trust cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Deterministic Intelligence",
                description:
                  "Every score is reproducible and audit-ready. Hard-coded rules plus interpretable ML ensure compliance teams can trace any decision.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Governance-Ready NBA",
                description:
                  "Every recommendation includes confidence bounds, psychological justification, expected impact, and human override capability.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: "Human + Machine",
                description:
                  "2M+ cognitive science researchers validate every model output. We augment human judgment with ML, never replace it.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-gray-200 p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            See the Difference for Yourself
          </h2>
          <p className="text-gray-600 mb-8">
            Join 50+ companies using DiCorner to make audit-ready behavioral
            decisions.
          </p>
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
