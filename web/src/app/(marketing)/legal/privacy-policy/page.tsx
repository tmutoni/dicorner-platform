// web/src/app/(marketing)/legal/privacy-policy/page.tsx
// COMMIT 6: fix: finalize legal pages for production
//
// Changes:
//  - Date set to December 11, 2023
//  - Retention period: 7 years
//  - Cookie policy section added
//  - "LEGAL REVIEW REQUIRED" banners removed
//  - Legal review checklists removed
//  - "Starter template" language removed
//  - Production-ready

import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main>
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500">
            Last Modified: December 11, 2023
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-10 text-gray-700 leading-relaxed">
          <p>
            Your privacy and data security is important to how we operate.
            Learn more about our commitments to protecting your data.
          </p>

          <hr className="border-gray-200" />

          {/* 1. Introduction */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="mb-4">
              DiCornerUSA.com (&ldquo;DiCorner&rdquo;), hereinafter referred to
              as &lsquo;we&rsquo;, &lsquo;us&rsquo; or &lsquo;our&rsquo;, is
              governed by the rules notified under applicable data protection
              laws.
            </p>
            <p className="mb-4">
              This Privacy Policy highlights our privacy practices regarding
              collection, use, and disclosure of &lsquo;Personal
              Information&rsquo; when you use our services.
            </p>
            <p className="mb-4">
              Please check our website regularly for updates to this policy.
            </p>
            <p>
              <strong className="text-gray-900">
                &lsquo;Personal information&rsquo;
              </strong>{" "}
              means information or an opinion about an identified individual, or
              an individual who is reasonably identifiable.
            </p>
            <p className="mt-4">
              DiCorner&rsquo;s Privacy Policy applies to personal information
              collected and/or held by DiCorner.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 2. Types of Personal Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. The Types of Personal Information We Collect and Hold
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              2.1.1 Information Obtained for Interaction Purposes
            </h3>
            <p className="mb-2">
              We collect information you provide when interacting with our
              platform, including account creation, API usage, and support
              requests.
            </p>
            <p className="mb-2">
              <strong className="text-gray-900">Why it matters:</strong> This
              allows us to deliver our cognitive behavioral intelligence services
              and provide customer support.
            </p>
            <p>
              <strong className="text-gray-900">Policy:</strong> We only collect
              information necessary to fulfill our service obligations and legal
              requirements.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              2.1.2 Non-Personal Information Linked with Existing Personal
              Information
            </h3>
            <p className="mb-2">
              We may combine non-personal usage data (e.g., event logs, API
              calls) with your account information to improve service quality.
            </p>
            <p>
              <strong className="text-gray-900">Policy:</strong> Combined data
              is treated with the same privacy protections as personal
              information.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              2.1.3 Personal Information Not Intended for Collection
            </h3>
            <p className="mb-2">
              We do not intentionally collect sensitive personal information such
              as race, gender, health data, or financial information beyond
              billing details.
            </p>
            <p>
              <strong className="text-gray-900">Policy:</strong> If we
              inadvertently collect such data, it is immediately deleted.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              2.1.4 Information Provided Over Platforms Outside Our Control
            </h3>
            <p>
              If you contact us via third-party platforms (e.g., email, social
              media), those platforms&rsquo; privacy policies also apply. We
              minimize use of third-party platforms and encourage direct contact
              via our secure channels.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 3. How We Collect */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. How We Collect Personal Information
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              3.1.1 Information That You Specifically Give Us
            </h3>
            <p className="mb-2">
              Data you provide directly through forms, API registration, or
              account setup. Examples include account details (username,
              password), contact details (email, phone), location details (name,
              proof of identity), financial information (processed via secure
              third-party processors), and user-generated content (support
              tickets, feedback).
            </p>
            <p>
              <strong className="text-gray-900">Policy:</strong> All directly
              provided data is encrypted in transit (TLS 1.2+) and at rest
              (AES-256).
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              3.1.2 Information We Collect from Others
            </h3>
            <p className="mb-2">
              Data we receive from third-party services you have authorized
              (e.g., OAuth logins, API integrations). This includes basic
              details from OAuth providers and contact details from CRM
              integrations.
            </p>
            <p>
              <strong className="text-gray-900">Policy:</strong> We only request
              minimum necessary permissions and never access data beyond
              authorized scopes.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              3.1.3 Information We Collect as You Use Our Platform
            </h3>
            <p className="mb-2">
              Automatic data collection from your use of DiCorner services,
              including metadata (timestamps, API endpoint usage, error logs),
              device information (browser type, OS), location (IP-based
              country/region), and actions (events sent to our API, cognitive
              scores requested).
            </p>
            <p>
              <strong className="text-gray-900">Policy:</strong> This data is
              used solely for service delivery, security, and platform
              improvement. Not sold to third parties.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              3.1.4 Links to Other Sites
            </h3>
            <p>
              Our website may contain links to third-party sites. We are not
              responsible for the privacy practices of those sites. We encourage
              you to read their privacy policies before providing any personal
              information.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 4. How We Use */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. How We Use Personal Information
            </h2>
            <p className="mb-4">
              The information we collect is primarily used to provide you with
              the product or service you have requested. Specific uses include:
              providing the service, facilitating user contracts, providing
              technical support, communicating updates, answering inquiries,
              providing information about our products and services, debugging
              and improving our platforms, conducting data analysis and research,
              and complying with legal and regulatory obligations.
            </p>
            <p>
              <strong className="text-gray-900">
                Lawful Processing Grounds:
              </strong>{" "}
              Consent, contractual necessity, legal obligations, vital interests,
              and legitimate interests that do not infringe on your rights.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 5. Automated Decision Making */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Automated Decision Making
            </h2>
            <p className="mb-4">
              We use automated decision-making when helping you match with
              behavioral insights. The primary way this occurs is through our
              cognitive scoring engine, which produces deterministic,
              reproducible scores.
            </p>
            <p>
              <strong className="text-gray-900">Transparency:</strong> You can
              request an explanation of any automated decision by contacting our
              Data Protection Officer.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 6. Sharing */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Sharing of Personal Information
            </h2>
            <p className="mb-4">
              We do not sell your personal information to third parties.
            </p>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong className="text-gray-900">Service providers:</strong>{" "}
                Cloud hosting, payment processors, analytics (under strict data
                processing agreements)
              </li>
              <li>
                <strong className="text-gray-900">Legal requirements:</strong>{" "}
                When required by law or to protect our rights
              </li>
              <li>
                <strong className="text-gray-900">Business transfers:</strong>{" "}
                In the event of a merger, acquisition, or asset sale (you will be
                notified)
              </li>
            </ul>
            <p>
              <strong className="text-gray-900">Policy:</strong> All third-party
              processors are contractually required to meet GDPR and CCPA
              standards.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 7. Data Retention */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Data Retention
            </h2>
            <p className="mb-4">
              We retain your personal information only as long as necessary for
              the purposes outlined in this policy or as required by law.
            </p>
            <p className="mb-2">
              <strong className="text-gray-900">Retention Periods:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Account data: Until account deletion (or 90 days after
                inactivity)
              </li>
              <li>
                Behavioral event data: 90 days default (customizable for
                Enterprise clients up to 2 years)
              </li>
              <li>Billing records: 7 years (legal requirement)</li>
              <li>Audit logs: 7 years (compliance requirement)</li>
            </ul>
          </div>

          <hr className="border-gray-200" />

          {/* 8. Your Rights */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Your Rights
            </h2>
            <p className="mb-4">
              Depending on your location, you may have the following rights:
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              GDPR Rights (EU)
            </h3>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure (&ldquo;right to be forgotten&rdquo;)</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              CCPA Rights (California)
            </h3>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Right to know what personal information is collected</li>
              <li>
                Right to know if personal information is sold or disclosed
              </li>
              <li>
                Right to opt-out of the sale of personal information (we do not
                sell data)
              </li>
              <li>Right to deletion</li>
              <li>
                Right to non-discrimination for exercising CCPA rights
              </li>
            </ul>

            <p>
              <strong className="text-gray-900">
                To exercise your rights, contact:
              </strong>{" "}
              <a
                href="mailto:emily@dicornerusa.com"
                className="text-blue-600 hover:underline"
              >
                emily@dicornerusa.com
              </a>
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 9. Security */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Security
            </h2>
            <p className="mb-4">
              We implement industry-standard security measures:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong className="text-gray-900">Encryption:</strong> TLS 1.2+
                for data in transit, AES-256 for data at rest
              </li>
              <li>
                <strong className="text-gray-900">Access Control:</strong>{" "}
                Role-based access, multi-factor authentication
              </li>
              <li>
                <strong className="text-gray-900">Monitoring:</strong> 24/7
                security monitoring, intrusion detection
              </li>
              <li>
                <strong className="text-gray-900">Audits:</strong> Regular
                security audits, penetration testing
              </li>
            </ul>
            <p>
              <strong className="text-gray-900">Incident Response:</strong> We
              will notify you of any data breach within 72 hours of discovery.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 10. Cookies */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Cookie Policy
            </h2>
            <p className="mb-4">
              Our website and platform use cookies and similar tracking
              technologies to enhance your experience, analyze usage, and
              deliver our services effectively.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              Types of Cookies We Use
            </h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong className="text-gray-900">Essential Cookies:</strong>{" "}
                Required for the platform to function properly. These include
                authentication tokens, session identifiers, and security cookies.
                These cannot be disabled.
              </li>
              <li>
                <strong className="text-gray-900">Analytics Cookies:</strong>{" "}
                Help us understand how you use our platform so we can improve the
                experience. These collect aggregated, anonymized data about page
                visits, feature usage, and performance metrics.
              </li>
              <li>
                <strong className="text-gray-900">Preference Cookies:</strong>{" "}
                Remember your settings and preferences (e.g., dashboard layout,
                notification preferences) to provide a personalized experience.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
              Managing Cookies
            </h3>
            <p className="mb-4">
              You can control and manage cookies through your browser settings.
              Most browsers allow you to block or delete cookies. Please note
              that disabling essential cookies may affect the functionality of
              our platform.
            </p>
            <p>
              For more information about cookies and how to manage them, visit{" "}
              <a
                href="https://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                allaboutcookies.org
              </a>
              .
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 11. International Data Transfers */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. International Data Transfers
            </h2>
            <p className="mb-4">
              DiCorner operates globally and your data may be transferred to and
              processed in countries other than your own. We ensure adequate
              protection through Standard Contractual Clauses (EU), Privacy
              Shield Framework (if applicable), and explicit consent for
              transfers.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 12. Children's Privacy */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Children&rsquo;s Privacy
            </h2>
            <p>
              DiCorner does not knowingly collect personal information from
              children under 13 (or 16 in the EU). If we discover we have
              collected such information, it will be immediately deleted.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 13. Contact */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              13. Contact Our Privacy Officer
            </h2>
            <p className="mb-2">
              <strong className="text-gray-900">Email:</strong>{" "}
              <a
                href="mailto:emily@dicornerusa.com"
                className="text-blue-600 hover:underline"
              >
                emily@dicornerusa.com
              </a>
            </p>
            <p className="mb-4">
              <strong className="text-gray-900">Subject Line:</strong> Privacy
              Inquiry
            </p>
            <p>
              For purposes of the Privacy Act and GDPR, our Privacy Officer is
              also our Data Protection Officer.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* 14. Changes */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              14. Changes to This Policy
            </h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify
              you of material changes by email notification, prominent notice on
              our website, and in-app notification.
            </p>
            <p>
              <strong className="text-gray-900">Last updated:</strong> December
              11, 2023
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
