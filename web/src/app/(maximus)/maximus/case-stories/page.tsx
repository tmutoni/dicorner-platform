import Link from "next/link";
import { ArrowRight, TrendingDown, DollarSign, Thermometer } from "lucide-react";
import MapThumbnail from "@/components/maximus/MapThumbnail";

// TODO(client): Replace these placeholders with real case stories +
// before/after metrics + testimonial quotes during the walkthrough review.
const stories = [
  {
    slug: "craftsman-comfort",
    headline: "A 1920s Craftsman that finally cools upstairs.",
    address: "Portland, OR 97214",
    kicker: "Residential · HVAC",
    summary:
      "Owners had replaced two AC systems in twelve years. The real problem was a ducting path that starved the upstairs bedrooms. A zoned mini-split scope cut summer bills 28% and eliminated the room they used to avoid.",
    metrics: [
      { icon: TrendingDown, value: "28%", label: "summer bill reduction" },
      { icon: Thermometer, value: "4°F", label: "upstairs delta corrected" },
      { icon: DollarSign, value: "3.8 yr", label: "payback" },
    ],
  },
  {
    slug: "ranch-electrification",
    headline: "Ranch-style home, full electrification, phased over two years.",
    address: "Boulder, CO 80301",
    kicker: "Renewables · HVAC · Envelope",
    summary:
      "Envelope first. Then a cold-climate heat pump. Then 8.4 kW solar + storage. Sequenced so each phase funded the next — and the owners never lost comfort during a Colorado winter swap.",
    metrics: [
      { icon: TrendingDown, value: "62%", label: "annual energy use drop" },
      { icon: DollarSign, value: "$11.2k", label: "rebates stacked" },
      { icon: Thermometer, value: "0", label: "cold days without heat" },
    ],
  },
  {
    slug: "brownstone-sustain",
    headline: "Brooklyn brownstone: from 'always drafty' to tight, quiet, dry.",
    address: "Brooklyn, NY 11217",
    kicker: "Residential · Envelope",
    summary:
      "Three generations in the home, three generations of complaints. A targeted air-sealing + insulation scope — no new equipment — dropped winter bills by a third and solved the basement moisture the family had lived with for decades.",
    metrics: [
      { icon: TrendingDown, value: "33%", label: "winter bill reduction" },
      { icon: Thermometer, value: "18%", label: "infiltration reduced" },
      { icon: DollarSign, value: "2.1 yr", label: "payback" },
    ],
  },
];

export default function CaseStoriesPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <span className="text-xs mx-ink-soft uppercase tracking-wider">
          Case stories
        </span>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
          Homes, not projects.
        </h1>
        <p className="mt-5 text-lg mx-ink-soft max-w-2xl">
          Every story starts with a comfort problem. We&apos;re sharing the
          scope, the math, and what changed — anonymized to protect the
          homeowner&apos;s privacy.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s) => (
            <article
              key={s.slug}
              className="mx-surface rounded-2xl overflow-hidden flex flex-col"
            >
              <MapThumbnail address={s.address} />
              <div className="p-6 flex flex-col flex-1">
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--mx-primary)" }}
                >
                  {s.kicker}
                </span>
                <h2 className="mt-2 text-lg font-semibold leading-snug">
                  {s.headline}
                </h2>
                <p className="mt-3 text-sm mx-ink-soft">{s.summary}</p>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {s.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <m.icon
                        className="w-4 h-4 mx-auto mb-1"
                        style={{ color: "var(--mx-primary)" }}
                      />
                      <div className="text-base font-bold">{m.value}</div>
                      <div className="text-[10px] mx-ink-soft leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm mx-ink-soft max-w-2xl">
          Addresses are approximate neighborhoods, not exact homes. Real
          testimonials and named client stories will be added once the client
          supplies them.
        </p>

        <div className="mt-12">
          <Link
            href="/maximus/start"
            className="mx-btn-primary inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium"
          >
            Want your own case story? <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
