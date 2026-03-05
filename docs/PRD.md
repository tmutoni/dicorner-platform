# Backend: DiCorner App Development

Version: 2.0 Last Updated: February 2026 Owner: Tracy Mutoni Status: Active Development

## **Executive Summary**

DiCorner is a cognitive behavioral intelligence platform that helps SMBs understand why users behave the way they do and what to do about it-in real-time. We don’t just track events; we model decision fatigue, trust breakdowns, and drop-off intent, then provide actionable recommendations with confidence bounds.

Market Position: We’re not another analytics tool. We’re the behavioral decision intelligence layer between raw data and human action.

Current State: Live platform with experimental behavioral scoring APIs, $\\$ 100 \\mathrm{\~K}$ in signed contracts with 2 SMB clients.

Mission: Own the cognition behind behavior and turn it into predictable actions.

## **Problem Statement**

SMBs don’t fail because they lack data. They fail because:

1. They don’t understand WHY users behave the way they do  
* Analytics shows “user viewed pricing 4 x” but not the cognitive state behind it  
* Teams guess at motivations instead of knowing them  
1. They can’t convert behavioral signals into decisions  
* Data sits in dashboards, unused  
* No clear path from insight to action  
* Lack confidence in what intervention to try  
1. They can’t act fast enough or confidently enough  
* By the time they notice a problem, the user has churned  
* No way to predict which interventions will work  
* Fear of making things worse prevents action

## **Current Solutions:**

* Analytics tools (Mixpanel, Amplitude) → Tell you WHAT happened, not WHY  
* Customer data platforms (Segment) → Route data, don’t interpret it  
* A/B testing tools (Optimizely) → Test solutions, don’t generate them

## **DiCorner Solution:**

* Cognitive behavioral scoring → Models the “why” (decision fatigue, trust erosion)  
* Decisioning engine → Converts signals into prioritized recommendations  
* Next Best Action (NBA) engine → Tells teams exactly what to do, with confidence and expected impact

## **Target Users**

## **Primary: SMB Founders / Growth Leads**

* Pain: Overwhelmed by data, unclear on what actions to take  
* Job to be Done: Reduce churn and increase activation without hiring a data science team  
* Success Metric: Revenue retention improvement

## **Secondary: Developer Integrators**

* Pain: Need to implement behavioral intelligence without building from scratch  
* Job to be Done: Get cognitive scoring working in production quickly  
* Success Metric: Time to first score \< 2 hours

## **Tertiary: Product Managers**

* Pain: Can’t prioritize product improvements with confidence  
* Job to be Done: Use behavioral intelligence to inform roadmap  
* Success Metric: Decision velocity increase

# **Scope** 

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

## **OKRs (Objectives & Key Results)**

## **Foundation & Validation**

## **Objective 1: Prove Cognitive Scoring Works**

* KR1: Deploy cognitive scoring for 2 pilot clients with $\<5 \\%$ model drift  
* KR2: Achieve $75 \\%+$ accuracy on drop-off intent predictions (validation set)  
* KR3: Generate $100+$ NBA recommendations with $80 \\%+$ client acceptance rate

## **Objective 2: Ship Production-Grade Platform**

* KR1: 99.5% uptime for scoring API  
* KR2: $\<300 \\mathrm{\~ms}$ p95 latency for scoring endpoint  
* KR3: Zero critical security vulnerabilities in production

## **Objective 3: Validate Business Model**

* KR1: Convert 2 pilot clients to paid contracts ( $\\$ 50 \\mathrm{\~K}+\\mathrm{ARR}$ each)  
* KR2: Generate 10 qualified leads from landing page  
* KR3: Achieve $60 \\%+$ demo-to-pilot conversion rate

## **Scale & Expand**

## **Objective 1: Expand Market Reach**

* KR1: Onboard 5 new paying clients (total 7 )  
* KR2: Launch in 2nd vertical (beyond fintech)  
* KR3: Generate $\\$ 250 \\mathrm{\~K}$ ARR

## **Objective 2: Product Maturity**

* KR1: Expand cognitive metrics from 5 to 8  
* KR2: NBA catalog grows from 10 to 25 intervention types  
* KR3: Enable $\\mathrm{A} / \\mathrm{B}$ testing framework for “Try Experiment” recommendations

## **Objective 3: Build Moat**

* KR1: Publish 2 case studies with measurable outcomes  
* KR2: Open-source cognitive scoring methodology (whitepaper)  
* KR3: $90 \\%+$ customer retention rate

