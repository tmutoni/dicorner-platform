**0\) Executive Summary**

**Product:** Compliance-safe Behavioral Intelligence for fintech funnels

**Value:** Deterministic cognitive scoring \+ interpretable ML \+ disciplined NBA decisioning \+ single LLM narration layer

**Non-negotiable:** LLM narrates only. No scoring, no policy, no action selection.

**1\) Non-Negotiable Stance (Contract-Level)**

**Truth**

You are shipping:

* deterministic cognitive scoring  
* interpretable ML (logistic regression / GBDT), offline trained  
* disciplined decisioning \+ NBA catalog  
* one explainability layer (LLM narration only)  
* compliance-safe behavioral intelligence  
* testable, auditable product

**Hard Boundaries**

* LLM never scores  
* LLM never chooses actions  
* LLM never runs policy logic  
* LLM only narrates cognition \+ rationale from structured inputs

**2\) Positioning (External \+ Internal)**

**Deterministic behavioral intelligence \+ interpretable ML core \+ single explainability layer for clarity.**

Hybrid \= Behavioral Models \+ One LLM Explainability Layer.

**3\) Users \+ Primary Jobs**

**Client-side users**

* **Growth / Product Ops:** monitor funnel frictions; prioritize interventions  
* **Analyst / Data:** validate signals; compare segments; track impact  
* **Compliance / Risk:** auditability, prohibited inference controls, retention/deletion guarantees  
* **Engineering:** integration, reliability, security posture

**Core user job**

Turn raw funnel behavior into **(a)** stable cognitive scores, **(b)** safe recommended action, **(c)** auditable “why”.

**4\) Scope (Phase 1\)**

**In scope**

1. Canonical event schema \+ minimum viable integration  
2. Cognitive scoring (deterministic \+ ML)  
3. Domain rule pack (3–5 flags)  
4. NBA engine (ML+rules) with fixed catalog \+ confidence/effort  
5. Explainability (nightly batch, cached)  
6. Dashboard surfaces: scores, NBA, confidence, trace/audit access  
7. Logging, audit, privacy, rollback/circuit breakers  
8. Two-stage rollout: read-only → controlled enablement

**Out of scope (Phase 1\)**

* real-time retraining  
* streaming training / feature store  
* retrainers / experimentation frameworks  
* bandits / automated A/B test creation  
* causal inference  
* underwriting integration

**5\) Authoritative Architecture**

**User Events → Feature Extraction → Deterministic \+ ML Scoring → Decision Engine → NBA Output → Explainability Layer → Dashboard**

**Component boundaries (enforced)**

* **Scoring Service:** outputs numeric cognitive metrics \+ conversion-likelihood-under-intervention  
* **Decision/NBA Service:** selects action from constrained catalog; rules override stupidity  
* **Explainability Service (LLM):** generates narration from structured inputs only; batch \+ cached  
* **Dashboard:** read-only visualization \+ filters \+ trace drill-down

**6\) Data Integration Requirements**

**Canonical schema**

* Event envelope: event\_name, timestamp, anonymous\_user\_id, session\_id, step, properties{...}  
* Must support: funnel step transitions, repeats, dwell time, backtracks, error states, doc views, exits

**Minimum event set (must-have)**

* step\_view / step\_enter / step\_exit  
* click\_primary\_cta  
* error\_shown (with type)  
* doc\_or\_disclosure\_view  
* session\_end / abandon

**Integration rules**

* map client events → canonical schema  
* no fragile dependencies  
* require only minimum events to function  
* reject/flag malformed events (no silent acceptance)

**7\) Behavioral Scoring (Locked Outputs)**

Compute (per user \+ per step \+ rolling window):

* **Decision Fatigue Index**  
* **Drop-Off Intent**  
* **Trust Health**  
* **Engagement Readiness**  
* **Conversion Likelihood Under Intervention**

Musts

* face-validate sample users  
* monotonic sanity checks (e.g., 0 events ≠ high fatigue)  
* stable output ranges  
* zero undefined outputs  
* deterministic fallback always available

**8\) ML Requirements (Locked)**

**Model class**

* Logistic regression or GBDT  
* Offline trained  
* Feature set locked  
* Stable output ranges  
* Deterministic fallback  
* No neural nets, no streaming training, no feature store, no retrainers, no experimentation framework

**Training data statement (compliance-ready)**

* **Training:** 6 months anonymized behavioral data, 15 SMB clients, 30K+ users  
* **No fintech-specific training data** to avoid domain overfitting  
* **Validation:** 20% holdout, stratified by drop-off stage  
* **Purpose statement:** optimize engagement clarity; not lending decisions

