"use client";

import { useState } from "react";
import { CheckCircle, Key, Shield, Zap } from "lucide-react";

export default function GetApiKeyPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Get Your API Key
        </h1>
        <h2 className="text-xl text-gray-600 mb-4">
          Start Building with DiCorner
        </h2>
        <p className="text-gray-600 mb-8">
          Complete the form below and our team will provision your API key
          within one business day. All keys start with full access to the
          sandbox environment.
        </p>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Key,
              title: "Instant Sandbox Access",
              desc: "Start testing immediately with full API access in a safe sandbox environment.",
            },
            {
              icon: Zap,
              title: "Production-Ready SDKs",
              desc: "Python, Node.js, and REST SDKs with comprehensive documentation and examples.",
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              desc: "SOC 2 compliant key management with role-based access controls.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <item.icon className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Application received!
            </h3>
            <p className="text-gray-600">
              We&apos;ll provision your API key and send credentials to your
              email within one business day.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              API Key Application
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Tell us about your project so we can configure the right access
              level:
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name + Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Your full name"
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
              </div>

              {/* Row 2: Company + Job Title */}
              <div className="grid md:grid-cols-2 gap-4">
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
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="e.g., Software Engineer"
                  />
                </div>
              </div>

              {/* Row 3: Industry + Product Type */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white">
                    <option value="">Select...</option>
                    <option>Fintech</option>
                    <option>SaaS</option>
                    <option>E-commerce</option>
                    <option>Healthcare</option>
                    <option>Insurance</option>
                    <option>Banking</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white">
                    <option value="">Select...</option>
                    <option>Web Application</option>
                    <option>Mobile App</option>
                    <option>API / Platform</option>
                    <option>Desktop Software</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Monthly Active Users + Primary Goal */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Active Users
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white">
                    <option value="">Select...</option>
                    <option>&lt;1,000</option>
                    <option>1,000 – 10,000</option>
                    <option>10,000 – 100,000</option>
                    <option>100,000 – 1M</option>
                    <option>1M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Goal
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white">
                    <option value="">Select...</option>
                    <option>Reduce churn</option>
                    <option>Increase trial conversion</option>
                    <option>Improve engagement</option>
                    <option>Compliance / Audit</option>
                    <option>Research / Evaluation</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Dev Framework + Expected Event Volume */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Development Framework
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white">
                    <option value="">Select...</option>
                    <option>Python</option>
                    <option>Node.js / TypeScript</option>
                    <option>Java / Kotlin</option>
                    <option>Go</option>
                    <option>REST API (language-agnostic)</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Event Volume (per month)
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white">
                    <option value="">Select...</option>
                    <option>&lt;10,000</option>
                    <option>10,000 – 100,000</option>
                    <option>100,000 – 1M</option>
                    <option>1M – 10M</option>
                    <option>10M+</option>
                  </select>
                </div>
              </div>

              {/* Phone */}
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

              {/* Use Case Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Describe Your Use Case
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Tell us how you plan to use DiCorner's API..."
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  required
                  id="terms"
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a
                    href="/legal/terms-of-use"
                    className="text-blue-600 hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/legal/privacy-policy"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </a>
                  . <span className="text-red-500">*</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                Request API Key
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