## **Product Architecture**

## **System Components**

## **Hard Boundaries (Non-Negotiable)**

## **LLM Role:**

* Generates explanations (batch, nightly)  
* Translates cognitive scores into readable text  
* X never scores behavior  
* X never chooses actions  
* X never runs policy logic

## **ML Role:**

* Simple models only (logistic regression / GBDT)  
* Offline trained on 6 months historical data  
* Locked feature set  
* Deterministic fallback always available  
* X no neural nets  
* X NO streaming training  
* X no feature stores

## **Core Features**

## **1\. Cognitive Behavioral Scoring**

Five Core Metrics (v0 Range System):

| Metric | Range | Low | Moderate | High | Critical |
| ----- | ----- | ----- | ----- | ----- | ----- |
| Decision Fatigue Index (DFI) | 0-100 | 0-29 | 30-49 | 50-69 | 70-100 |
| Drop-Off Intent (DOI) | 0-100 | 0-24 | 25-44 | 45-64 | 65-100 |
| Trust Health (TH) | 0-100 | 0-39 | 40-59 | 60-79 | 80-100 |
| Engagement Readiness (ER) | 0-100 | 0-29 | 30-54 | 55-74 | 75-100 |
| Conversion Likelihood (CLI) | 0-100 | 0-19 | 20-39 | 40-59 | 60-79+ |

## **Monotonic Sanity Rules:**

* 0 events → all scores $=0$  
* DFI increases with repeated views, backtracking, dwell inflation  
* DOI increases with exit signals, long idle gaps, errors  
* Trust cannot improve without positive signals (doc views, completions)  
* High DFI \+ High ER \= invalid (circuit breaker)  
* Broken Trust \+ High CLI \= invalid (circuit breaker)

## **Properties:**

* V Explainable  
* V Contextual  
* Time-dynamic  
* Slice-aware (segment-specific)

## **2\. Decision Engine**

## **Pipeline:**

Events → Cognitive State Inference → Decision Rules → Recommended Interventions

## **Capabilities:**

* Rule \+ ML hybrid decisioning  
* Confidence bounds on every recommendation  
* Override \+ governance layer (human-in-the-loop)  
* Simulation mode (“What if we intervene?”)

## **Output Schema:**

json

{  
    "user\_id": "user\_456",  
    "account\_id": "acct\_123",  
    "cognitive\_state": {  
        "dfi": 85,  
        "doi": 58,  
        "th": 58,  
        "er": 35,  
        "cli": 72  
    },  
    "risk\_assessment": "high\_churn\_risk",  
    "recommended\_intervention": {  
        "action": "Simplify pricing comparison",  
        "category": "Do Now",  
        "confidence": 0.87,  
        "impact\_direction": "Reduce friction",  
        "expected\_uplift": "+12% conversion",  
        "effort": "Low",  
        "time\_to\_effect": "\<10 minutes"  
    }  
}

## **3\. Next Best Action (NBA) Engine**

## **Three-Tier Recommendation System:**

Do Now (Confidence \>80%, High Impact, Low Effort)

* Immediate action required  
* Pre-approved playbooks  
* Auto-executable (with human gate)  
* Example: “Add inline document format guide”

## **Try Experiment (Confidence 60-80%, Medium Impact)**

* A/B test recommended  
* Measure before scaling  
* Example: “Test rate lock messaging vs. comparison guarantee”

Ignore (Confidence \<60% OR High Effort \+ Low Impact)

* Not worth resources right now  
* Example: “Email drip campaign during active decision fatigue”

## **NBA Output Format:**

json { “action”: “Reduce pricing tiers from 4 to 2”, “category”: “Do Now”, “impact\_direction”: “Reduce friction”, “confidence”: 0.87, “effort”: “Low”, “why”: “User viewed pricing 4x in 10 min without progressing. Signal: comparison paralysis, not disinterest. Psychology: C”expected\_uplift”: “+12-18% conversion”, “time\_to\_effect” : ” \<10 minutes”, “operational\_cost”: “Low” }

Psychological Justification (Moat): Every recommendation includes the cognitive reasoning:

* “Users are stalled due to X”  
* “Do Y because psychology Z”  
* Example: “Choice paralysis \+ cognitive depletion → simplify options”

## **4\. Explainability Layer**

## **Implementation:**

