import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export default function MaximusFooter() {
  return (
    <footer className="border-t mx-line mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/maximus/logo.png"
            alt="Maximus Energy Consultations"
            className="h-10 w-auto mb-3"
          />
          <p className="text-sm mx-ink-soft">
            Behavioral Energy Intelligence for homes since 2006.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm mx-ink-soft">
            <li>
              <Link href="/maximus/process">How we work</Link>
            </li>
            <li>
              <Link href="/maximus/services">Services</Link>
            </li>
            <li>
              <Link href="/maximus/case-stories">Case stories</Link>
            </li>
            <li>
              <Link href="/maximus/about">About</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Get started</h4>
          <ul className="space-y-2 text-sm mx-ink-soft">
            <li>
              <Link href="/maximus/start">Start your assessment</Link>
            </li>
            <li>
              <a href="mailto:hello@maximusenergy.example">
                <Mail className="inline w-4 h-4 mr-1" /> hello@maximusenergy.example
              </a>
            </li>
            <li>
              <a href="tel:+10000000000">
                <Phone className="inline w-4 h-4 mr-1" /> (555) 555-0142
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Service area</h4>
          <p className="text-sm mx-ink-soft">
            Residential consultations across the greater metro area. Ask us
            about your ZIP code.
          </p>
        </div>
      </div>

      <div className="border-t mx-line">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs mx-ink-soft">
          <span>© {new Date().getFullYear()} Maximus Energy Consultations</span>
          <span>Since 2006 · 10,000+ homes visited · 90% word-of-mouth</span>
        </div>
      </div>
    </footer>
  );
}
