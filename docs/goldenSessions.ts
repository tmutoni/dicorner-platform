/**
 * DiCorner — Golden Session Fixtures
 * Source: Golden Session Replays (production-ready) spreadsheet
 * 12 synthetic user sessions for Phase 1 + Phase 2 validation
 *
 * Usage:
 *   import { GOLDEN_SESSIONS, getSession } from './goldenSessions'
 *   const session = getSession('GOLD_001_HEALTHY_DECISIVE')
 */

export type RawEvent = {
  event_name: string;
  step?: string;
  timestamp_s: number; // seconds from session start
  dwell_s?: number;    // dwell time in seconds if applicable
  error_type?: string;
};

export type ExpectedScores = {
  dfi: [number, number]; // [min, max] as 0–100
  doi: [number, number];
  th:  [number, number];
  er:  [number, number];
  cli: [number, number];
};

export type ExpectedNBA = {
  action: string;
  category: 'Do Now' | 'Try Experiment' | 'Ignore';
  impact_direction: string;
  confidence: number;
  effort: string;
  why: string;
};

export type GoldenSession = {
  trace_id: string;
  scenario_name: string;
  intent_tag: string;
  funnel_path: string;
  events: RawEvent[];
  expected_scores: ExpectedScores | null; // null = bot/invalid session
  expected_aggregate_risk: 'low' | 'medium' | 'medium-high' | 'high' | 'invalid';
  expected_nba: ExpectedNBA;
  sanity_assertions: string[];
  notes: string;
  is_bot: boolean;
};

// ---------------------------------------------------------------------------
// Raw event helpers
// ---------------------------------------------------------------------------

function sv(step: string, t: number, dwell?: number): RawEvent {
  return { event_name: 'STEP_VIEW', step, timestamp_s: t, ...(dwell ? { dwell_s: dwell } : {}) };
}
function sb(step: string, t: number): RawEvent {
  return { event_name: 'STEP_BACKTRACK', step, timestamp_s: t };
}
function cta(step: string, t: number): RawEvent {
  return { event_name: 'CLICK_PRIMARY_CTA', step, timestamp_s: t };
}
function doc(step: string, t: number, dwell: number): RawEvent {
  return { event_name: 'DOC_OR_DISCLOSURE_VIEW', step, timestamp_s: t, dwell_s: dwell };
}
function err(type: string, t: number): RawEvent {
  return { event_name: 'ERROR_SHOWN', error_type: type, timestamp_s: t };
}
function sessionStart(t = 0): RawEvent {
  return { event_name: 'SESSION_START', timestamp_s: t };
}
function sessionEnd(t: number): RawEvent {
  return { event_name: 'SESSION_END', timestamp_s: t };
}
function conversion(t: number): RawEvent {
  return { event_name: 'CONVERSION_EVENT', step: 'loan_approved', timestamp_s: t };
}

// ---------------------------------------------------------------------------
// 12 Golden Sessions
// ---------------------------------------------------------------------------

