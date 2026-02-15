// web/src/components/GlobalSections.tsx
// COMMIT 1: fix: GlobalSections default export
// Fixes: Module has no default export (time-to-insight bug)
// Matches existing codebase: lucide-react icons, max-w-6xl mx-auto px-4, bg-white rounded-xl shadow-lg

import Link from "next/link";
import { Shield, Zap, Users, BookOpen } from "lucide-react";

export function WhyDiCornerSection() {
  const items = [
    {
      icon: Shield,
      title: "Deterministic & Auditable",
      description:
        "Every score, recommendation, and model decision includes a complete audit trail. Compliance teams can trace any decision back to specific behavioral events.",
    },
    {
      icon: Zap,
      title: "Prove Value in Days",
      description:
        "Golden session replay methodology delivers insights in days, not the 30-90 days traditional analytics require for cohort maturity.",
    },
    {
      icon: Users,
      title: "Human-Validated",
      description:
        "90% predictive alignment verified by 2M+ cognitive science researchers. Not just statistical correlation, real human cognition validation.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Why DiCorner</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Built for compliance-first teams who need deterministic, explainable
          intelligence. Unlike black-box analytics, every DiCorner output
          includes psychological justification, confidence bounds, and expected
          impact estimates.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <item.icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
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
    </section>
  );
}

export function BlogCardsPlaceholder() {
  const blogs = [
    {
      title: "Understanding Decision Fatigue in Digital Products",
      category: "Behavioral Intelligence",
    },
    {
      title: "Why Deterministic AI Matters for Compliance Teams",
      category: "Compliance",
    },
    {
      title: "Golden Session Replays: A New Approach to User Research",
      category: "Methodology",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Featured Content
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.title}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                {blog.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-500">Coming soon</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// DEFAULT EXPORT — fixes the import error on time-to-insight and other pages
export default function GlobalSections() {
  return (
    <>
      <WhyDiCornerSection />
      <BlogCardsPlaceholder />
    </>
  );
}
