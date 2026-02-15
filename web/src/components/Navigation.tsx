// web/src/components/Navigation.tsx
// COMMIT 4: fix: nav buttons, WhatsApp icon, button fill logic
//
// Changes from current:
//  - Removed "Schedule a Demo" from nav
//  - Added WhatsApp icon (icon only)
//  - Layout: [WhatsApp] [Sign In (unfilled)] [Get API Key (filled)]
//  - No arrow on Get API Key
// Matches codebase: lucide-react, hover:bg-blue-700 transition-colors pattern

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=%2B919686083053&text&type=phone_number&app_absent=0';

const navLinks = [
  {
    label: 'Solutions',
    children: [
      { label: 'Cognitive Behavioral Scoring', href: '/solutions/cognitive-scoring' },
      { label: 'NBA Engine', href: '/solutions/nba-engine' },
      { label: 'Decision Intelligence', href: '/solutions/decision-intelligence' },
      { label: 'Cognitive Audit Service', href: '/solutions/audit-service' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs/api-reference' },
      { label: 'Case Studies', href: '/case-studies' },
    ],
  },
  {
    label: 'Company',
    children: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
];

// WhatsApp SVG icon (brand icon not available in lucide)
function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/landing-v3" className="text-xl font-bold text-gray-900">
            DiCorner
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                  {/* Dropdown */}
                  <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTAs: WhatsApp | Sign In (unfilled) | Get API Key (filled) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-green-600 hover:bg-green-50 transition-colors"
              aria-label="Contact us on WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
            <Link
              href="/signin"
              className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/get-api-key"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Get API Key
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 pb-4">
          <div className="max-w-6xl mx-auto px-4 pt-4 space-y-1">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                    className="w-full flex justify-between items-center px-3 py-2.5 text-sm font-medium text-gray-700"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Mobile CTAs */}
            <div className="pt-4 border-t border-gray-200 space-y-3 px-3">
              <div className="flex items-center gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-green-600 hover:bg-green-50 transition-colors"
                  aria-label="Contact us on WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
                <Link
                  href="/signin"
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-semibold text-center hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
              </div>
              <Link
                href="/get-api-key"
                className="block bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold text-center hover:bg-blue-700 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get API Key
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
