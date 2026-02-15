import Link from "next/link";
import { Shield, Zap, Users, Eye, Heart, Lock } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Deterministic Intelligence",
    description:
      "We use a hybrid system of hard-coded rules + interpretable ML (logistic regression, GBDT) to ensure every score is reproducible and audit-ready.",
  },
  {
    icon: Eye,
    title: "Cognitive-First Scoring",
    description:
      "Instead of measuring clicks and pageviews, we model the psychological states behind behavior: Decision Fatigue, Trust Health, Drop-Off Intent, Engagement Readiness, and Conversion Likelihood.",
  },
  {
    icon: Lock,
    title: "Governance-Ready NBA",
    description:
      "Every recommendation includes confidence bounds, psychological justification, expected impact with effort estimates, and human-in-the-loop override capability.",
  },
];

const values = [
  {
    title: "Transparency over Mystery",
    description:
      "We believe in explainable AI. Every score, every recommendation, every model decision is auditable.",
  },
  {
    title: "Speed to Value",
    description:
      "We help clients prove ROI during trial periods, not after long implementation cycles.",
  },
  {
    title: "Human + Machine",
    description:
      "We augment human judgment with ML, never replace it. Our cognitive science community validates every model output.",
  },
  {
    title: "Compliance as Default",
    description:
      "We build for regulated industries first. Privacy, security, and auditability are non-negotiable.",
  },
];

const stats = [
  { value: "50+", label: "Global clients across Fintech, SaaS, E-commerce" },
  { value: "500K+", label: "Behavioral insights captured and validated" },
  { value: "20%", label: "Average churn reduction across pilot programs" },
  { value: "13%", label: "Increase in trial-to-paid conversion" },
  { value: "90%", label: "Predictive alignment (model accuracy validated by experts)" },
  { value: "99.9%", label: "Platform uptime" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About DiCorner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            DiCorner exists to close the cognitive gap in modern analytics. We
            help growth teams understand <em>why</em> users behave the way they
            do, not just <em>what</em> they clicked.
          </p>
        </div>
      </div>

      {/* The Problem */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            The Problem We&apos;re Solving
          </h2>
          <p className="text-gray-600 mb-6">
            Traditional analytics tools tell you that &quot;User viewed pricing
            4x&quot; but can&apos;t explain <em>why</em>. Was it comparison
            paralysis? Trust erosion? Decision fatigue? Without understanding the
            cognitive state, interventions are guesswork.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Wasted resources on ineffective interventions",
              "Prolonged trial periods without proof of value",
              "Compliance risks from black-box AI recommendations",
              "Missed opportunities to save at-risk customers",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">&#x2717;</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Approach */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Approach
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((p) => (
            <div key={p.title} className="bg-white rounded-xl shadow-lg p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <p.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-gray-600">{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology */}
      <div className="bg-white border-y">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Technology
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Golden Session Replay Methodology
              </h3>
              <p className="text-sm text-gray-600">
                Unlike traditional analytics that wait 30-90 days for cohort
                maturity, we use golden session replays with programmatic
                cognitive science labeling for insights in days.
              </p>
            </div>
            <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Crowd-Network Integration
              </h3>
              <p className="text-sm text-gray-600">
                Our global network of 2M+ cognitive science researchers and
                behavioral experts provides human-in-the-loop validation,
                ensuring predictions match real-world cognition.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Compliance-First Architecture
              </h3>
              <p className="text-sm text-gray-600">
                LLM never scores or decides (narration only). No protected
                attributes used in modeling. Complete audit trail. Circuit
                breakers auto-revert to rules if ML drifts &gt;20%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Results
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="bg-white border-y">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Our Team
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            DiCorner was founded by behavioral data scientists and ML engineers
            frustrated with the &quot;correlation vs. causation&quot; gap in
            traditional analytics.
          </p>
          <div className="max-w-md mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Tracy Mutoni</h3>
              <p className="text-sm text-gray-600">
                Cofounder &amp; CEO. Product, ML Engineering
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Values
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-600">{v.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Contact Us</h2>
          <p className="text-blue-100 mb-2">
            Email: emily@dicornerusa.com
          </p>
          <p className="text-blue-100 mb-6">
            Supported Regions: 80+ countries globally
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/schedule-demo"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Schedule a Demo
            </Link>
            <Link
              href="/case-studies"
              className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Case Studies
            </Link>
            <Link
              href="/docs"
              className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Read Our Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
