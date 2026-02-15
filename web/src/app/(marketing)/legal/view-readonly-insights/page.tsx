// app/view-readonly-insights/page.tsx
import Link from "next/link";

export default function ViewReadonlyInsights() {
  return (
    <main>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            View Read-Only Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Access a read-only view of cognitive behavioral insights for your
            organization. Sign in to view your dashboard.
          </p>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Access Your Insights
            </h2>

            {/* Placeholder — in production this would be a real auth flow */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Access Code
                </label>
                <input
                  type="text"
                  placeholder="Enter your access code"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
                View Insights
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Access codes are provided by your DiCorner account administrator.
              Read-only access does not allow configuration changes.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 text-sm">
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign in to full dashboard →
            </Link>
            <Link href="/contact" className="text-blue-600 hover:underline">
              Don&rsquo;t have access? Contact us →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}