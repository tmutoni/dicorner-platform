"use client";

import { useState } from "react";
import { CheckCircle, Calendar, MessageSquare, Zap } from "lucide-react";

export default function ScheduleDemoPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Schedule a Demo
        </h1>
        <h2 className="text-xl text-gray-600 mb-8">
          See DiCorner in Action
        </h2>
        <p className="text-gray-600 mb-8">
          Our team will analyze your application and show you exactly how
          cognitive behavioral intelligence can reduce churn and increase trial
          conversions.
        </p>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: MessageSquare,
              title: "Free Consultation",
              desc: "Get expert advice on your trial user conversion strategy and requirements.",
            },
            {
              icon: Zap,
              title: "Tailored Demo",
              desc: "See how DiCorner solves your specific business challenges with custom metric definitions.",
            },
            {
              icon: Calendar,
              title: "Quick Response",
              desc: "Our team will respond within 24 hours to schedule your session.",
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
              Demo request received!
            </h3>
            <p className="text-gray-600">
              We&apos;ll email you within 24 hours to confirm timing.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Help Us Prepare
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Share a few details so we can customize your demo:
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
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
              </div>

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
                    placeholder="e.g., Head of Growth"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Size
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white">
                    <option value="">Select...</option>
                    <option>&lt;10</option>
                    <option>10-50</option>
                    <option>50-200</option>
                    <option>200-1000</option>
                    <option>1000+</option>
                  </select>
                </div>
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
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Use Case
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white">
                  <option value="">Select...</option>
                  <option>Churn prediction</option>
                  <option>Trial conversion</option>
                  <option>User engagement</option>
                  <option>Compliance/Audit</option>
                  <option>Other</option>
                </select>
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
                  Preferred Demo Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Any specific questions or requirements?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                Schedule My Demo
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
