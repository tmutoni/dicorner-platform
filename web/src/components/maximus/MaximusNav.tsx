"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "How We Work", href: "/maximus/process" },
  { label: "Services", href: "/maximus/services" },
  { label: "Case Stories", href: "/maximus/case-stories" },
  { label: "About", href: "/maximus/about" },
];

export default function MaximusNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur mx-surface"
      style={{ background: "rgba(255,255,255,0.85)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/maximus" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/maximus/logo.png"
            alt="Maximus Energy Consultations"
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm mx-ink-soft hover:text-black"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/maximus/start"
            className="mx-btn-primary text-sm font-medium px-4 py-2 rounded-md"
          >
            Start your assessment
          </Link>
        </nav>

        <button
          className="md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t mx-line">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/maximus/start"
              onClick={() => setOpen(false)}
              className="mx-btn-primary text-center font-medium px-4 py-2 rounded-md"
            >
              Start your assessment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