* Batch-generated nightly (2 AM)  
* Cached for 24 hours  
* LLM generates human-readable explanations  
* Compliance-safe language only

## **Example Explanation:**

“Decision Fatigue is Critical (85) due to repeated pricing views and feature comparisons without forward motion. Trust remains Moderate, suggesting intent is present. A simplified comparison view may reduce cognitive overload.”

## **Compliance Contract:**

* X BAD: “User is low-income and may not afford loan”  
* GOOD: “User viewed APR $5 x$, paused $30+$ sec before exit. High cognitive load at pricing. Add FAQ.”

## **Requirements**

## **Functional Requirements**

## **FR-1: Event Ingestion**

* Accept JSON events via POST /v 1 /events  
* Validate schema on ingestion  
* Support minimum 50 events/user for reliable scoring  
* Handle $10 \\mathrm{\~K}+$ events/second (Phase 2 )

**Data Integration Requirements**

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

## **FR-2: Cognitive Scoring**

* Compute 5 cognitive metrics per user/session  
* Return scores within $\<300 \\mathrm{\~ms}$ (p95)  
* Apply monotonic sanity checks  
* Trigger circuit breakers on invalid states

**Behavioral Scoring (Locked Outputs)**

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

## **FR-3: NBA Generation**

* Generate $1-3$ recommendations per user  
* Include confidence, impact, effort, reasoning  
* Support “Do Now / Try Experiment / Ignore” categorization  
* Track recommendation acceptance/rejection

**ML Requirements (Locked)**

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

**Domain Rule Pack (3–5 flags max)**

Examples

* rate\_sensitive  
* comparison\_paralysis  
* kyc\_friction

Rules scope

* segmentation flags only  
* override layer for unsafe/illogical NBA  
* never expand into dozens of naive flags

NBA Engine (Automated, Catalog-Constrained) Output format (final)

`{ "action": "…", "category": "Do Now | Try Experiment | Ignore", "impact_direction": "Increase completion | Reduce friction | Increase trust", "confidence": 0.xx, "effort": "Low/Medium/High", "why": "Behavioral rationale" }`

**Decisioning contract**

* intervention catalog is fixed \+ curated  
* ML selects preferred intervention  
* rules override stupidity  
* confidence always output  
* never output trash; otherwise output “Insufficient behavioral evidence…”

**Feedback loop (override tracking)**

* if recommendation viewed but not actioned within 7 days → log recommendation\_ignored  
* track actioned vs ignored by category/segment/step  
* use to refine prioritization (not to silently retrain)

## **FR-4: Explainability**

* Generate explanations for all scores  
* Cache explanations for 24 hours  
* Fallback to structured text if LLM fails  
* No PII in explanations

**Explainability Layer (LLM Narration Only)**

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

## **FR-5: Dashboard**

* Display cognitive scores with visual indicators  
* Show NBA recommendations with action buttons  
* Provide drill-down into user journey  
* Export data as CSV/JSON

## **FR-6: API**

* RESTful API for all core functions  
* Authentication via API keys  
* Rate limiting (1000 req/hour per key)  
* Webhook support for real-time alerts

## **Non-Functional Requirements**

## **NFR-1: Performance**

* 99.5% uptime SLA  
* $\<300 \\mathrm{\~ms}$ scoring latency (p95)  
* \<500ms NBA generation (p95)  
* Support 1 M events/day

## **NFR-2: Security**

* TLS $1.2+$ for data in transit  
* AES-256 for data at rest  
* Role-based access control (RBAC)  
* No PII stored unless required  
* SOC 2 Type II compliant (Q3 2026\)

## **NFR-3: Privacy**

* GDPR/CCPA compliant  
* Data retention: 90 days default  
* User data deletion on request  
* Anonymized behavioral data only

## **NFR-4: Reliability**

* Automatic failover to rule-based scoring if ML fails  
* Model rollback if drift $\>20 \\%$  
* Circuit breakers on invalid states  
* Comprehensive audit logs

## **NFR-5: Observability**

* Track event logs, score logs, decision logs  
* Monitor model performance drift  
* Alert on anomalies  
* Trace ID for every decision (audit trail)

## **Reliability \+ Security \+ Privacy (Enterprise Adds)**

**Compliance Contract (Must Be In Docs \+ Said Out Loud)**

* We optimize engagement, not lending decisions.  
* We do not influence approval or pricing.  
* We do not use protected attributes.  
* We maintain human override.  
* We retain complete explainability logs.

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

