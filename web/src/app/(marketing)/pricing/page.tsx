import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Builder",
    price: "Free",
    subtitle: "Perfect for early-stage products",
    features: [
      "Up to 10,000 events/month",
      "5 cognitive metrics (DFI, DOI, TH, ER, CLI)",
      "Basic NBA recommendations",
      "Community support",
      "7-day data retention",
      "API access with 100 requests/hour rate limit",
    ],
    idealFor:
      "Startups validating product-market fit, developers testing integration",
    limitations: [
      "Limited to 1 user account",
      "No custom metric definitions",
      "Standard explainability templates only",
    ],
    cta: { label: "Get Started Free", href: "/get-api-key" },
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$499",
    priceSuffix: "/month",
    subtitle: "Volume-Based Pricing — For scaling teams",
    features: [
      "Everything in Builder, plus:",
      "Unlimited events",
      "Advanced SLAs (99.5% uptime guarantee)",
      "Real-time webhooks for instant alerts",
      "Golden session replay analysis",
      "90-day data retention",
      "Priority email support (24-hour response)",
      "Up to 5 user accounts",
      "Custom cognitive metric thresholds",
      'A/B testing framework for "Try Experiment" recommendations',
    ],
    idealFor:
      "Growth-stage companies with >1K users/week, teams measuring ROI on interventions",
    volumeTiers: [
      "Up to 100K events/month: $499",
      "Up to 500K events/month: $1,299",
      "Up to 2M events/month: $3,499",
      "Custom pricing for higher volumes",
    ],
    cta: { label: "Start 14-Day Trial", href: "/schedule-demo" },
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    subtitle: "For compliance-first organizations",
    features: [
      "Everything in Growth, plus:",
      "Dedicated tenant (single-tenant deployment)",
      "Custom data retention policies (up to 2 years)",
      "Private deployment options (on-prem or VPC)",
      "Advanced security: SSO (SAML 2.0), audit logs, RBAC",
      "Dedicated customer success manager",
      "SLA: 99.9% uptime with financial penalties",
      "Unlimited user accounts",
      "Custom integrations (Slack, Salesforce, HubSpot)",
      "Quarterly business reviews",
      "White-glove onboarding (technical training included)",
      "Cognitive Audit Service (managed analysis)",
    ],
    idealFor:
      "Enterprise teams in regulated industries (Fintech, Healthtech), companies with strict compliance requirements",
    cta: { label: "Contact Sales", href: "/contact" },
    highlighted: false,
  },
];

const addOns = [
  {
    name: "Cognitive Audit Service",
    price: "$2,500/month",
    description:
      "Monthly managed analysis reports with expert cognitive science validation. Includes human-in-the-loop behavioral audits, custom intervention recommendations, quarterly strategy sessions, and dedicated analyst review.",
  },
  {
    name: "Advanced Analytics Package",
    price: "$500/month",
    description:
      "Custom dashboards, advanced cohort analysis, retention forecasting models, and churn prediction scoring.",
  },
];

const faqs = [
  {
    q: "Can I switch plans?",
    a: "Yes, upgrade or downgrade anytime. Changes take effect on your next billing cycle.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Credit card, ACH transfer (Enterprise only), annual invoicing (Enterprise only).",
  },
  {
    q: "Is there a contract commitment?",
    a: "Builder is free forever. Growth is month-to-month. Enterprise typically requires annual commitment.",
  },
  {
    q: "What happens if I exceed my event limit?",
    a: "We'll notify you at 80% usage. Overages are billed at $0.005/event. You can upgrade anytime to avoid overage fees.",
  },
  {
    q: "Do you offer discounts?",
    a: "Annual prepayment: 20% discount on Growth/Enterprise. Nonprofits: Contact sales for special pricing.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your growth stage. All plans include our
            deterministic scoring engine and explainable NBA recommendations.
          </p>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white rounded-xl shadow-lg p-8 flex flex-col ${
                tier.highlighted
                  ? "border-2 border-blue-600 md:scale-105 relative"
                  : "border border-gray-200"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{tier.name}</h2>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {tier.price}
                  </span>
                  {tier.priceSuffix && (
                    <span className="text-gray-500">{tier.priceSuffix}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">{tier.subtitle}</p>
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mb-4">
                <strong>Ideal for:</strong> {tier.idealFor}
              </p>

              {"volumeTiers" in tier && tier.volumeTiers && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Volume Tiers:
                  </p>
                  {tier.volumeTiers.map((vt, i) => (
                    <p key={i} className="text-xs text-gray-600">
                      {vt}
                    </p>
                  ))}
                </div>
              )}

              {"limitations" in tier && tier.limitations && (
                <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Limitations:
                  </p>
                  {tier.limitations.map((l, i) => (
                    <p key={i} className="text-xs text-gray-600">
                      &bull; {l}
                    </p>
                  ))}
                </div>
              )}

              <Link
                href={tier.cta.href}
                className={`text-center py-3 rounded-lg font-semibold transition-colors ${
                  tier.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                }`}
              >
                {tier.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Add-Ons */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Add-Ons (All Plans)
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {addOns.map((addon) => (
            <div
              key={addon.name}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-900">{addon.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {addon.price}
              </p>
              <p className="text-sm text-gray-600 mt-3">{addon.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-gray-50 rounded-lg border border-gray-200"
              >
                <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-gray-900">
                  {faq.q}
                  <ChevronIcon />
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Need Help */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-blue-100 mb-6">
            Our team will help you find the right plan for your use case.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
          >
            Contact Sales
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
