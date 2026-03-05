# Backend: DiCorner App Development

- [x] ### ~~Phase 0: Integration, validation \+ Observability (logging, trace, persistence)~~

- [x] ### ~~Phase 1: Scoring \+ Sanity Gates~~

- [x] ### ~~Phase 2: NBA Engine \+ Domain Rules~~

- [x] ### ~~Phase 3: Explainability \+ Dashboard~~

- [ ] ### Phase 4: Audit \+ Compliance Artifacts\_ Security \+ Ops

### 

1. **sandbox/prod separation \+ security hardening**  
2. **two-stage rollout gates**

### Epic4\_

**Step 2: Compliance Constraints Enforcement**

1. Hard-code constraints into prompt:  
   * engagement only, not creditworthiness.  
   * neutral language.  
   * no protected attributes.  
   * no pricing/approval references.  
2. Add simple response sanitizer:  
   * reject any generated text containing forbidden phrases; fall back to generic structured explanation if needed.

**Step 2: Audit Deck Skeleton**

1. Produce a short internal doc (for fintech compliance / auditors):  
   * Input: canonical schema.  
   * Processing: scoring \+ NBA rules.  
   * Output: ranges, boundaries, fallbacks, logs.  
   * Failure modes \+ circuit breakers.  
   * Example golden sessions.

### Acceptance Criteria

**E1: structured input assembler**  
**E2: nightly batch generation at 2:00 AM**  
**E3: cache \+ 2SD refresh trigger**  
**E4: safety filter \+ banned language checks**  
**E5: non-LLM fallback templates**

**AC: no protected-attribute inference; cached served on failure; 24h cache works**

A complete, auditable, causal, explainable system

- [x] ### ~~Phase 4: Audit \+ Compliance Artifacts\_ Security \+ Ops~~