**Audit Trail (Reproducibility Requirement)**

Every score \+ recommendation must be reproducible. Store:

* input features snapshot (or feature hash \+ versioned transform)  
* model version  
* rule pack version  
* NBA output  
* explanation output  
* overrides  
* **trace\_id per decision** (for compliance drill-down)

## **NFR-6 UI components**

1. **Routing \+ shell**  
   * Add app-level layout with top nav and sidebar.  
   * Create routes/pages for: `/signup`, `/login`, `/dashboard`, `/ab-testing`, `/ai-insights`, `/messaging`, `/feedback`, `/manipulate-tests`.  
2. **Auth \+ data layer**  
   * Integrate auth provider (e.g., Supabase/Firebase/Auth0) and protect `/dashboard` and tool pages.  
   * Stand up initial data store for tenants, projects, experiments, and event metrics.  
3. **Dashboard v1**  
   * Implement `dashboard.tsx` main layout (cards \+ charts) using the design we outlined: Drop-off, Decision Fatigue, Churn Rate.  
   * Wire in `data-visualization.tsx` with dummy data first, validating interactions (filters, sort, view/create buttons, icon states).  
4. **Recommendations section**  
   * Add the Recommendations panel under the key metrics with:  
     * impact tier (High/Medium/Low),  
     * estimated effort/time,  
     * metric linkage (which metric it improves),  
     * CTA buttons that deep-link to A/B testing, messaging, or AI insights pages.  
5. **Other surfaces**  
   * Scaffold A/B Testing page (list \+ detail), AI Insights page (model outputs \+ explanations), and Messaging page (copy experiments / variants).  
   * Add Real-time Feedback and Manipulate Test pages as stubs with clear placeholders.  
6. **Instrumentation**  
   * Integrate analytics (GA \+ Clarity or PostHog) to track:  
     * page views,  
     * filter usage,  
     * clicks on recommendations,  
     * navigation between dashboard and experiment pages.  
7. **QA \+ polish**  
   * Cross-browser check, mobile responsiveness.  
   * Basic error states, loading states, and 404/500 pages.  
   * Then push to Vercel main for a full-stack (not just static) iteration.

## **Authoritative Architecture**

**User Events → Feature Extraction → Deterministic \+ ML Scoring → Decision Engine → NBA Output → Explainability Layer → Dashboard**

**Component boundaries (enforced)**

* **Scoring Service:** outputs numeric cognitive metrics \+ conversion-likelihood-under-intervention  
* **Decision/NBA Service:** selects action from constrained catalog; rules override stupidity  
* **Explainability Service (LLM):** generates narration from structured inputs only; batch \+ cached  
* **Dashboard:** read-only visualization \+ filters \+ trace drill-down

## **Failure & Risk Plan (Never Return Nothing)**

**Fallback hierarchy (contract)**

* LLM fails → structured text fallback (or cached)  
* ML fails → deterministic rule engine continues  
* rules break → default neutral recommendation  
* no insight → “Insufficient behavioral evidence. No forced action recommended.”

**Model rollback circuit breaker**

* if cognitive scores deviate **\>20%** from validation baseline → auto-revert to rule-based scoring  
* alert Tracy \+ client  
* human review required before redeploying ML

## **Known Limitations (Declare Upfront)**

* minimum \~50 events/user for reliable scoring (cold start)  
* cannot detect fraud/abuse  
* explanations descriptive, not causal  
* works best for high-traffic funnels (\>1K users/week)

## **Measurement & Proof** 

Baseline required:

* funnel step drop-off rates  
* conversion post-recommendation exposure  
* time-to-decision change  
* trust behavior signals change (re-reads, backtracks, disclosure dwell)

Rules

* no miracle ROI claims  
* show directional movement \+ confidence bands where possible  
* segment reporting required (don’t hide worst-slice)

## **Deliverables**

## **01: MVP (Phase 0-4)**

## **Phase 0: Foundation**

* Event ingestion API (POST/v1/events)  
* Feature extraction pipeline  
* Golden session replay integration (for rapid labeling)  
* Automated labeling pipeline (session outcome → training labels)  
* 3 cognitive metrics (DFI, DOI, TH)  
* Basic rule-based scoring  
* scoring API (POST /v $1 /$ score)

## **Phase 1: Intelligence Layer**

* Train ML models on historical data  
* Add ER and CLI metrics  
* Implement decision engine  
* NBA recommendation generator (v1 catalog: 10 interventions)

