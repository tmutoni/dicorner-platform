import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Ruler,
  Calculator,
  HeartHandshake,
  Quote,
} from "lucide-react";

const steps = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Six-question intake",
    blurb: "You fill it out. We read it carefully.",
    detail:
      "Structure, age, time of residence, occupancy, utility, and typical bills. Six questions, five minutes. What we're really looking for isn't the numbers — it's what the numbers hint at. A 60-year-old home with a $500 summer bill and two kids upstairs tells us something before we ever drive out.",
    asked: [
      "What kind of home is it?",
      "Roughly how old is it?",
      "How long have you lived there?",
      "How many people occupy it?",
      "Who's your utility and what's a typical bill?",
      "Where does the home feel wrong?",
    ],
  },
  {
    n: "02",
    icon: Ruler,
    title: "On-site walkthrough",
    blurb: "We benchmark your survey and capture what can't be surveyed.",
    detail:
      "The site visit is where we separate the home from the story of the home. We verify equipment, placement, envelope, and airflow. We also read character: the rooms you avoid, the decisions you've been putting off, the comfort you've learned to live without. Both data streams feed the scope.",
    asked: [
      "Equipment: make, model, age, condition",
      "Envelope: insulation, windows, infiltration",
      "Placement: how systems interact with how you live",
      "Comfort: what's been tolerated vs. what's been solved",
    ],
  },
  {
    n: "03",
    icon: Calculator,
    title: "The math",
    blurb: "Cost and benefit. Estimate. Quote. On one page.",
    detail:
      "This is the moat. We don't hand you a generic audit PDF — we hand you a decision. We cost out each recommendation, model the savings off your actual utility usage (not a spreadsheet average), and put a quote against it. You leave knowing what it costs, what it returns, and when.",
    asked: [
      "Cost-and-benefit analysis per scope item",
      "Energy-savings estimate grounded in your bills",
      "Quote with scope, timeline, and payment terms",
      "Payback and priority ranking",
    ],
  },
  {
    n: "04",
    icon: HeartHandshake,
    title: "Build · deliver · sustain",
    blurb: "We stay past the install.",
    detail:
      "The recommendation is only as good as the first two seasons of operation. We manage the build, validate the delivery, and check back to make sure the savings — and the comfort — actually show up. That's why 90% of our work still comes from referrals.",
    asked: [
      "Coordinate trades and procurement",
      "Verify install against scope",
      "First-season comfort and bill check-in",
      "Ongoing sustainment recommendations",
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10">
        <span className="text-xs mx-ink-soft uppercase tracking-wider">
          How we work
        </span>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
          We measure comfort before we measure kilowatts.
        </h1>
        <p className="mt-5 text-lg mx-ink-soft">
          Energy audits tell you what&apos;s wrong with a building. Our process
          tells you what&apos;s wrong with the life you&apos;re living inside
          it — and what it will cost to fix.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            background: "var(--mx-primary-soft)",
            border: "1px solid var(--mx-line)",
          }}
        >
          <Quote
            className="w-6 h-6 mb-3"
            style={{ color: "var(--mx-primary)" }}
          />
          <p className="text-lg md:text-xl font-medium">
            Comfort understanding beats performance functionality. If the home
            feels right, the savings hold. If it doesn&apos;t, the best
            equipment in the world gets turned down, bypassed, or ripped out.
          </p>
          <p className="text-sm mx-ink-soft mt-3">
            — the working principle behind every Maximus engagement
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-12">
          {steps.map((s) => (
            <div key={s.n} className="grid md:grid-cols-[120px_1fr] gap-6">
              <div>
                <div
                  className="text-4xl font-bold"
                  style={{ color: "var(--mx-primary)" }}
                >
                  {s.n}
                </div>
                <s.icon
                  className="w-6 h-6 mt-2"
                  style={{ color: "var(--mx-primary)" }}
                />
              </div>
              <div className="mx-surface rounded-2xl p-8">
                <h2 className="text-2xl font-semibold">{s.title}</h2>
                <p className="mx-ink-soft mt-1">{s.blurb}</p>
                <p className="mt-5">{s.detail}</p>
                <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-sm">
                  {s.asked.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "var(--mx-primary)" }}
                      />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/maximus/start"
            className="mx-btn-primary inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium"
          >
            Start with the six questions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
