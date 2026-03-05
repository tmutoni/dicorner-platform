# DiCorner — Cognitive Metrics Index
# Version: v0 (locked)
# DO NOT DEVIATE from these ranges or formulas without PM sign-off

## Global Rules
- All metrics: range [0, 100] (store as 0–100 integers, compute internally as 0.0–1.0 then multiply by 100)
- Direction: higher = more of the construct (more fatigue, more drop-off risk, etc.)
- Zero events → ALL scores = 0, no exceptions
- LLMs never modify scores — narration only
- Deterministic fallback always available

---

## 1. Decision Fatigue Index (DFI)

**What it measures:** Cognitive overload from repeated choices, backtracking, comparisons, dwell inflation.

### Buckets
| Score | Label    | Meaning                        |
|-------|----------|-------------------------------|
| 0–29  | Low      | Cognitively fresh              |
| 30–49 | Moderate | Early friction signals         |
| 50–69 | High     | Decision paralysis forming     |
| 70–100| Critical | Likely to stall or abandon     |

### Formula (deterministic v1.0)
```
stepViews      = count of STEP_VIEW events
backtracks     = count of STEP_BACKTRACK events
optionViews    = count of STEP_VIEW where step contains "option" or "loan_option"

rawDFI = (stepViews / 10) + (backtracks / 5) + (optionViews * 0.05)
DFI    = clamp(rawDFI, 0, 1) * 100
```

### Hard Rules
- 0 events → DFI = 0
- DFI NEVER decreases within a session (monotonic increase)
- Bot detection: if any two consecutive events have timestamp delta < 1s across 5+ events → flag session, return DFI = null

---

## 2. Drop-Off Intent (DOI)

**What it measures:** Probability user will abandon before conversion.

### Buckets
| Score | Label    | Meaning                          |
|-------|----------|----------------------------------|
| 0–24  | Low      | Strong continuation signals      |
| 25–44 | Moderate | Hesitation forming               |
| 45–64 | High     | Likely to exit without intervention |
| 65–100| Critical | Imminent abandonment             |

### Formula (deterministic v1.0)
```
errors        = count of ERROR_SHOWN events
sessionEnds   = 1 if SESSION_END present without CONVERSION_EVENT, else 0
recentForward = 1 if any CLICK_PRIMARY_CTA or STEP_VIEW (non-backtrack) in last 3 events

rawDOI = (errors / 5) + (sessionEnds * 0.3) + (backtracks * 0.08)
DOI    = clamp(rawDOI, 0, 1) * 100
```

### Hard Rules
- DOI CANNOT exceed 50 if user advanced steps recently (recentForward = true)
- Increasing errors must NEVER reduce DOI
- No CONVERSION_EVENT + SESSION_END → apply +0.3 boost

---

## 3. Trust Health (TH)

**What it measures:** Confidence in product, fairness, clarity, legitimacy.

### Buckets (INVERSE — higher is better)
| Score | Label     | Meaning                |
|-------|-----------|------------------------|
| 80–100| Healthy   | Trust intact           |
| 60–79 | Mild Risk | Questions forming      |
| 40–59 | At Risk   | Trust erosion visible  |
| 0–39  | Broken    | Likely distrust or fear|

### Formula (deterministic v1.0)
```
docViews      = count of DOC_OR_DISCLOSURE_VIEW events
completions   = count of CONVERSION_EVENT or CLICK_PRIMARY_CTA:submit_identity
errors        = count of ERROR_SHOWN events

# TH starts at 0.8 (baseline trust)
# Increases with doc views + completions (max +0.2 total)
# Decreases with errors and identity step issues

trustBoost    = min(docViews * 0.04 + completions * 0.05, 0.2)
trustDecay    = min(errors * 0.12, 0.6)

rawTH = 0.8 + trustBoost - trustDecay
TH    = clamp(rawTH, 0, 1) * 100
```

### Hard Rules
- TH CANNOT improve without doc views or completions
- Errors at identity steps carry extra decay (multiply ERROR_SHOWN at kyc step by 1.5)
- More APR doc views (>3) without forward progress → apply -0.1 additional decay (rate anxiety signal)
- TH changes slower than DFI (lower volatility by design)

---

## 4. Engagement Readiness (ER)

**What it measures:** Willingness to act if given a clear next step.

### Buckets
| Score | Label     | Meaning                          |
|-------|-----------|----------------------------------|
| 0–29  | Not Ready | Needs clarity or recovery        |
| 30–54 | Warming   | Responsive to simplification     |
| 55–74 | Ready     | Strong candidate for intervention|
| 75–100| Primed    | High conversion likelihood       |

### Formula (deterministic v1.0)
```
ctaClicks     = count of CLICK_PRIMARY_CTA events
forwardSteps  = count of STEP_VIEW events that are NOT preceded by STEP_BACKTRACK
totalEvents   = count of all events

rawER = (ctaClicks * 0.15) + (forwardSteps / max(totalEvents, 1) * 0.7)
ER    = clamp(rawER, 0, 1) * 100
```

### Hard Rules
- ER MUST be suppressed when DFI > 70 → clamp ER to 29 (high fatigue invalidates readiness)
- ER MUST be suppressed when TH < 40 → clamp ER to min(ER, 40)
- ER can spike after comparison completion + doc views followed by forward motion

---

## 5. Conversion Likelihood Under Intervention (CLI)

**What it measures:** Probability conversion occurs IF an intervention is applied.

### Buckets
| Score | Label     | Meaning                          |
|-------|-----------|----------------------------------|
| 0–19  | Very Low  | Intervention unlikely to help    |
| 20–39 | Low       | High friction remains            |
| 40–59 | Medium    | Conditional success              |
| 60–79 | High      | Intervention likely effective    |
| 80–100| Very High | Act now                          |

### Formula (deterministic v1.0)
```
CLI_raw = (ER / 100) * (1 - DFI / 100)
CLI     = clamp(CLI_raw, 0, 1) * 100
```

### Hard Rules
- CLI = 0 if TH < 30 (broken trust → intervention won't help)
- CLI CANNOT exceed ER × (1 − DFI/100) — this enforces causal realism
- Broken Trust (<40) + CLI > 40 → clamp CLI to 0

---

## Cross-Metric Consistency Constraints

These prevent nonsense outputs. Violations trigger score clamp + circuit breaker log.

| Constraint | Rule |
|------------|------|
| High DFI + High ER | DFI > 70 AND ER > 55 → clamp ER to 29 |
| Broken Trust + High CLI | TH < 40 AND CLI > 40 → clamp CLI to 0 |
| Zero events | All scores = 0, no exceptions |
| DOI cap | DOI ≤ 50 if recentForward = true |
| Bot pattern | Timestamps < 1s delta across 5+ events → flag, return null scores |

---

## Circuit Breaker

If ANY output is NaN, Infinity, undefined, or outside [0, 100] after clamping:
- Log `fallback_used: true` with `model_version`
- Return neutral safe set: `{ dfi: 50, doi: 50, th: 50, er: 50, cli: 0 }`
- Never return nothing

---

## Explainability Contract (LLM narration only)

LLM prompt MUST reference:
- Score bucket label (not raw number alone)
- Dominant drivers (max 3)
- 1 compliant intervention suggestion

**GOOD:** "Decision Fatigue is Critical (85) due to repeated loan comparisons and backtracking. Trust remains Moderate, suggesting intent is present. A simplified comparison view may reduce overload."

**BAD:** Any reference to income, demographics, protected attributes, creditworthiness, or approval likelihood.
