// web/src/app/(marketing)/landing-v3/page.tsx
// COMMIT 3: refactor: restructure landing-v3 sections
//
// SECTION ORDER:
//  1. Hero
//  2. Trusted by Companies Worldwide
//  3. Real Users, Real Insights (4 metric cards)
//  4. Featured Case Studies (3 cards)
//  5. Solutions (4 cards)
//  6. Interactive Cognitive Scoring Demo (FULL v2 demo preserved)
//  7. Trusted by Industry Leaders (testimonial + 3 value prop cards)
//  8. Our Story So Far (4 stats)
//  9. Featured Blog (3 cards)
// 10. Ready for Audit-Ready Behavioral Intelligence? (cleaned CTA)
// 11. FAQs (2-column, click to expand)
//
// REMOVED (migrated to /case-studies/the-dicorner-difference):
//  - Built for Compliance-First Teams
//  - Circuit Breakers Built In
//  - Known Limitations (Phase 1)
// REMOVED (migrated to GlobalSections global):
//  - Why DiCorner

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  CheckCircle,
  Zap,
  Shield,
  Lock,
  Copy,
  Play,
  Activity,
  Clock,
  TrendingUp,
  Code,
  BookOpen,
  Star,
  Users,
  BarChart3,
  Globe,
  Cpu,
  FileText,
  ChevronDown
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   INTERACTIVE DEMO TYPES & DATA (preserved from v2)
   ═══════════════════════════════════════════════ */

type ScenarioKey = 'comparisonParalysis' | 'kycFriction' | 'rateSensitive';

interface MetricCardProps {
  label: string;
  value: number | string;
  bucket: string;
  color: "red" | 'orange' | 'yellow' | 'green';
}

const MetricCard = ({ label, value, bucket, color }: MetricCardProps) => {
  const colorClasses = {
    red: 'bg-red-100 border-red-300 text-red-800',
    orange: 'bg-orange-100 border-orange-300 text-orange-800',
    yellow: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    green: 'bg-green-100 border-green-300 text-green-800'
  };

  return (
    <div className={`border-2 rounded-lg p-4 ${colorClasses[color]}`}>
      <div className="text-xs font-medium opacity-75 mb-1">{label}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm font-semibold">{bucket}</div>
    </div>
  );
};

const scenarios = {
  comparisonParalysis: {
    name: 'Comparison Paralysis',
    description: 'User stuck comparing pricing tiers',
    events: ['pricing_view (4x)', 'feature_compare (3x)', 'no_action (10 min)'],
    scores: {
      dfi: { value: 85, label: 'Critical', color: 'red' as const },
      doi: { value: 58, label: 'High', color: 'orange' as const },
      th: { value: 58, label: 'At Risk', color: 'orange' as const },
      er: { value: 35, label: 'Warming', color: 'yellow' as const },
      cli: { value: 72, label: 'High', color: 'green' as const }
    },
    nba: {
      action: 'Simplify pricing comparison\u2014reduce from 4 tiers to 2',
      category: 'Do Now',
      impact_direction: 'Reduce friction',
      confidence: 0.87,
      effort: 'Low',
      why: 'User viewed pricing 4x in 10 min without progressing. Signal: comparison paralysis, not disinterest. Psychology: Choice overload + cognitive depletion.'
    },
    explanation: 'Decision Fatigue is Critical (85) due to repeated pricing views and feature comparisons without forward motion. Trust remains Moderate, suggesting intent is present. A simplified comparison view may reduce cognitive overload.'
  },
  kycFriction: {
    name: 'KYC Friction',
    description: 'Document upload failures creating trust erosion',
    events: ['kyc_start', 'document_upload_fail (2x)', 'support_ticket'],
    scores: {
      dfi: { value: 62, label: 'High', color: 'orange' as const },
      doi: { value: 72, label: 'Critical', color: 'red' as const },
      th: { value: 45, label: 'At Risk', color: 'orange' as const },
      er: { value: 28, label: 'Not Ready', color: 'red' as const },
      cli: { value: 65, label: 'High', color: 'green' as const }
    },
    nba: {
      action: 'Add inline document format guide with accepted file types',
      category: 'Do Now',
      impact_direction: 'Reduce friction',
      confidence: 0.89,
      effort: 'Low',
      why: 'Repeated upload failures signal technical friction, not user disengagement. Support ticket indicates intent to complete. Clear guidance will restore trust and reduce abandonment.'
    },
    explanation: 'Drop-Off Intent is Critical (72) with Trust At Risk (45) due to technical friction at identity verification. Decision Fatigue is elevated from repeated failures. User has demonstrated commitment via support contact\u2014intervention timing is optimal.'
  },
  rateSensitive: {
    name: 'Rate-Sensitive Exploration',
    description: 'High engagement, evaluating competitive options',
    events: ['apr_view (5x)', 'calculator_use (2x)', 'external_link_click'],
    scores: {
      dfi: { value: 48, label: 'Moderate', color: 'yellow' as const },
      doi: { value: 42, label: 'Moderate', color: 'yellow' as const },
      th: { value: 78, label: 'Mild Risk', color: 'yellow' as const },
      er: { value: 82, label: 'Primed', color: 'green' as const },
      cli: { value: 68, label: 'High', color: 'green' as const }
    },
    nba: {
      action: 'A/B test rate lock messaging vs. comparison guarantee',
      category: 'Try Experiment',
      impact_direction: 'Increase trust',
      confidence: 0.64,
      effort: 'Medium',
      why: 'User is actively evaluating rates with strong engagement signals. External link suggests comparison shopping. Trust is intact. Test messaging that reinforces competitive positioning without applying pressure.'
    },
    explanation: 'Engagement Readiness is Primed (82) with Healthy Trust (78). Moderate Decision Fatigue from rate exploration is normal for this segment. User demonstrates research behavior, not abandonment intent. Experimental intervention recommended over immediate pressure.'
  }
} as const;