## **Phase 2-4: Explainability & Dashboard, Audit, Security**

* V LLM explainability layer (batch)  
* dashboard (scores \+ NBA)  
* Once dash is stable and useful  
  * **Publish OpenAPI formally** and keep it versioned.  
  * **Introduce Kafka/PubSub** between `/api/events` and storage if volume justifies.  
  * **Add a feature store \+ model-serving service** and swap rules-based recs with ML-backed ones.  
  * **Build webhook delivery service** for pushing events/scores out.  
  * **Publish SDKs \+ sandbox**, run load tests, define SLAs.  
  *   
* ✓ API documentation  
* Client onboarding guide  
  * Stand up auth  
  * ensure DB is up and running  
  * Ensure wiring dashboard to real data works  
* Compliance  
* Security, ops

## **Pilot Deployment**

* Deploy to 2 pilot clients  
* Two-stage rollout (read-only → controlled activation)  
* Monitoring \+ alerting setup  
* Feedback collection system

## **02: Scale & Expand (Months 1-3)**

## **Phase 0: Product Maturity**

* Expand NBA catalog to 25 interventions  
* Add A/B testing framework  
* Implement confidence calibration (Platt scaling)  
* Add segment-specific rules (3-5 domain flags)  
* Build client self-service portal

## **Phase 1: Enterprise Features**

* Advanced dashboard with drill-downs  
* Custom alerting rules  
* Webhook integrations (Slack, email, etc.)  
* Multi-user support with permissions  
* SSO (SAML 2.0)

## **Phase 2: Advanced Intelligence** 

## **Phase 3-4: Causal Inference**

* Move beyond correlation to causation  
* Uplift modeling for interventions  
* Counterfactual simulation  
* Attribution analysis

## **Phase 5: Automation & Scale**

* Auto-execution of approved playbooks  
* Multi-armed bandit experimentation  
* Real-time model updates (not retraining)  
* Integration marketplace (Intercom, HubSpot, Salesforce)

## **Roadmap & Bets**

## **Bet 1: Cognitive Metrics Are the Moat (High Confidence)**

Hypothesis: Traditional analytics tools measure WHAT (events), but can’t infer WHY (cognition). If we can reliably model decision fatigue, trust health, and drop-off intent, we own a defensible category.

## **Success Criteria:**

* $75 \\%+$ accuracy on DOI predictions (validation set)  
* Clients report cognitive metrics as “more actionable” than traditional metrics (NPS survey)  
* $2+$ competitors try to copy but fail due to data/methodology gap

## **Risk Mitigation:**

* Publish cognitive scoring methodology (whitepaper) to establish thought leadership  
* Patent key algorithmic innovations  
* Build proprietary training data set ( $30 \\mathrm{\~K}+$ users, 6 months behavioral data)  
* Golden session replay moat: Competitors can’t replicate without equivalent replay infrastructure \+ labeling pipeline

## **Bet 2: NBA Engine Drives Retention (Medium Confidence)**

Hypothesis: SMBs are overwhelmed by dashboards. If we tell them exactly what to do (“Do Now / Try Experiment / Ignore”) with confidence bounds, they’ll act faster and retain better.

## **Success Criteria:**

* $80 \\%+$ acceptance rate on “Do Now” recommendations  
* Clients who act on NBA recommendations have $30 \\%+$ lower churn  
* Time-to-action decreases by $50 \\%$ (baseline: 7 days to act on insight)

## **Risk Mitigation:**

* Track recommendation acceptance vs. rejection (feedback loop)  
* Start with “read-only” mode to build trust  
* Provide override mechanism for every recommendation

## **Bet 3: Compliance-First Positioning Wins Enterprise (Medium Confidence)**

Hypothesis: Fintech/regulated SMBs are paranoid about “AI going rogue.” If we position as audit-ready, deterministic, human-in-the-loop, we’ll win deals competitors can’t.

## **Success Criteria:**

* Win 3+ fintech clients in Q2  
* Zero compliance objections during sales process  
* Compliance documentation becomes sales asset (shared in demos)

## **Risk Mitigation:**

* Get SOC 2 Type II certified by Q3  
* Build audit trail feature (trace ID for every decision)  
* Publish compliance whitepaper

## **Bet 4: Developer-First Go-to-Market (Low Confidence)**

