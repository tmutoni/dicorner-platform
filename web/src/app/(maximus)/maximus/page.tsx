import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Home,
  HeartHandshake,
  ClipboardList,
  Ruler,
  FileCheck,
} from "lucide-react";
import StatBand from "@/components/maximus/StatBand";
import MoatCard from "@/components/maximus/MoatCard";

const stats = [
  { value: "Since 2006", label: "Consulting residential energy" },
  { value: "10,000+", label: "Homes walked" },
  { value: "~90%", label: "New work through referrals" },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Six-question intake",
    copy: "Structure, age, time of residence, occupancy, utility, bills. You fill it out. We read it carefully.",
  },
  {
    icon: Ruler,
    title: "On-site walkthrough",
    copy: "We benchmark what you told us and capture what can't be surveyed — equipment, placement, and the comfort read.",
  },
  {
    icon: Calculator,
    title: "The math",
    copy: "Cost vs. benefit, energy-savings estimate, and a concrete quote — not a generic audit PDF.",
  },
  {
    icon: HeartHandshake,
    title: "Build · deliver · sustain",
    copy: "We stand by the recommendation — from install through the first seasons of operation.",
  },
];

export default function MaximusHome() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <span className="mx-chip rounded-full px-3 py-1 text-xs font-medium">
          Behavioral Energy Intelligence
        </span>
        <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
          Comfort first. The savings follow.
        </h1>
        <p className="mt-5 text-lg mx-ink-soft max-w-2xl">
          Maximus Energy has spent nearly two decades turning how a home{" "}
          <em>feels</em> into measurable cost and carbon reduction. We walk the
          house, do the math, and stay with you through install and the first
          seasons of operation.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/maximus/start"
            className="mx-btn-primary inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium"
          >
            Start your assessment <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/maximus/process"
            className="mx-btn-outline inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium"
          >
            See how we work
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <StatBand stats={stats} />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-2xl mb-10">
          <span className="text-xs mx-ink-soft uppercase tracking-wider">
            Our process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            From a six-question survey to a home that finally behaves.
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div key={s.title} className="mx-surface rounded-xl p-6">
              <s.icon
                className="w-6 h-6 mb-3"
                style={{ color: "var(--mx-primary)" }}
              />
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm mx-ink-soft mt-2">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-2xl mb-10">
          <span className="text-xs mx-ink-soft uppercase tracking-wider">
            Why clients stay
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Two moats nobody else is investing in.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <MoatCard
            icon={Home}
            kicker="Moat 01"
            title="We read comfort, not just kilowatts."
          >
            Most audits score buildings. We score people and places together.
            The room you avoid, the thermostat you don&apos;t trust, the baby
            who won&apos;t sleep upstairs — that&apos;s where the real scope
            lives. Character and comfort come before performance.
          </MoatCard>
          <MoatCard
            icon={FileCheck}
            kicker="Moat 02"
            title="We do the math you can take to a bank."
          >
            Cost-and-benefit analysis, a grounded energy-savings estimate, and
            a quote — not a stack of generic recommendations. You get a
            decision you can act on, and the numbers to back it up.
          </MoatCard>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div
          className="rounded-2xl p-10 md:p-14"
          style={{ background: "var(--mx-primary)", color: "white" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl">
            Tell us how your home feels. We&apos;ll take it from there.
          </h2>
          <p
            className="mt-4 max-w-xl"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Six questions. Two business days. One clear path to a home that
            finally works — for your comfort, your budget, and the grid.
          </p>
          <Link
            href="/maximus/start"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium"
            style={{ color: "var(--mx-primary)" }}
          >
            Start your assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