/* ═══════════════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════════════ */
   function HeroSection() {
    return (
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              Stop Guessing Why Users Drop Off.<br />
              <span className="text-blue-600">Understand Their Cognitive State. Deterministically Score It.</span>
            </h1>
            
            {/* Restored flex container for the buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                href="/get-api-key"
                className="bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get API Key
              </Link>
              <Link
                href="/schedule-demo"
                className="border border-gray-300 text-gray-700 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
              >
                Schedule a Demo
              </Link>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              Deterministic Scoring &bull; Explainable Decisions &bull; Audit-Ready Intelligence
            </p>
          </div>
        </div>
      </div>
    );
  }

/* ═══════════════════════════════════════════════
   2. TRUSTED BY COMPANIES WORLDWIDE
   ═══════════════════════════════════════════════ */
function TrustedBySection() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-center">
      <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
        Trusted by growth teams at 50+ companies across Fintech, SaaS, and E-commerce
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 opacity-40">
        {['Fintech Co', 'SaaS Platform', 'E-commerce Inc', 'Health Tech', 'DataFlow'].map((name) => (
          <span key={name} className="text-gray-400 text-sm font-semibold tracking-wide">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   3. REAL USERS, REAL INSIGHTS
   ═══════════════════════════════════════════════ */
   function RealUsersSection() {
    const metrics = [
      {
        icon: Clock,
        stat: '90 to 12 days',
        title: 'Time to Actionable Insight',
        description: 'Accelerated data pipeline from raw events to strategic decisions across pilot clients.',
      },
      {
        icon: TrendingUp,
        stat: '13% increase',
        title: 'Trial-to-Paid Conversion',
        description: 'Direct improvement in free-to-paid transition, reducing customer acquisition cost.',
      },
      {
        icon: Shield,
        stat: '90%',
        title: 'Predictive Alignment',
        description: 'Model output validated against golden datasets by cognitive science experts.',
      },
      {
        icon: Code,
        stat: '3 wks to 5 days',
        title: 'Developer Integration',
        description: 'From first API call to production-ready integration, reducing onboarding friction.',
      },
    ];
  
    return (
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-12">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug mb-3">
            Move beyond what happened
            <br/>
            to <span className="text-blue-600">why it happened</span> and{' '}
            <span className="text-blue-600">what to do about it.</span>
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Avoid customer churn by modeling decision fatigue, trust breakdowns,
            and drop-off intent.
          </p>
        </div>
  
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {metrics.map((m) => (
            <div
              key={m.title}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-xl mb-4">
                <m.icon className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                {m.stat}
              </div>
              <div className="text-sm font-semibold text-blue-600 mb-2">
                {m.title}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>
  
        <div className="text-center">
          <Link
            href="/schedule-demo"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Schedule a Demo
          </Link>
        </div>
      </div>
    );
  }

/* ═══════════════════════════════════════════════
   4. FEATURED CASE STUDIES
   ═══════════════════════════════════════════════ */
function FeaturedCaseStudies() {
  const cases = [
    {
      title: 'Maximus Energy',
      description: 'How a fintech energy provider used cognitive scoring to reduce churn by 20% and accelerate developer onboarding by 45%.',
      href: '/case-studies/maximus-energy',
      tag: 'Fintech',
    },
    {
      title: 'Time-to-Insight',
      description: 'How golden session replay eliminated the 90-day cohort wait and boosted trial-to-paid conversion by 13%.',
      href: '/case-studies/time-to-insight',
      tag: 'SaaS',
    },
    {
      title: 'Performance Benchmarking',
      description: 'Benchmark cognitive metrics against industry standards. See how your decision fatigue and trust scores compare.',
      href: '/solutions/audit-service',
      tag: 'Analytics',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-100 to-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Featured Case Studies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how compliance-first teams prove ROI during trial periods, not after.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all block"
            >
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                {c.tag}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-blue-600 transition-colors">
                {c.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {c.description}
              </p>
              <span className="text-blue-600 text-sm font-semibold">
                Learn more
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   5. SOLUTIONS
   ═══════════════════════════════════════════════ */
function SolutionsSection() {
  const solutions = [
    {
      title: 'Cognitive Behavioral Scoring',
      description: 'Quantify what users feel and think. Model psychological states behind behavior with 5 cognitive metrics.',
      href: '/solutions/cognitive-scoring',
      icon: BarChart3,
    },
    {
      title: 'NBA Engine',
      description: 'Convert cognitive scores into high-confidence interventions your team can act on immediately.',
      href: '/solutions/nba-engine',
      icon: Zap,
    },
    {
      title: 'Decision Intelligence',
      description: 'Move from correlation to causation. Bridge the gap between data, decisions, and outcomes.',
      href: '/solutions/decision-intelligence',
      icon: Cpu,
    },
    {
      title: 'Cognitive Audit Service',
      description: 'Managed behavioral analysis for compliance-first teams. Expert-validated insights without building in-house.',
      href: '/solutions/audit-service',
      icon: FileText,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Solutions</h2>
        <p className="text-gray-600">
          From real users to real results across all major consumer platforms
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {solutions.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all block"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-600 transition-colors">
              <s.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {s.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {s.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   6. INTERACTIVE COGNITIVE SCORING DEMO (preserved from v2)
   ═══════════════════════════════════════════════ */
function InteractiveDemoSection() {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey | null>(null);
  const [isScoring, setIsScoring] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const runScore = (scenarioKey: ScenarioKey) => {
    setIsScoring(true);
    setTimeout(() => {
      setActiveScenario(scenarioKey);
      setIsScoring(false);
    }, 1200);
  };

  const copyCode = () => {
    if (activeScenario) {
      navigator.clipboard?.writeText(JSON.stringify(scenarios[activeScenario].nba, null, 2));
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Interactive Cognitive Scoring Demo
          </h2>
          <p className="text-blue-100">
            See how behavioral signals translate into cognitive metrics and actionable recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(scenarios).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => runScore(key as ScenarioKey)}
              disabled={isScoring}
              className={`p-6 rounded-xl text-left transition-all ${
                activeScenario === key
                  ? 'bg-white shadow-xl scale-105'
                  : 'bg-white/90 hover:bg-white hover:shadow-lg'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">{scenario.name}</h3>
                <Play className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
              <div className="space-y-1">
                {scenario.events.map((event, i) => (
                  <div key={i} className="text-xs text-gray-500 font-mono">
                    &bull; {event}
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {isScoring && (
          <div className="bg-white rounded-xl p-12 text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing behavioral signals...</p>
          </div>
        )}

        {!isScoring && activeScenario && (
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-600" />
                Cognitive Metrics Output
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <MetricCard
                  label="Decision Fatigue"
                  value={scenarios[activeScenario].scores.dfi.value}
                  bucket={scenarios[activeScenario].scores.dfi.label}
                  color={scenarios[activeScenario].scores.dfi.color}
                />
                <MetricCard
                  label="Drop-Off Intent"
                  value={scenarios[activeScenario].scores.doi.value}
                  bucket={scenarios[activeScenario].scores.doi.label}
                  color={scenarios[activeScenario].scores.doi.color}
                />
                <MetricCard
                  label="Trust Health"
                  value={scenarios[activeScenario].scores.th.value}
                  bucket={scenarios[activeScenario].scores.th.label}
                  color={scenarios[activeScenario].scores.th.color}
                />
                <MetricCard
                  label="Engagement Readiness"
                  value={scenarios[activeScenario].scores.er.value}
                  bucket={scenarios[activeScenario].scores.er.label}
                  color={scenarios[activeScenario].scores.er.color}
                />
                <MetricCard
                  label="Conversion Likelihood"
                  value={scenarios[activeScenario].scores.cli.value}
                  bucket={scenarios[activeScenario].scores.cli.label}
                  color={scenarios[activeScenario].scores.cli.color}
                />
              </div>

              <div className="border-t pt-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Next Best Action (NBA) Output
                </h4>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button
                    onClick={copyCode}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <pre className="text-xs text-green-400 font-mono overflow-x-auto">
                    {JSON.stringify(scenarios[activeScenario].nba, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  LLM Explanation (Narration Only)
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {scenarios[activeScenario].explanation}
                </p>
                <p className="text-xs text-blue-600 mt-4 italic">
                  Note: Explanation batch-generated nightly, cached for 24 hours. LLM never scores or decides.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   7. TRUSTED BY INDUSTRY LEADERS
   ═══════════════════════════════════════════════ */
function TestimonialsSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Trusted by Industry Leaders
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Compliance-first teams choose DiCorner for predictive transparency and audit-ready intelligence.
        </p>
      </div>

      {/* Primary testimonial */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
          <span className="text-sm text-gray-500 ml-2">5/5 UX/UI</span>
        </div>
        <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
          &ldquo;The predictive transparency provided by the DiCorner team was
          the deciding factor for us. Unlike other black-box analytics tools,
          her platform allowed our Risk &amp; Compliance leads to see exactly
          how ML scores were generated. This level of auditability gave us the
          confidence to automate behavioral decisions that were previously
          manual.&rdquo;
        </blockquote>
        <div className="text-sm font-medium text-gray-500">
          Maximus Energy Consultation
        </div>
      </div>

      {/* Value prop trust cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {[
          {
            icon: Shield,
            title: 'Deterministic Intelligence',
            description: 'Every score is reproducible. Hard-coded rules plus interpretable ML ensure compliance teams can trace any decision.',
          },
          {
            icon: Lock,
            title: 'Governance-Ready NBA',
            description: 'Every recommendation includes confidence bounds, psychological justification, and human override capability.',
          },
          {
            icon: Users,
            title: 'Human + Machine',
            description: '2M+ cognitive science researchers validate every model output. We augment human judgment, never replace it.',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <item.icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   8. OUR STORY SO FAR
   ═══════════════════════════════════════════════ */
function OurStorySection() {
  const stats = [
    { value: '50+', label: 'Global Clients', sub: 'Fintech, SaaS, E-commerce', icon: Globe },
    { value: '500K+', label: 'Behavioral Insights', sub: 'Captured and validated', icon: Activity },
    { value: '99.9%', label: 'Platform Uptime', sub: 'Enterprise-grade reliability', icon: Shield },
    { value: '6x', label: 'Average ROI', sub: 'Across client programs', icon: TrendingUp },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-100 to-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Story So Far</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-3">
                <s.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{s.value}</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   9. FEATURED BLOG
   ═══════════════════════════════════════════════ */
function FeaturedBlogSection() {
  const blogs = [
    { title: 'Understanding Decision Fatigue in Digital Products', category: 'Behavioral Intelligence' },
    { title: 'Why Deterministic AI Matters for Compliance Teams', category: 'Compliance' },
    { title: 'Golden Session Replays: A New Approach to User Research', category: 'Methodology' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Content</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.title}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                {blog.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h3>
            <p className="text-sm text-gray-500">Coming soon</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   10. READY FOR AUDIT-READY BEHAVIORAL INTELLIGENCE?
   ═══════════════════════════════════════════════ */
function CTASection() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready for Audit-Ready Behavioral Intelligence?
        </h2>
        <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
          Join 50+ companies using DiCorner to understand why users behave the
          way they do, reduce churn, and prove ROI with explainable, deterministic
          intelligence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/schedule-demo"
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
          >
            Schedule a Demo
          </Link>
          <Link
            href="/contact"
            className="border border-blue-300 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-500 transition-colors"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   11. FAQs (2-column, click to expand)
   ═══════════════════════════════════════════════ */
const faqData = [
  { q: 'What is DiCorner?', a: 'DiCorner is a cognitive behavioral intelligence platform that helps growth teams understand why users behave the way they do. We score cognitive states like decision fatigue, trust health, and drop-off intent, then recommend high-confidence interventions.' },
  { q: 'How does the DiCorner framework work?', a: 'We use a hybrid system: hard-coded rules plus interpretable ML (logistic regression, GBDT) to score cognitive metrics. An LLM narrates the results but never scores or decides. Pipeline: Events \u2192 Feature Extraction \u2192 ML + Rule Scoring \u2192 Decision Engine \u2192 NBA Output \u2192 LLM Explanation.' },
  { q: 'How is this different from Mixpanel or Amplitude?', a: 'Traditional tools track what users do. DiCorner models why they do it by scoring cognitive states like decision fatigue and trust erosion. We provide interventions, not just dashboards.' },
  { q: 'Do I need to change my existing tracking?', a: 'No. DiCorner works with your existing event streams. We map your events to cognitive metrics. Pre-built SDKs for React, Python, and Node.js.' },
  { q: 'How accurate are the cognitive scores?', a: '90% predictive alignment validated by cognitive science experts. We use programmatic labeling plus human-in-the-loop validation with golden session replays.' },
  { q: 'How quickly can I get started?', a: 'API key: instant (free Builder tier). Time to first score: under 2 hours with our SDKs. Time to insights: days via golden session replay methodology. Real-time freshness: sub-45s from event ingestion to dashboard update.' },
  { q: 'What happens if I exceed my event limit?', a: 'We notify you at 80% usage. Overages are billed at $0.005/event. You can upgrade anytime to avoid overage fees.' },
  { q: 'Can I switch plans?', a: 'Yes, upgrade or downgrade anytime. Changes take effect on your next billing cycle.' },
  { q: 'Is there a contract commitment?', a: 'Builder is free forever. Growth is month-to-month. Enterprise typically requires annual commitment.' },
  { q: 'Who uses DiCorner?', a: 'Growth teams, product managers, customer success teams, and compliance officers at SMBs in Fintech, SaaS, E-commerce, and Healthtech.' },
  { q: 'Can DiCorner validate IP-protected applications?', a: 'Yes. We support pre-release, beta, and internal applications. All cognitive researchers operate under strict NDAs.' },
  { q: 'What is the minimum data needed?', a: '50+ events per user for reliable scoring. We flag insufficient data cases rather than serving scores with false confidence.' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all"
    >
      <div className="flex justify-between items-start gap-4">
        <h3 className="font-semibold text-gray-900 text-sm">{q}</h3>
        <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && (
        <p className="text-gray-600 text-sm leading-relaxed mt-3 pr-8">{a}</p>
      )}
    </button>
  );
}

function FAQSection() {
  const half = Math.ceil(faqData.length / 2);
  const col1 = faqData.slice(0, half);
  const col2 = faqData.slice(half);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {col1.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
        <div className="space-y-4">
          {col2.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════ */
export default function LandingV3() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      <TrustedBySection />
      <RealUsersSection />
      <FeaturedCaseStudies />
      <SolutionsSection />
      <InteractiveDemoSection />
      <TestimonialsSection />
      <OurStorySection />
      <FeaturedBlogSection />
      <CTASection />
      <FAQSection />
    </div>
  );
}
