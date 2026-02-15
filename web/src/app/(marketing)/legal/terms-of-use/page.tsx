// web/src/app/(marketing)/legal/terms-of-use/page.tsx
// COMMIT 6: fix: finalize legal pages for production
//
// Changes:
//  - Date set to December 11, 2023
//  - "LEGAL REVIEW REQUIRED" banners removed
//  - Legal review checklists removed
//  - "Starter template" language removed
//  - Production-ready

import Link from "next/link";

export default function TermsOfUse() {
  return (
    <main>
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Terms of Use
          </h1>
          <p className="text-sm text-gray-500">
            Last Modified: December 11, 2023
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-10 text-gray-700 leading-relaxed">
          {/* 1. Acceptance */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using DiCorner&rsquo;s services
              (&ldquo;Service&rdquo;), you agree to be bound by these Terms of
              Use (&ldquo;Terms&rdquo;). If you do not agree to these Terms, do
              not use the Service.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 2. Description */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Description of Service
            </h2>
            <p>
              DiCorner provides cognitive behavioral intelligence software,
              including cognitive scoring APIs (Decision Fatigue, Trust Health,
              Drop-Off Intent, Engagement Readiness, Conversion Likelihood), the
              Next Best Action recommendation engine, the Decision Intelligence
              platform, and cognitive audit services (managed offering).
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 3. User Accounts */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. User Accounts
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              3.1 Registration
            </h3>
            <p className="mb-4">
              You must provide accurate, current, and complete information during
              registration. You are responsible for maintaining the
              confidentiality of your credentials.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              3.2 Account Types
            </h3>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>
                <strong className="text-gray-900">Builder:</strong> Free tier
                with usage limits
              </li>
              <li>
                <strong className="text-gray-900">Growth:</strong> Paid tier
                with expanded features
              </li>
              <li>
                <strong className="text-gray-900">Enterprise:</strong> Custom
                deployment with dedicated support
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              3.3 Account Security
            </h3>
            <p>
              You are responsible for all activity under your account. Notify us
              immediately of any unauthorized use.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 4. Acceptable Use */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Acceptable Use
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              4.1 Permitted Uses
            </h3>
            <p className="mb-4">
              You may use DiCorner&rsquo;s Service to analyze behavioral data
              from your applications, generate cognitive scores and NBA
              recommendations, integrate our APIs into your products, and access
              documentation and support resources.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              4.2 Prohibited Uses
            </h3>
            <p className="mb-2">You may NOT:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the Service for illegal purposes</li>
              <li>
                Attempt to reverse-engineer, decompile, or hack the Service
              </li>
              <li>
                Use the Service to discriminate against protected classes
              </li>
              <li>Exceed API rate limits or abuse system resources</li>
              <li>
                Resell or redistribute the Service without authorization
              </li>
              <li>
                Use the Service to process data from minors without parental
                consent
              </li>
              <li>Bypass security measures or authentication systems</li>
            </ul>
          </div>

          <hr className="border-gray-200" />

          {/* 5. Data and Privacy */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Data and Privacy
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              5.1 Your Data
            </h3>
            <p className="mb-4">
              You retain all rights to data you submit to DiCorner
              (&ldquo;Customer Data&rdquo;). We do not claim ownership of
              Customer Data.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              5.2 Our Use of Data
            </h3>
            <p className="mb-4">
              We may use Customer Data to provide the Service, generate cognitive
              scores and recommendations, improve our algorithms (in aggregate,
              anonymized form), and comply with legal obligations.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              5.3 Data Security
            </h3>
            <p className="mb-4">
              We implement industry-standard security measures. See our{" "}
              <Link
                href="/legal/privacy-policy"
                className="text-blue-600 hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              for details.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              5.4 Data Deletion
            </h3>
            <p>
              You may request deletion of your Customer Data at any time. We will
              delete data within 30 days unless legally required to retain.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 6. IP */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Intellectual Property Rights
            </h2>
            <p className="mb-4">
              All intellectual property rights in the Service, including
              software, algorithms, documentation, and trademarks, belong to
              DiCorner.
            </p>
            <p className="mb-4">
              You retain all rights to your Customer Data and applications.
              DiCorner does not claim any ownership over your intellectual
              property.
            </p>
            <p>
              If you provide feedback or suggestions about the Service, DiCorner
              may use this feedback without obligation to you.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 7. Payment */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Payment Terms
            </h2>
            <p className="mb-4">
              <strong className="text-gray-900">Builder Tier:</strong> Free tier
              with usage limits as described on our Pricing page.
            </p>
            <p className="mb-4">
              <strong className="text-gray-900">Growth Tier:</strong> Billed
              monthly based on event volume. Overage charges apply if you exceed
              your plan limit.
            </p>
            <p className="mb-4">
              <strong className="text-gray-900">Enterprise Tier:</strong> Custom
              pricing with annual contracts. Payment terms negotiated separately.
            </p>
            <p className="mb-4">
              <strong className="text-gray-900">Refunds:</strong> We do not
              provide refunds for partial months. You may cancel anytime;
              cancellation takes effect at the end of your current billing cycle.
            </p>
            <p>
              <strong className="text-gray-900">Late Payments:</strong> Late
              payments may result in service suspension after 15 days. A 1.5%
              monthly late fee may apply.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 8. SLA */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Service Level Agreement (SLA)
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              8.1 Uptime Commitment
            </h3>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Growth Tier: 99.5% uptime</li>
              <li>
                Enterprise Tier: 99.9% uptime with financial penalties for
                breaches
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              8.2 Latency Targets
            </h3>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Scoring API: &lt;300ms (p95)</li>
              <li>NBA Engine: &lt;500ms (p95)</li>
              <li>Explainability Layer: Batch-generated (not latency-bound)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              8.3 Support
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Builder: Community support (best-effort)</li>
              <li>Growth: Email support (24-hour response)</li>
              <li>
                Enterprise: Dedicated support (4-hour response for critical
                issues)
              </li>
            </ul>
          </div>

          <hr className="border-gray-200" />

          {/* 9. Confidentiality */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Confidentiality
            </h2>
            <p className="mb-4">
              &ldquo;Confidential Information&rdquo; includes non-public
              information about the Service, algorithms, pricing, and Customer
              Data.
            </p>
            <p className="mb-4">
              Both parties agree to protect Confidential Information with
              reasonable care, not disclose it to third parties without consent,
              and use it only for purposes of the Service.
            </p>
            <p>
              Confidential Information does not include information that is
              publicly available, was known before disclosure, is independently
              developed, or must be disclosed by law.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 10. Liability */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Limitations of Liability
            </h2>
            <p className="mb-4 uppercase text-sm font-medium">
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTIES OF
              ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              AND NON-INFRINGEMENT.
            </p>
            <p className="mb-4 uppercase text-sm font-medium">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, DICORNER SHALL NOT BE
              LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, LOSS OF PROFITS, DATA, OR GOODWILL, OR BUSINESS
              INTERRUPTION.
            </p>
            <p className="uppercase text-sm font-medium">
              DICORNER&rsquo;S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU
              PAID TO DICORNER IN THE 12 MONTHS PRECEDING THE CLAIM. SOME
              JURISDICTIONS DO NOT ALLOW LIMITATION OF LIABILITY. THESE
              LIMITATIONS MAY NOT APPLY TO YOU.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 11. Indemnification */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold DiCorner harmless from any claims,
              damages, or expenses (including legal fees) arising from your use
              of the Service, your violation of these Terms, your violation of
              any third-party rights, or your Customer Data.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 12. Content Restrictions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Content Restrictions
            </h2>
            <p className="mb-4">
              You may not use the Service to process data that violates laws or
              regulations, infringes third-party intellectual property rights,
              contains malware or harmful code, involves minors without parental
              consent, or discriminates based on protected attributes.
            </p>
            <p>
              We reserve the right to remove or refuse to process content that
              violates these restrictions.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 13. Termination */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              13. Account Deactivation and Deletion
            </h2>
            <p className="mb-4">
              You may deactivate your account at any time through your account
              settings.
            </p>
            <p className="mb-4">
              We may suspend or terminate your account if you violate these
              Terms, engage in fraudulent activity, fail to pay amounts owed, or
              we are required to do so by law.
            </p>
            <p>
              Upon termination, your access to the Service will cease, we will
              delete your Customer Data within 30 days, and you remain liable for
              any amounts owed.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 14. Governing Law */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              14. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by applicable law, without regard to
              conflict of law provisions. Any disputes shall be resolved in the
              appropriate courts of competent jurisdiction.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 15. Dispute Resolution */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              15. Dispute Resolution
            </h2>
            <p className="mb-4">
              Before filing a claim, you agree to contact us at{" "}
              <a
                href="mailto:emily@dicornerusa.com"
                className="text-blue-600 hover:underline"
              >
                emily@dicornerusa.com
              </a>{" "}
              to attempt informal resolution.
            </p>
            <p className="mb-4">
              If informal resolution fails, disputes shall be resolved by
              binding arbitration, except where prohibited by applicable law.
            </p>
            <p>
              You agree to resolve disputes individually, not as part of a class
              action.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 16. Changes */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              16. Changes to Terms
            </h2>
            <p className="mb-4">
              We may modify these Terms at any time. Material changes will be
              notified via email notification, prominent website notice, and
              in-app notification.
            </p>
            <p>
              Continued use of the Service after changes constitutes acceptance
              of modified Terms.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 17. Miscellaneous */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              17. Miscellaneous
            </h2>
            <p className="mb-4">
              These Terms, together with our Privacy Policy, constitute the
              entire agreement between you and DiCorner. If any provision is
              found unenforceable, the remaining provisions shall remain in
              effect. Failure to enforce any provision does not waive our right
              to enforce it later. You may not assign these Terms without our
              written consent. We may assign these Terms in connection with a
              merger or acquisition.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 18. Contact */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              18. Contact Information
            </h2>
            <p className="mb-2">
              For questions about these Terms, contact:
            </p>
            <p className="mb-1">
              <strong className="text-gray-900">Email:</strong>{" "}
              <a
                href="mailto:emily@dicornerusa.com"
                className="text-blue-600 hover:underline"
              >
                emily@dicornerusa.com
              </a>
            </p>
            <p>
              <strong className="text-gray-900">Subject Line:</strong> Terms of
              Use Inquiry
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
