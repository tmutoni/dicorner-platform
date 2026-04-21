import Link from "next/link";
import { ArrowRight, Award, Users, Home as HomeIcon, Heart } from "lucide-react";
import StatBand from "@/components/maximus/StatBand";

const stats = [
  { value: "2006", label: "Year founded" },
  { value: "10K+", label: "Homes walked" },
  { value: "~90%", label: "Referral share" },
];

const principles = [
  {
    icon: Heart,
    title: "Comfort first.",
    copy: "Performance functionality is a means. Comfort understanding is the end. Every scope is built to make the home feel better before it makes the meter spin slower.",
  },
  {
    icon: HomeIcon,
    title: "The home is the evidence.",
    copy: "We don't trust surveys without site visits and we don't trust site visits without the homeowner's story. Data and character go through the same door.",
  },
  {
    icon: Award,
    title: "The math is the product.",
    copy: "A recommendation without a quote is a wish. We ship a decision: cost, benefit, payback, and scope — on one page you can act on.",
  },
  {
    icon: Users,
    title: "We stay.",
    copy: "Build, deliver, sustain. Ninety percent of our new work comes from the last home we finished. That only works if we stick around past the install.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10">
        <span className="text-xs mx-ink-soft uppercase tracking-wider">
          About Maximus
        </span>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
          Nearly two decades of reading houses for a living.
        </h1>
        <p className="mt-5 text-lg mx-ink-soft">
          Maximus Energy was founded in 2006 on a simple premise: the homes
          that save the most energy are the ones that finally feel right. Since
          then we&apos;ve walked more than ten thousand homes, and built a
          practice that bridges the gap between what a homeowner feels and
          what a utility bill proves.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-16">
        <StatBand stats={stats} />
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold mb-6">What we believe</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {principles.map((p) => (
            <div key={p.title} className="mx-surface rounded-2xl p-6">
              <p.icon
                className="w-5 h-5 mb-3"
                style={{ color: "var(--mx-primary)" }}
              />
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm mx-ink-soft mt-2">{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div
          className="rounded-2xl p-10"
          style={{ background: "var(--mx-primary)", color: "white" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold max-w-2xl">
            A new category: Behavioral Energy Intelligence.
          </h2>
          <p
            className="mt-3 max-w-xl"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            We think the next wave of residential energy isn&apos;t in bigger
            equipment — it&apos;s in smaller decisions, made at the right
            moment, by a homeowner who trusts their data. We&apos;re building
            the practice that sits there.
          </p>
          <Link
            href="/maximus/start"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium"
            style={{ color: "var(--mx-primary)" }}
          >
            Work with us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
