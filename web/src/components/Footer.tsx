import Link from "next/link";
import DiCornerLogo from "./DiCornerLogo";

const footerSections = [
  {
    title: "Solutions",
    links: [
      { name: "Cognitive Scoring", href: "/solutions/cognitive-scoring" },
      { name: "NBA Engine", href: "/solutions/nba-engine" },
      { name: "Decision Intelligence", href: "/solutions/decision-intelligence" },
      { name: "Audit Service", href: "/solutions/audit-service" },
      { name: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/docs/api-reference" },
      { name: "SDKs", href: "/docs/sdks" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Compliance & Security", href: "/docs/compliance-security" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Schedule Demo", href: "/schedule-demo" },
      { name: "Get API Key", href: "/get-api-key" },
      { name: "Sign In", href: "/signin" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-xl font-bold text-white">
                Di<span className="text-blue-400">Corner</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Cognitive behavioral intelligence for growth teams. Deterministic
              scoring, explainable decisions, audit-ready intelligence.
            </p>
            <a
              href="mailto:emily@dicornerusa.com"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              emily@dicornerusa.com
            </a>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DiCorner. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/legal/privacy-policy"
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms-of-use"
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
