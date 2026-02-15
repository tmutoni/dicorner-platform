"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <h2 className="text-xl text-gray-600 mb-2">
          Any Questions? We&apos;re Here to Help.
        </h2>
        <p className="text-gray-600 mb-8">
          Ask for a demo or contact us directly. We&apos;ll get back to you
          within 24 hours.
        </p>

        <p className="text-sm text-gray-700 mb-6">
          <strong>Send Us an Email:</strong>{" "}
          <a
            href="mailto:emily@dicornerusa.com"
            className="text-blue-600 hover:underline"
          >
            emily@dicornerusa.com
          </a>
        </p>

        {submitted ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Thanks! We&apos;ll be in touch within 24 hours.
            </h3>
            <p className="text-gray-600">
              In the meantime, check our{" "}
              <Link href="/docs" className="text-blue-600 hover:underline">
                Documentation
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-sm text-gray-600 mb-6">
              Or fill out the form below:
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-gray-600">
            <strong>Prefer to Schedule a Demo?</strong>{" "}
            <Link
              href="/schedule-demo"
              className="text-blue-600 hover:underline"
            >
              Choose a time that works for your team.
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <strong>Need Immediate Help?</strong> Check our{" "}
            <Link href="/docs" className="text-blue-600 hover:underline">
              Documentation
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