**Confidence calibration (required)**

* Calibrate using **Platt scaling** on validation set  
* Interpretation contract: “0.80 confidence” ≈ correct 80% on similar cases  
* If confidence \< 0.60 → flag for human review / downgrade action category

**Model governance discipline**

* versioned models \+ versioned rule packs  
* change log required  
* pre-deployment sign-off required  
* no silent production changes

**9\) Domain Rule Pack (3–5 flags max)**

Examples

* rate\_sensitive  
* comparison\_paralysis  
* kyc\_friction

Rules scope

* segmentation flags only  
* override layer for unsafe/illogical NBA  
* never expand into dozens of naive flags

**10\) NBA Engine (Automated, Catalog-Constrained)**

**Output format (final)**

{

"action": "…",

"category": "Do Now | Try Experiment | Ignore",

"impact\_direction": "Increase completion | Reduce friction | Increase trust",

"confidence": 0.xx,

"effort": "Low/Medium/High",

"why": "Behavioral rationale"

}

**Decisioning contract**

* intervention catalog is fixed \+ curated  
* ML selects preferred intervention  
* rules override stupidity  
* confidence always output  
* never output trash; otherwise output “Insufficient behavioral evidence…”

**Feedback loop (override tracking)**

* if recommendation viewed but not actioned within 7 days → log recommendation\_ignored  
* track actioned vs ignored by category/segment/step  
* use to refine prioritization (not to silently retrain in Phase 1\)

**11\) Explainability Layer (LLM Narration Only)**

**Operating mode**

* **Batch nightly at 2:00 AM**  
* cached for 24 hours  
* real-time scores show last cached explanation unless behavior changes materially (**\>2 SD from baseline**)

**Safety contract**

* narration only  
* generated from structured inputs: scores, top features, segment flags, NBA selection, rule overrides, disclaimers  
* stored \+ cached  
* no runtime hallucination exposure

**Compliance-safe language rule (enforced)**

* forbid protected attribute inference and socioeconomic labeling  
* descriptions must reference observable behavior only Example:  
* BAD: “low-income…”  
* GOOD: “Viewed APR disclosure 5 times, paused 30+ seconds, exited at pricing step…”

**LLM failure behavior**

* if LLM unavailable → serve cached explanation  
* if no cached explanation → structured fallback text template (non-generative)

**12\) Compliance Contract (Must Be In Docs \+ Said Out Loud)**

* We optimize engagement, not lending decisions.  
* We do not influence approval or pricing.  
* We do not use protected attributes.  
* We maintain human override.  
* We retain complete explainability logs.

**13\) Reliability \+ Security \+ Privacy (Enterprise Adds)**

**Operational guarantees**

* uptime target: **99.5%** for scoring \+ NBA services  
* latency targets:  
  * scoring: **\<300ms** per request  
  * NBA: **\<500ms**  
  * explainability: batch only

**Security posture**

* TLS 1.2+ in transit  
* AES-256 at rest  
* RBAC \+ least privilege  
* logs redact identifiers

**Privacy posture**

* no PII stored unless contractually required  
* behavioral data hashed/anonymized  
* explainability text stored anonymized  
* GDPR/CCPA-friendly framing

**Data retention/deletion**

* default retention: **90 days rolling** (configurable)  
* deletion on request supported  
* compute-only mode possible (if required by client)

**Sandbox vs production separation**

* dedicated sandbox tenant  
* dedicated production tenant  
* no cross-contamination  
* no experimental code in prod

**14\) Audit Trail (Reproducibility Requirement)**

Every score \+ recommendation must be reproducible. Store:

* input features snapshot (or feature hash \+ versioned transform)  
* model version  
* rule pack version  
* NBA output  
* explanation output  
* overrides  
* **trace\_id per decision** (for compliance drill-down)

**15\) Failure & Risk Plan (Never Return Nothing)**

**Fallback hierarchy (contract)**

* LLM fails → structured text fallback (or cached)  
* ML fails → deterministic rule engine continues  
* rules break → default neutral recommendation  
* no insight → “Insufficient behavioral evidence. No forced action recommended.”

**Model rollback circuit breaker**

* if cognitive scores deviate **\>20%** from validation baseline → auto-revert to rule-based scoring  
* alert Tracy \+ client  
* human review required before redeploying ML

**16\) Known Limitations (Declare Upfront)**