Hypothesis: If we nail developer experience (2-hour integration, excellent docs, code snippets), we’ll get bottom-up adoption within SMBs.

## **Success Criteria:**

* $50 \\%$ of leads come from organic/dev channels (not sales)  
* Time to first score $\<2$ hours (from API key to live scoring)  
* 4.5+ star GitHub repo (if open-source methodology)

## **Risk Mitigation:**

* Invest heavily in docs (Stripe/Anthropic quality)  
* Build interactive API playground  
* Offer free sandbox tier (no credit card)

## **Risks & Mitigation**

## **Technical Risks**

## **Risk 1: Model Drift / Inaccuracy**

* Impact: HIGH \- Clients lose trust if scores are unreliable  
* Likelihood: MEDIUM \- Behavioral patterns change over time  
* Mitigation:  
* Monitor model performance weekly (validation set)  
* Auto-revert to rule-based scoring if drift $\>20 \\%$  
* Require human review before re-deploying ML  
* Set up alerts for anomalies

## **Risk 2: Cold Start Problem**

* Impact: MEDIUM \- Can’t score users with \<50 events  
* Likelihood: HIGH \- Many users won’t have enough data initially  
* Mitigation:  
* Provide “insufficient data” fallback message  
* Use segment-level priors for new users  
* Offer “warming period” guidance (7-14 days)  
* Leverage golden session replays for faster training data collection  
* Build lightweight onboarding scoring (Phase 2\)

## **Risk 3: LLM Hallucination / Bias**

* Impact: CRITICAL \- Compliance risk if explanations are discriminatory  
* Likelihood: LOW \- LLM only narrates, doesn’t decide  
* Mitigation:  
* Batch-generate explanations (not real-time)  
* Cache for 24 hours (no live LLM calls)  
* Compliance review of explanation templates  
* Structured fallback text if LLM fails

## **Risk 4: Latency / Downtime**

* Impact: HIGH \- Clients can’t get scores in real-time  
* Likelihood: LOW \- Robust infrastructure with fallbacks  
* Mitigation:  
* 99.5% uptime SLA with financial penalty  
* Automatic failover to rule-based scoring  
* Edge caching for common score requests  
* Multi-region deployment (Phase 2\)

## **Business Risks**

## **Risk 5: Market Timing \- Too Early**

* Impact: MEDIUM \- Buyers don’t understand “cognitive scoring” yet  
* Likelihood: MEDIUM \- Category creation is hard  
* Mitigation:  
* Lead with outcomes, not technology (“Reduce churn 23%”)  
* Publish case studies with measurable results  
* Educate market via blog, webinars, whitepapers

## **Risk 6: Competitive Response**

* Impact: HIGH \- Mixpanel/Amplitude adds “cognitive metrics” feature  
* Likelihood: LOW \- Requires different data architecture  
* Mitigation:  
* Build proprietary training data moat  
* Patent key innovations  
* Move fast to lock in customers  
* Focus on NBA engine (harder to copy)

## **Risk 7: Customer Concentration**

* Impact: CRITICAL \- If $1-2$ clients $=80 \\%$ revenue, churn is fatal  
* Likelihood: HIGH \- Early stage, small customer count  
* Mitigation:  
* Prioritize customer success (dedicated CSM)  
* Expand to $10+$ clients by Q2  
* Diversify across industries (fintech, SaaS, e-commerce)

## **Risk 8: Sales Cycle Length**

* Impact: MEDIUM \- Enterprise sales take $6+$ months  
* Likelihood: HIGH \- Compliance review adds time  
* Mitigation:  
* Offer pilot program (30-day free trial with data)  
* Provide ROI calculator to justify budget  
* Pre-build compliance documentation (speeds review)  
* Target SMBs with shorter cycles (\<90 days)

## **Operational Risks**

## **Risk 9: Team Capacity**

* Impact: HIGH \- Can’t deliver on roadmap with 1-2 person team  
* Likelihood: HIGH \- Founder doing everything  
* Mitigation:  
* Hire ML engineer (Q1)  
* Hire full-stack engineer (Q2)  
* Outsource non-core work (design, QA)  
* Use no-code/low-code where possible (dashboard)

## **Risk 10: Data Privacy Incident**

* Impact: CRITICAL \- Reputational damage, legal liability  
* Likelihood: LOW \- Strong security posture  
* Mitigation:  
* No PII stored unless required  
* Encrypt everything (TLS $1.2+$, AES-256)  
* Regular security audits (quarterly)  
* Incident response plan documented  
* Cyber insurance policy

