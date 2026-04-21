import Link from "next/link";
import { ArrowRight, Home, Wind, Sun, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Home,
    name: "Residential Energy Consultation",
    tagline: "Whole-home scope, grounded in how you actually live.",
    body: "We walk your home, benchmark the envelope and equipment, read comfort, and hand you a prioritized scope with a quote. Ideal for homeowners who know something is off but don't know what to fix first.",
    deliver: [
      "Six-question intake",
      "On-site comfort + benchmark walkthrough",
      "Cost/benefit analysis and savings estimate",
      "Prioritized scope + quote",
    ],
  },
  {
    icon: Wind,
    name: "HVAC Scope Development",
    tagline: "Right-sized equipment that matches your home — not the catalog.",
    body: "Most HVAC replacements are oversized, misplaced, or tuned to the wrong room. We develop the scope before anyone cuts a check: load calc, equipment selection, duct and airflow review, install spec.",
    deliver: [
      "Manual-J-style load calculation",
      "Equipment and configuration recommendation",
      "Duct/airflow review",
      "Install spec and vetted-installer handoff",
    ],
  },
  {
    icon: Sun,
    name: "Renewables Scope Development",
    tagline: "Solar, storage, and electrification — in the right order.",
    body: "Renewables pay back best when the house is ready for them. We sequence envelope, HVAC, and solar/storage so each investment multiplies the next. No panels on a leaky roof, no batteries sized for last year's bill.",
    deliver: [
      "Readiness assessment (envelope, service, roof)",
      "Solar + storage sizing tied to your load profile",
      "Incentive and rebate stack",
      "Phased roadmap with payback modeling",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <span className="text-xs mx-ink-soft uppercase tracking-wider">
          Services
        </span>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
          Three scopes, one methodology.
        </h1>
        <p className="mt-5 text-lg mx-ink-soft max-w-2xl">
          Every engagement runs the same playbook: comfort read, benchmark,
          math, quote. What changes is where we point it.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.name} className="mx-surface rounded-2xl p-8 flex flex-col">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "var(--mx-primary-soft)" }}
              >
                <s.icon
                  className="w-5 h-5"
                  style={{ color: "var(--mx-primary)" }}
                />
              </div>
              <h2 className="text-xl font-semibold">{s.name}</h2>
              <p className="text-sm mx-ink-soft mt-1">{s.tagline}</p>
              <p className="mt-5 text-sm">{s.body}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {s.deliver.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <CheckCircle
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: "var(--mx-primary)" }}
                    />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/maximus/start"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
                style={{ color: "var(--mx-primary)" }}
              >
                Start with this scope <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
