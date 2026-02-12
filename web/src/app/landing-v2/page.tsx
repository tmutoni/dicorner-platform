
'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Zap,
  Shield,
  GitBranch,
  Lock,
  AlertTriangle,
  Copy,
  Play,
  ArrowRight,
  Activity
} from 'lucide-react';

type ScenarioKey = 'comparisonParalysis' | 'kycFriction' | 'rateSensitive';

interface MetricCardProps {
  label: string;
  value: number | string;
  bucket: string;
  color: "red" | 'orange' | 'yellow' | 'green'
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

const DiCornerLanding = () => {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey | null>(null);
  const [isScoring, setIsScoring] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Cognitive scoring scenarios with v0 ranges
  const scenarios = {
    comparisonParalysis: {
      name: "Comparison Paralysis",
      description: "User stuck comparing pricing tiers",
      events: [
        "pricing_view (4x)",
        "feature_compare (3x)", 
        "no_action (10 min)"
      ],
      scores: {
        dfi: { value: 85, label: "Critical", color: "red" },
        doi: { value: 58, label: "High", color: "orange" },
        th: { value: 58, label: "At Risk", color: "orange" },
        er: { value: 35, label: "Warming", color: "yellow" },
        cli: { value: 72, label: "High", color: "green" }
      },
      nba: {
        action: "Simplify pricing comparison—reduce from 4 tiers to 2",
        category: "Do Now",
        impact_direction: "Reduce friction",
        confidence: 0.87,
        effort: "Low",
        why: "User viewed pricing 4x in 10 min without progressing. Signal: comparison paralysis, not disinterest. Psychology: Choice overload + cognitive depletion."
      },
      explanation: "Decision Fatigue is Critical (85) due to repeated pricing views and feature comparisons without forward motion. Trust remains Moderate, suggesting intent is present. A simplified comparison view may reduce cognitive overload."
    },
    kycFriction: {
      name: "KYC Friction",
      description: "Document upload failures creating trust erosion",
      events: [
        "kyc_start",
        "document_upload_fail (2x)",
        "support_ticket"
      ],
      scores: {
        dfi: { value: 62, label: "High", color: "orange" },
        doi: { value: 72, label: "Critical", color: "red" },
        th: { value: 45, label: "At Risk", color: "orange" },
        er: { value: 28, label: "Not Ready", color: "red" },
        cli: { value: 65, label: "High", color: "green" }
      },
      nba: {
        action: "Add inline document format guide with accepted file types",
        category: "Do Now",
        impact_direction: "Reduce friction",
        confidence: 0.89,
        effort: "Low",
        why: "Repeated upload failures signal technical friction, not user disengagement. Support ticket indicates intent to complete. Clear guidance will restore trust and reduce abandonment."
      },
      explanation: "Drop-Off Intent is Critical (72) with Trust At Risk (45) due to technical friction at identity verification. Decision Fatigue is elevated from repeated failures. User has demonstrated commitment via support contact—intervention timing is optimal."
    },
    rateSensitive: {
      name: "Rate-Sensitive Exploration",
      description: "High engagement, evaluating competitive options",
      events: [
        "apr_view (5x)",
        "calculator_use (2x)",
        "external_link_click"
      ],
      scores: {
        dfi: { value: 48, label: "Moderate", color: "yellow" },
        doi: { value: 42, label: "Moderate", color: "yellow" },
        th: { value: 78, label: "Mild Risk", color: "yellow" },
        er: { value: 82, label: "Primed", color: "green" },
        cli: { value: 68, label: "High", color: "green" }
      },
      nba: {
        action: "A/B test rate lock messaging vs. comparison guarantee",
        category: "Try Experiment",
        impact_direction: "Increase trust",
        confidence: 0.64,
        effort: "Medium",
        why: "User is actively evaluating rates with strong engagement signals. External link suggests comparison shopping. Trust is intact. Test messaging that reinforces competitive positioning without applying pressure."
      },
      explanation: "Engagement Readiness is Primed (82) with Healthy Trust (78). Moderate Decision Fatigue from rate exploration is normal for this segment. User demonstrates research behavior, not abandonment intent. Experimental intervention recommended over immediate pressure."
    }
  } as const;

  const runScore = (scenarioKey: ScenarioKey) => {
    setIsScoring(true);
    setTimeout(() => {
    setActiveScenario(scenarioKey);
    setIsScoring(false);
    }, 1200);
    };

  const copyCode = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Guessing Why Users Drop Off.<br />
              <span className="text-blue-600">Understand Their Cognitive State—Deterministically.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              DiCorner models decision fatigue, trust breakdowns, and drop-off intent using interpretable ML + deterministic rules. Then tells you exactly what to do, with confidence bounds.
            </p>
            
            <button className="bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center gap-2">
              View Cognitive Scoring Demo
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-sm text-gray-500 mt-6">
              Deterministic Scoring • Explainable Decisions • Audit-Ready Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Transparency */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Built for Compliance-First Teams
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Deterministic behavioral intelligence + interpretable ML core + single explainability layer for clarity
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-blue-600" />
            Authoritative Architecture
          </h3>
          
          <div className="flex items-center justify-between text-sm mb-8 overflow-x-auto pb-4">
            <div className="flex items-center gap-3 min-w-max">
              <div className="px-4 py-3 bg-blue-50 rounded-lg border-2 border-blue-200 font-medium text-blue-900">
                User Events
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="px-4 py-3 bg-blue-50 rounded-lg border-2 border-blue-200 font-medium text-blue-900">
                Feature Extraction
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="px-4 py-3 bg-green-50 rounded-lg border-2 border-green-200 font-medium text-green-900">
                ML + Rule Scoring
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="px-4 py-3 bg-purple-50 rounded-lg border-2 border-purple-200 font-medium text-purple-900">
                Decision Engine
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="px-4 py-3 bg-orange-50 rounded-lg border-2 border-orange-200 font-medium text-orange-900">
                NBA Output
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="px-4 py-3 bg-yellow-50 rounded-lg border-2 border-yellow-200 font-medium text-yellow-900">
                LLM Explanation
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="px-4 py-3 bg-gray-50 rounded-lg border-2 border-gray-200 font-medium text-gray-900">
                Dashboard
              </div>
            </div>
          </div>

          <div className="text-center mb-4 text-sm text-gray-600">
            ↑ LLM = Narration Only
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">ML scores cognitive metrics</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Rules override edge cases</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">LLM explains, never decides</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Human review gates actions</span>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 bg-gray-50 border-r">
              <h3 className="font-bold text-gray-900 mb-6">Event Analytics</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border">
                  <div className="text-gray-600 text-sm mb-1">What happened?</div>
                  <div className="font-medium text-gray-900">&quot;Viewed pricing 4x&quot;</div>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <div className="text-gray-600 text-sm mb-1">Risk assessment</div>
                  <div className="font-medium text-gray-900">&quot;80% churn risk&quot;</div>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <div className="text-gray-600 text-sm mb-1">Recommendation</div>
                  <div className="font-medium text-gray-900">&quot;Send email campaign&quot;</div>
                </div>
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-bold text-blue-600 mb-6">DiCorner Cognitive Intelligence</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-sm mb-1">Why did it happen?</div>
                  <div className="font-medium text-gray-900">Decision Fatigue Index: 85/100 (Critical)</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-sm mb-1">Cognitive assessment</div>
                  <div className="font-medium text-gray-900">Trust Health: Declining (friction at pricing step)</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-sm mb-1">Actionable intervention</div>
                  <div className="font-medium text-gray-900">Do Now: Reduce cognitive load (+12% conversion, 87% confidence)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
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
                      • {event}
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

      {/* Compliance Contract */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-600" />
            Compliance Contract (Non-Negotiable)
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">What We Do</h3>
              <div className="space-y-3">
                {[
                  "Optimize engagement, not lending decisions",
                  "No protected attributes used in scoring",
                  "Human review gates all interventions",
                  "Complete audit trail (every decision reproducible)",
                  "Model rollback if scores deviate >20% from validation"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Hard Boundaries</h3>
              <div className="space-y-3">
                {[
                  "LLM never scores",
                  "LLM never chooses actions",
                  "LLM never runs policy logic",
                  "LLM only narrates cognition + rationale",
                  "Zero undefined outputs"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-lg p-6 border">
            <h4 className="font-semibold text-gray-900 mb-4">Explainability Example</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-bold">✗</div>
                  <span className="font-semibold text-red-900">BAD</span>
                </div>
                <p className="text-sm text-gray-700 italic">
                  &quot;User is low-income and may not afford loan&quot;
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span className="font-semibold text-green-900">GOOD</span>
                </div>
                <p className="text-sm text-gray-700 italic">
                  &quot;User viewed APR 5x, paused 30+ sec before exit. High cognitive load at pricing. Add FAQ.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Circuit Breakers */}
      <div className="bg-gradient-to-br from-slate-100 to-blue-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              Circuit Breakers Built In
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                { condition: "LLM fails", action: "Cached explanation + structured fallback text" },
                { condition: "ML fails", action: "Deterministic rule engine continues" },
                { condition: "Rules break", action: "Neutral recommendation ('Insufficient evidence')" },
                { condition: "Model drift detected", action: "Auto-revert to rule-based scoring + alert" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{item.condition}?</div>
                    <div className="text-sm text-gray-700">→ {item.action}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Operational Guarantees</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">99.5%</div>
                  <div className="text-sm text-gray-700">Uptime Target</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">&lt;300ms</div>
                  <div className="text-sm text-gray-700">Scoring Latency</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">AES-256</div>
                  <div className="text-sm text-gray-700">Data Encryption</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Known Limitations */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Known Limitations (Phase 1)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">What DiCorner Does NOT Do</h3>
              <div className="space-y-2">
                {[
                  "Real-time model retraining",
                  "Fraud/abuse detection",
                  "Causal inference (we show correlation)",
                  "Integration with underwriting systems",
                  "Multi-armed bandit experimentation"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5">✗</div>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Requirements for Best Results</h3>
              <div className="space-y-3">
                {[
                  { label: "Minimum events/user", value: "50+ for reliable scoring" },
                  { label: "Traffic volume", value: ">1K users/week" },
                  { label: "Cold start period", value: "7-14 days for calibration" },
                  { label: "Use case", value: "High-traffic funnels" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <span className="text-sm text-gray-600">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>Why we disclose this:</strong> Shows maturity. Better to flag limitations upfront than have clients discover them later.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for Audit-Ready Behavioral Intelligence?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Two-stage rollout: Read-only insights week → Controlled NBA enablement
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 inline-flex items-center gap-2">
            View Cognitive Scoring Demo
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-blue-100 mt-6 text-sm">
            Sandbox tenant available • No production deployment required for testing
          </p>
        </div>
      </div>
    </div>
  );
};
export default DiCornerLanding;