## **Success Metrics**

## **North Star Metric**

## **Client Revenue Retention Improvement**

* Track pre/post DiCorner churn rate for each client  
* Goal: $15 \\%+$ improvement in retention within 90 days

## **Leading Indicators**

## **Product Health:**

* Scoring API uptime: $\>99.5 \\%$  
* Scoring latency (p95): \<300ms  
* Model accuracy (validation): $\>75 \\%$  
* NBA acceptance rate: \>80%

## **Customer Health:**

* Weekly active users (client-side): $80 \\%+$ of licenses  
* Recommendations actioned per week: $5+$ per client  
* Time-to-first-value: \<2 hours (API key to first score)  
* NPS: 50+

## **Business Health:**

* MRR growth: $20 \\%+$ month-over-month  
* CAC payback period: \<12 months  
* Gross margin: $\>70 \\%$  
* Logo retention: $\>90 \\%$ annually

## **Open Questions & Assumptions**

## **Assumptions (Need Validation)**

Assumption 1: SMBs care more about “what to do” than “what happened”

* Validation: Survey 20 target customers, ask “Would you pay for actionable recommendations vs. dashboards?”

Assumption 2: 50 events/user is sufficient for reliable scoring

* Validation: Run scoring accuracy analysis at $25,50,100,200$ event thresholds

Assumption 3: Clients will trust AI recommendations with $80 \\%+$ confidence

* Validation: A/B test different confidence thresholds in pilot (70%, 80%, 90%)

Assumption 4: Fintech is the best ICP (vs. SaaS, e-commerce)

* Validation: Run pilots in 2 industries, compare engagement \+ retention

## **Open Questions**

Q1: Should we charge per event or per user?

* Trade-offs: Per event \= usage-based (fair), Per user \= predictable (easier sales)  
* Decision by: End of Q1 pilots

Q2: Do we need a free tier or just free trials?

* Trade-offs: Free tier \= PLG motion, Free trial \= higher intent leads  
* Decision by: Month 2 (after 5 paid clients)

Q3: Should we open-source the cognitive scoring methodology?

* Trade-offs: Thought leadership vs. competitive moat  
* Decision by: Q2 (after patent filing)

Q4: How much human-in-the-loop is required for each NBA category?

* Trade-offs: Safety vs. speed  
* Decision by: After pilot feedback (Week 4\)

## **Appendix**

## **Glossary**

Cognitive Behavioral Scoring: Modeling the psychological state (decision fatigue, trust, intent) behind user behavior, not just event counts.

Decision Engine: System that converts cognitive scores into risk assessments and intervention recommendations.

Next Best Action (NBA): Specific, prioritized recommendation for what to do next, with confidence bounds and expected impact.

Explainability Layer: LLM-powered system that translates cognitive scores into human-readable explanations.

Circuit Breaker: Safety mechanism that reverts to safe defaults when invalid states are detected.

Monotonic Sanity: Property where metrics only increase/decrease in expected directions (e.g., more events → higher fatigue).

## **References**

## **Training Data:**

* 6 months anonymized behavioral data (fintech, b2b SMBs)  
* users, stratified by drop-off stage  
* Golden session replays used for labeling (retention too slow to measure, iterate, and prove value during trial)  
* Automated labeling pipeline: session replay → outcome classification → feature extraction  
* No fintech-specific data (avoid domain overfitting)

## **Why Golden Sessions Matter:**

* Traditional retention measurement takes 30-90 days (too slow for pilot validation)  
* Session replays allow immediate labeling: completed vs. dropped vs. churned  
* Faster iteration: label → train → validate → deploy in days, not months  
* Proves value during trial period without waiting for cohort maturity

## **Model Architecture:**

* Logistic regression for binary outcomes (will drop-off: yes/no)  
* Gradient Boosted Decision Trees (GBDT) for multi-class (which cognitive state)  
* Confidence calibration via Platt scaling

## **Compliance Standards:**

* GDPR (EU): Right to deletion, data portability  
* CCPA (California): Opt-out of data sale, deletion rights  
* SOC 2 Type II (Target: Q3 2026\)

## **Version History**

v1.0 (December 2025\) \- Initial PRD for MVP v2.0 (February 2026\) \- Added OKRs, roadmap bets, risk matrix, Phase $2-3$ plans Next Review: End of Q1 2026 (after pilot completion)