export const GOLDEN_SESSIONS: GoldenSession[] = [
  // -------------------------------------------------------------------------
  // GS01 — Healthy Decisive User (Baseline Gold Standard)
  // -------------------------------------------------------------------------
  {
    trace_id: 'GOLD_001_HEALTHY_DECISIVE',
    scenario_name: 'Healthy, decisive user',
    intent_tag: 'conversion_smooth',
    funnel_path: 'Session_start → Loan_comparison → Loan_selection → APR_disclosure → KYC_start → KYC_complete → Approval',
    events: [
      sessionStart(0),
      sv('loan_comparison', 5),
      cta('compare_loans', 12),
      sv('loan_selection', 18),
      cta('select_loan', 25),
      doc('apr_disclosure', 30, 8),
      cta('proceed_to_kyc', 40),
      sv('kyc_start', 45),
      sv('kyc_identity_upload', 60),
      cta('submit_identity', 75),
      sv('kyc_complete', 80),
      conversion(90),
      sessionEnd(95),
    ],
    expected_scores: { dfi: [0, 15], doi: [0, 10], th: [85, 100], er: [90, 100], cli: [85, 100] },
    expected_aggregate_risk: 'low',
    expected_nba: {
      action: 'no_op_monitor',
      category: 'Ignore',
      impact_direction: 'None',
      confidence: 0.9,
      effort: 'Low',
      why: 'User shows clear intent, no friction signals, completing funnel smoothly',
    },
    sanity_assertions: [
      'Adding 1-2 clean forward steps must NOT increase DFI above 20',
      'TH must be highest across all 12 scenarios',
      'NBA must NEVER recommend intervention for this user type',
    ],
    notes: 'Critical baseline. If this scores high fatigue or drop-off risk, model is broken. Use for regression testing.',
    is_bot: false,
  },

  // -------------------------------------------------------------------------
  // GS02 — Slow Thoughtful Reader (High Engagement, Low Risk)
  // -------------------------------------------------------------------------
  {
    trace_id: 'GOLD_002_THOUGHTFUL_READER',
    scenario_name: 'Slow, thoughtful but confident',
    intent_tag: 'deliberate_conversion',
    funnel_path: 'Session_start → Loan_comparison → Document_review → Loan_selection → APR_review → KYC → Approval',
    events: [
      sessionStart(0),
      sv('loan_comparison', 8),
      doc('loan_terms', 20, 45),
      doc('faq', 70, 30),
      cta('compare_loans', 105),
      sv('loan_selection', 115),
      doc('apr_breakdown', 130, 60),
      cta('select_loan', 195),
      sv('kyc_start', 210),
      doc('privacy_policy', 225, 40),
      sv('kyc_identity_upload', 270),
      cta('submit_identity', 300),
      conversion(320),
      sessionEnd(325),
    ],
    expected_scores: { dfi: [30, 45], doi: [10, 20], th: [75, 90], er: [80, 95], cli: [70, 85] },
    expected_aggregate_risk: 'low',
    expected_nba: {
      action: 'no_op_monitor',
      category: 'Ignore',
      impact_direction: 'None',
      confidence: 0.85,
      effort: 'Low',
      why: 'User is engaged and reading thoroughly; long dwell times indicate diligence, not confusion',
    },
    sanity_assertions: [
      'High doc view count (3+) + long dwell times must NOT trigger high fatigue if forward progress continues',
      'TH should remain high — user trusts enough to read everything',
      'NBA must NOT recommend simplify for this pattern',
    ],
    notes: 'Proves model distinguishes "careful" from "confused." Some users need time. Do not penalize them.',
    is_bot: false,
  },

  // -------------------------------------------------------------------------
  // GS03 — Comparison Paralysis (High Fatigue, Medium Intent) — PRIMARY DEMO
  // -------------------------------------------------------------------------
  {
    trace_id: 'GOLD_003_COMPARISON_LOOP',
    scenario_name: 'Comparison paralysis',
    intent_tag: 'decision_fatigue_high_intent',
    funnel_path: 'Session_start → Loan_comparison (loop) → Loan_comparison (loop) → APR_view → Exit',
    events: [
      sessionStart(0),
      sv('loan_comparison', 5),
      sv('loan_option_A', 15),
      sv('loan_option_B', 25),
      sv('loan_option_C', 35),
      sb('loan_comparison', 45),
      sv('loan_option_A', 50),
      sv('loan_option_D', 60),
      sb('loan_comparison', 70),
      sv('loan_option_B', 75),
      doc('apr_disclosure', 85, 20),
      sv('loan_option_E', 110),
      sb('loan_comparison', 120),
      doc('loan_terms', 130, 15),
      sessionEnd(150),
    ],
    expected_scores: { dfi: [75, 92], doi: [40, 60], th: [50, 70], er: [70, 85], cli: [40, 60] },
    expected_aggregate_risk: 'medium-high',
    expected_nba: {
      action: 'simplify_options',
      category: 'Do Now',
      impact_direction: 'Reduce friction',
      confidence: 0.8,
      effort: 'Medium',
      why: 'User is engaged but overwhelmed by choices; reduce options to top 3 based on stated preferences to break paralysis',
    },
    sanity_assertions: [
      'Adding MORE comparison loops must increase DFI (not decrease)',
      'Removing backtracks must decrease DFI',
      'ER must stay ≥70 — user is engaged, not disinterested',
      'DOI should be medium — not abandoning yet, but stalling',
    ],
    notes: 'Core demo case. Shows model distinguishes "paralysis" (high fatigue, medium drop-off) from "disinterest" (low fatigue, high drop-off).',
    is_bot: false,
  },

  // -------------------------------------------------------------------------
  // GS04 — Rate Shock at APR (Trust Collapse) — PRIMARY DEMO
  // -------------------------------------------------------------------------
  {
    trace_id: 'GOLD_004_RATE_SHOCK',
    scenario_name: 'Rate anxiety / APR shock',
    intent_tag: 'trust_shock_pricing_step',
    funnel_path: 'Session_start → Loan_selection → APR_disclosure (repeat) → Exit',
    events: [
      sessionStart(0),
      sv('loan_comparison', 5),
      sv('loan_selection', 15),
      cta('select_loan', 25),
      doc('apr_disclosure', 30, 45),
      doc('apr_breakdown', 80, 30),
      doc('apr_comparison', 115, 25),
      sv('loan_selection', 145),
      doc('apr_disclosure', 155, 20),
      doc('faq_rates', 180, 35),
      sessionEnd(220),
    ],
    expected_scores: { dfi: [40, 60], doi: [65, 85], th: [15, 35], er: [50, 70], cli: [20, 40] },
    expected_aggregate_risk: 'high',
    expected_nba: {
      action: 'clarify_terms',
      category: 'Do Now',
      impact_direction: 'Increase trust',
      confidence: 0.75,
      effort: 'Low',
      why: 'User is reviewing APR repeatedly with long dwell times, indicating rate sensitivity or confusion; add rate lock guarantee or comparison tool to build confidence',
    },
    sanity_assertions: [
      'Increasing APR doc views must NOT improve TH — more views = more concern',
      'TH must be LOWEST among engaged users (GS01, GS02, GS03)',
      'NBA must focus on trust-building, not simplification',
    ],
    notes: 'APR shock demo case. User is interested but loses trust at pricing step. Critical fintech pattern.',
    is_bot: false,
  },

  // -------------------------------------------------------------------------
  // GS05 — KYC Error Storm (Friction-Driven Abandonment)
  // -------------------------------------------------------------------------
  {
    trace_id: 'GOLD_005_KYC_FRICTION',
    scenario_name: 'Error storm at KYC',
    intent_tag: 'kyc_friction_error',
    funnel_path: 'Session_start → Loan_selection → APR_disclosure → KYC_start → Errors → Exit',
    events: [
      sessionStart(0),
      sv('loan_comparison', 5),
      sv('loan_selection', 15),
      cta('select_loan', 25),
      doc('apr_disclosure', 30, 12),
      cta('proceed_to_kyc', 45),
      sv('kyc_start', 50),
      sv('kyc_identity_upload', 60),
      err('file_format_invalid', 70),
      sv('kyc_identity_upload', 75),
      err('file_size_too_large', 85),
      sv('kyc_identity_upload', 90),
      err('photo_unclear', 100),
      sv('kyc_start', 110),
      err('timeout', 120),
      sessionEnd(130),
    ],
    expected_scores: { dfi: [55, 75], doi: [70, 90], th: [30, 50], er: [60, 80], cli: [30, 50] },
    expected_aggregate_risk: 'high',
    expected_nba: {
      action: 'reduce_steps',
      category: 'Do Now',
      impact_direction: 'Reduce friction',
      confidence: 0.8,
      effort: 'Medium',
      why: 'User encountered 4+ errors at KYC step, indicating technical friction; streamline identity verification or offer manual upload alternative',
    },
    sanity_assertions: [
      'Increasing error count must NEVER reduce DOI — errors drive abandonment risk',
      'Removing errors must improve TH',
      'NBA must focus on friction reduction, not trust-building',
    ],
    notes: 'Error-driven friction scenario. User wants to proceed but system is blocking them. Fixable UX, not user intent problem.',
    is_bot: false,
  },

  // -------------------------------------------------------------------------
  // GS06 — Early Abandonment (Low Engagement, Curious But Not Committed)
  // -------------------------------------------------------------------------
  {
    trace_id: 'GOLD_006_EARLY_EXIT',
    scenario_name: 'Early abandonment / window shopping',
    intent_tag: 'sparse_events_ambiguous_intent',
    funnel_path: 'Session_start → Loan_comparison → Exit',
    events: [
      sessionStart(0),
      sv('loan_comparison', 5),
      sv('loan_option_A', 12),
      sessionEnd(22),
    ],
    expected_scores: { dfi: [0, 25], doi: [40, 65], th: [40, 70], er: [10, 30], cli: [10, 30] },
    expected_aggregate_risk: 'medium',
    expected_nba: {
      action: 'no_op_monitor',
      category: 'Try Experiment',
      impact_direction: 'Increase completion',
      confidence: 0.5,
      effort: 'Low',
      why: 'Insufficient behavioral evidence; user may be exploring options; avoid heavy intervention, consider retargeting campaign',
    },
    sanity_assertions: [
      'Low event count (1-3 events) must produce low fatigue (not high)',
      'ER must be LOWEST among all scenarios',
      'NBA must avoid strong "Do Now" actions — signal too weak',
    ],
    notes: 'Tire-kickers. Model should say "insufficient evidence" not "high risk."',
    is_bot: false,
  },

  // -------------------------------------------------------------------------
  // GS07 — Erratic Navigation (Confused or Exploring)
  // -------------------------------------------------------------------------
  {
    trace_id: 'GOLD_007_ERRATIC_BOUNCE',
    scenario_name: 'Erratic, non-linear navigation',
    intent_tag: 'exploration_uncertainty',
    funnel_path: 'Session_start → Random navigation → Multiple backtracks → Exit',
    events: [
      sessionStart(0),
      sv('loan_comparison', 5),
      sv('faq', 15),
      sb('loan_comparison', 25),
      sv('loan_selection', 30),
      sb('loan_comparison', 40),
      sv('about_us', 50),
      sv('contact', 60),
      sb('loan_comparison', 70),
      sv('loan_option_C', 80),
      sv('privacy_policy', 90),
      sb('loan_comparison', 100),
      sessionEnd(110),
    ],
    expected_scores: { dfi: [50, 70], doi: [50, 70], th: [40, 60], er: [40, 60], cli: [30, 50] },
    expected_aggregate_risk: 'medium-high',
    expected_nba: {
      action: 'offer_human_help',
      category: 'Try Experiment',
      impact_direction: 'Increase completion',
      confidence: 0.6,
      effort: 'Medium',
      why: 'User is navigating erratically with multiple backtracks; unclear intent; offer live chat or guided flow to reduce confusion',
    },
    sanity_assertions: [
      'High backtrack count must increase DFI (not decrease)',
      'Non-linear navigation must NOT produce extreme scores — user might be exploring',
      'ER should be medium — neither highly engaged nor disengaged',
    ],
    notes: 'Edge case: exploratory but confused. Model should flag uncertainty, not confidently prescribe heavy intervention.',
    is_bot: false,
  },

  // -------------------------------------------------------------------------
  // GS08 — Bot/Noise Pattern (Reject or Neutral Fallback) — EDGE CASE
  // -------------------------------------------------------------------------
  {
    trace_id: 'GOLD_008_BOT_NOISE',
    scenario_name: 'Bot or noise traffic',
    intent_tag: 'invalid_traffic',
    funnel_path: 'Session_start → Burst events (<1s apart) → Exit',
    events: [
      sessionStart(0),
      sv('loan_comparison', 0.1),
      sv('loan_option_A', 0.2),
      sv('loan_option_B', 0.3),
      sv('loan_option_C', 0.4),
      sv('loan_option_D', 0.5),
      cta('select_loan', 0.6),
      sv('apr_disclosure', 0.7),
      cta('proceed_to_kyc', 0.8),
      sv('kyc_start', 0.9),
      sessionEnd(1.0),
    ],
    expected_scores: null, // flagged as invalid — do not score
    expected_aggregate_risk: 'invalid',
    expected_nba: {
      action: 'reject_or_flag',
      category: 'Ignore',
      impact_direction: 'None',
      confidence: 0.95,
      effort: 'Low',
      why: 'Event timestamps indicate bot or automated traffic; unrealistic human behavior; exclude from scoring',
    },
    sanity_assertions: [
      'Burst events (<1s between major steps) must trigger bot detection flag',
      'Scoring model must return null rather than calculating scores',
      'NBA must output "insufficient evidence" or "reject"',
    ],
    notes: 'Critical for production. Model MUST detect and reject bot traffic, not score it.',
    is_bot: true,
  },

  // -------------------------------------------------------------------------
  // GS09 — Trust Collapse at Disclosure (Sees Terms, Exits Immediately)
  // -------------------------------------------------------------------------
  {
    trace_id: 'GOLD_009_TRUST_COLLAPSE',
    scenario_name: 'Trust collapse at disclosure',
    intent_tag: 'disclosure_shock',
    funnel_path: 'Session_start → Loan_selection → Terms_disclosure → Immediate exit',
    events: [
      sessionStart(0),
      sv('loan_comparison', 5),
      sv('loan_selection', 15),
      cta('select_loan', 25),
      doc('terms_and_conditions', 30, 5), // very short dwell — shock
      sessionEnd(37),
    ],
    expected_scores: { dfi: [20, 40], doi: [80, 95], th: [5, 20], er: [40, 60], cli: [10, 25] },
    expected_aggregate_risk: 'high',
    expected_nba: {
      action: 'clarify_terms',
      category: 'Do Now',
      impact_direction: 'Increase trust',
      confidence: 0.7,
      effort: 'Medium',
      why: 'User exited immediately after viewing terms; possible shock at hidden fees, legal language, or unexpected conditions; simplify disclosure or add FAQ',
    },
    sanity_assertions: [
      'Very short dwell on disclosure (<10s) followed by immediate exit must produce lowest TH score',
      'DOI must be HIGHEST among all scenarios',
      'DFI should be low-medium — user did not get confused, they just left',
      'NBA must focus on trust recovery, not friction reduction',
    ],
    notes: 'Trust collapse pattern. Different from GS04 (rate shock) because it is INSTANT exit, not repeated viewing.',
    is_bot: false,
  },

  // -------------------------------------------------------------------------
  // GS10 — Intent Solidifying (Accelerating Confidence)
  // -------------------------------------------------------------------------
  {
    trace_id: 'GOLD_010_INTENT_SOLIDIFY',
    scenario_name: 'Intent solidifying / accelerating',
    intent_tag: 'confidence_building',
    funnel_path: 'Session_start → Slow initial exploration → Faster later steps → Conversion',
    events: [
      sessionStart(0),
      sv('loan_comparison', 5),
      doc('loan_terms', 15, 60),
      sv('loan_selection', 80),
      doc('apr_disclosure', 90, 30),
      cta('select_loan', 125),
      sv('kyc_start', 130),
      sv('kyc_identity_upload', 135),
      cta('submit_identity', 140),
      conversion(145),
      sessionEnd(150),
    ],
    expected_scores: { dfi: [20, 40], doi: [20, 40], th: [60, 80], er: [75, 90], cli: [75, 90] },
    expected_aggregate_risk: 'low',
    expected_nba: {
      action: 'no_op_monitor',
      category: 'Ignore',
      impact_direction: 'None',
      confidence: 0.85,
      effort: 'Low',
      why: 'User is building confidence over time; dwell times decreasing, click velocity increasing; natural progression toward conversion',
    },
    sanity_assertions: [
      'Early steps should show higher DFI contribution than later steps',
      'TH should increase over session (trust building)',
      'CLI should be high at end of session',
      'NBA must NOT intervene on users showing positive momentum',
    ],
    notes: 'Confidence-building pattern. User starts cautious, gains trust, accelerates. Do not penalize early hesitation.',
    is_bot: false,
  },

  // -------------------------------------------------------------------------
  // GS11 — Decision Recovery (Gets Stuck, Then Completes)
  // -------------------------------------------------------------------------
  {
    trace_id: 'GOLD_011_DECISION_RECOVERY',
    scenario_name: 'Decision recovery / resilience',
    intent_tag: 'transient_fatigue_recovery',
    funnel_path: 'Session_start → Comparison loop → Pause → Return → Completion',
    events: [
      sessionStart(0),
      sv('loan_comparison', 5),
      sv('loan_option_A', 15),
      sv('loan_option_B', 25),
      sb('loan_comparison', 35),
      sv('loan_option_C', 45),
      sb('loan_comparison', 55),
      // PAUSE: no events 55s–180s (120s gap)
      sv('loan_selection', 180),
      cta('select_loan', 190),
      doc('apr_disclosure', 195, 15),
      cta('proceed_to_kyc', 215),
      sv('kyc_complete', 230),
      conversion(240),
      sessionEnd(245),
    ],
    expected_scores: { dfi: [50, 70], doi: [40, 60], th: [60, 80], er: [70, 85], cli: [70, 85] },
    expected_aggregate_risk: 'medium',
    expected_nba: {
      action: 'no_op_monitor',
      category: 'Ignore',
      impact_direction: 'None',
      confidence: 0.85,
      effort: 'Low',
      why: 'User recovered from comparison paralysis and completed successfully; transient fatigue resolved',
    },
    sanity_assertions: [
      'DFI and DOI must reflect loop phase but final CLI must be high — user converted',
      'Final NBA should be monitor, not intervene, given completion',
      'Model must detect recovery pattern, not label entire session as high risk',
    ],
    notes: 'Proves model can detect RECOVERY. Users get stuck, then figure it out. Do not punish the entire session for a mid-funnel wobble if they complete.',
    is_bot: false,
  },

  // -------------------------------------------------------------------------
  // GS12 — Dead Funnel (No Meaningful Engagement)
  // -------------------------------------------------------------------------
  {
    trace_id: 'GOLD_012_DEAD_FUNNEL',
    scenario_name: 'Dead funnel / no meaningful engagement',
    intent_tag: 'no_signal',
    funnel_path: 'Session_start → Minimal interaction → Exit',
    events: [
      sessionStart(0),
      sv('home', 2),
      sessionEnd(6),
    ],
    expected_scores: { dfi: [0, 10], doi: [30, 50], th: [40, 60], er: [0, 15], cli: [0, 15] },
    expected_aggregate_risk: 'medium',
    expected_nba: {
      action: 'no_op_monitor',
      category: 'Ignore',
      impact_direction: 'None',
      confidence: 0.3,
      effort: 'Low',
      why: 'Minimal behavioral data; user visited home page briefly and exited; cannot reliably infer cognitive state or recommend intervention',
    },
    sanity_assertions: [
      'Extremely low event count (1-2 events) must produce neutral/low scores across all dimensions',
      'ER and CLI must be LOWEST of all scenarios',
      'NBA must output insufficient evidence — model must NOT hallucinate intent from minimal data',
    ],
    notes: 'No signal scenario. Model must gracefully handle users who barely engage. Do not force insights where none exist.',
    is_bot: false,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getSession(traceId: string): GoldenSession | undefined {
  return GOLDEN_SESSIONS.find(s => s.trace_id === traceId);
}

/** Returns events as CanonicalEvent-compatible array for ingestion tests */
export function sessionToCanonicalEvents(session: GoldenSession, clientId = 'test_client') {
  return session.events.map((e, i) => ({
    event_id: `${session.trace_id}_evt_${i}`,
    trace_id: session.trace_id,
    client_id: clientId,
    user_id: `user_${session.trace_id}`,
    session_id: `sess_${session.trace_id}`,
    timestamp: new Date(Date.now() + e.timestamp_s * 1000).toISOString(),
    event_name: e.event_name,
    funnel_stage: deriveFunnelStage(e.step ?? ''),
    properties: {
      step: e.step,
      dwell_s: e.dwell_s,
      error_type: e.error_type,
    },
    raw_source: clientId,
    raw_event_name: e.event_name,
  }));
}

function deriveFunnelStage(step: string): string {
  if (step.includes('kyc')) return 'KYC';
  if (step.includes('apr') || step.includes('disclosure') || step.includes('terms')) return 'PRICING';
  if (step.includes('loan_option') || step.includes('comparison')) return 'COMPARE';
  if (step.includes('selection')) return 'SELECT';
  if (step.includes('approval') || step.includes('complete')) return 'SUBMIT';
  return 'BROWSE';
}

// ---------------------------------------------------------------------------
// Demo-priority sessions (for Monday demo)
// ---------------------------------------------------------------------------

/** Primary demo: comparison paralysis */
export const DEMO_COMPARISON_PARALYSIS = getSession('GOLD_003_COMPARISON_LOOP')!;

/** Primary demo: rate shock */
export const DEMO_RATE_SHOCK = getSession('GOLD_004_RATE_SHOCK')!;

/** Baseline: healthy user (proves model doesn't over-diagnose) */
export const DEMO_BASELINE = getSession('GOLD_001_HEALTHY_DECISIVE')!;

/** Edge case: bot detection */
export const DEMO_BOT = getSession('GOLD_008_BOT_NOISE')!;