* minimum \~50 events/user for reliable scoring (cold start)  
* cannot detect fraud/abuse  
* explanations descriptive, not causal  
* works best for high-traffic funnels (\>1K users/week)

**17\) Measurement & Proof (Credibility, Not Hype)**

Baseline required:

* funnel step drop-off rates  
* conversion post-recommendation exposure  
* time-to-decision change  
* trust behavior signals change (re-reads, backtracks, disclosure dwell)

Rules

* no miracle ROI claims  
* show directional movement \+ confidence bands where possible  
* segment reporting required (don’t hide worst-slice)

**18\) Acceptance Criteria (Definition of Done)**

Done when:

1. pipeline runs stable end-to-end  
2. scores behave logically \+ pass sanity checks  
3. NBA never returns trash; always returns safe output  
4. explanations comprehensible \+ policy-safe  
5. compliance objections are answerable with artifacts (audit, retention, governance)  
6. dashboard communicates confidence \+ traceability

**Execution Plan (Week-by-Week)**

**Week 0–1: Integration \+ Observability**

* event mapping → canonical schema  
* ingestion validation \+ rejection rules  
* logging scaffolding (event/score/decision/override/explanation)  
* trace\_id propagation end-to-end

**Week 1–2: Scoring \+ Sanity Gates**

* deterministic scoring implemented  
* ML scoring implemented \+ calibrated confidence  
* monotonic sanity suite \+ face validation workflow  
* circuit breaker \+ rollback path

**Week 2–3: NBA Engine \+ Domain Rules**

* intervention catalog finalized  
* rule pack (3–5 flags) implemented  
* NBA selection \+ override logic  
* ignored/actioned tracking

**Week 3–4: Explainability \+ Dashboard \+ Readiness**

* nightly batch explainability \+ caching  
* LLM fallback templates  
* dashboard views \+ confidence \+ trace drill-down  
* sandbox/prod separation \+ security hardening  
* two-stage rollout gates

**Backlog (Epics → Deliverables → Acceptance)**

**Epic A: Canonical Data Pipeline**

* A1: event mapper \+ validator  
* A2: canonical storage \+ retention  
* A3: ingestion dashboards (volume, schema errors)**AC:** 99% valid events ingested; invalid events rejected with reason codes

**Epic B: Cognitive Scoring**

* B1: deterministic scoring library  
* B2: ML inference service (LR/GBDT)  
* B3: calibration (Platt) \+ confidence thresholds  
* B4: sanity checks \+ regression tests**AC:** zero NaNs; stable ranges; monotonic gates passing; rollback works

**Epic C: Domain Rules**

* C1: 3–5 segment flags  
* C2: override logic \+ versioning**AC:** rule overrides prevent unsafe/illogical NBA; rules versioned

**Epic D: NBA Engine**

* D1: constrained action catalog  
* D2: ML selection \+ rules override  
* D3: ignored/actioned telemetry**AC:** NBA always returns valid payload; confidence always present; neutral fallback works

**Epic E: Explainability (LLM)**

* E1: structured input assembler  
* E2: nightly batch generation at 2:00 AM  
* E3: cache \+ 2SD refresh trigger  
* E4: safety filter \+ banned language checks  
* E5: non-LLM fallback templates**AC:** no protected-attribute inference; cached served on failure; 24h cache works

**Epic F: Audit \+ Compliance Artifacts**

* F1: trace\_id \+ reproducibility bundle  
* F2: model/rule versioning \+ change log  
* F3: retention/deletion controls  
* F4: compliance contract doc \+ prohibited use statements**AC:** audit query can reproduce any decision; no silent changes

**Epic G: Security \+ Ops**

* G1: TLS, encryption at rest, RBAC  
* G2: sandbox/prod separation  
* G3: SLO monitoring \+ alerts**AC:** meets targets; access audited; alerts trigger on failure modes

**Demo Runbook**

**Demo script (verbatim)**

1. “Here is what users are doing.”  
2. “Here is how their cognition responds.”  
3. “Here is the exact outcome risk.”  
4. “Here is the precise recommended action.”  
5. “Here is why.”  
6. “Here is how we keep you compliant \+ safe.”

**Demo flow (click path)**

* select funnel step → show behavior traces (repeats, dwell, exits)  
* show cognitive scores \+ confidence  
* show NBA output \+ category/effort  
* open trace\_id panel → show model version \+ rule pack version \+ explanation snapshot  
* show compliance statement \+ prohibited inference examples  
* simulate failure toggles:  
  * LLM down → cached \+ structured fallback  
  * ML down → deterministic scoring  
  * rules down → neutral recommendation

