# Backend: DiCorner App Development

## Roadmap and Strategy

- [x] ### ~~Phase 0: Integration, validation \+ Observability (logging, trace, persistence)~~

- [ ] ### Phase 1: Scoring \+ Sanity Gates

- [ ] ### Phase 2: NBA Engine \+ Domain Rules

- [ ] ### Phase 3: Explainability \+ Dashboard

- [ ] ### Phase 4: Audit \+ Compliance Artifacts\_ Security \+ Ops

      

### Phase 1: Scoring \+ Sanity Gates

1. **deterministic scoring implemented**  
2. **ML scoring implemented \+ calibrated confidence**  
3. **monotonic sanity suite \+ face validation workflow**  
4. **circuit breaker \+ rollback path**

## Phase1\_Epic 1: Deterministic Cognitive Scoring

Goal: Deterministic scoring that respects your cognitive model and passes golden session expectations. No ML yet.

**Step 1: Scoring Module**

1. Implement `lib/behavioralScoring.ts` with:  
   * `computeCognitiveScores(events: Event[]): CognitiveScores`  
   * DFI, DOI, TH, ER, CLI in \[0,1\]  
   * `clamp01`, `safeDiv` helpers.  
2. Features from events:  
   * counts: step views, backtracks, errors, doc views.  
   * simple dwell proxies if you have timestamps.

**Step 2: Plug Scoring into `/api/score`**

1. Replace the toy “event\_count \* 10” with:  
   * `const cognitive = computeCognitiveScores(events)`  
   * derive 0–100 `score` from these metrics (e.g., weighted sum).  
   * set `risk_label` from `score`.  
2. Update `explanation.contributions` to show:  
   * decision\_fatigue  
   * drop\_off\_intent  
   * trust\_health  
   * engagement\_readiness  
   * conversion\_likelihood\_under\_intervention

**Step 3: Golden Session Check (Manual First)**

1. For each synthetic golden session:  
   * POST its events to `/api/score`.  
   * Capture the cognitive scores.  
2. Compare against your expected ranges:  
   * If way off, adjust heuristics.  
   * Preserve monotonic behavior.

**Step 4: Monotonic Sanity Tests (Code)**

1. Add a small test file or script that:  
   * constructs synthetic event sets for a subset of golden patterns.  
   * asserts:  
     * more backtracks → DFI does not decrease.  
     * more errors → DOI does not decrease.  
     * more disclosure views at APR → TH does not increase.  
     * healthy straight path → DFI and DOI stay low, TH high.  
2. Run this locally before deploys.

**Step 5: Circuit Breaker Skeleton**

1. Add a wrapper:  
   * `safeComputeCognitiveScores(events)`:  
     * call `computeCognitiveScores`.  
     * if any output is NaN, outside \[0,1\], or fails sanity:  
       * log `fallback_used: true`.  
       * return a neutral or deterministic simple score set.

You now have deterministic, bounded, explainable scoring with basic safety.

### Checklist\_Scoring

- [ ] B1: deterministic scoring library  
- [ ] B2: ML inference service (LR/GBDT)  
- [ ] B3: calibration (Platt) \+ confidence thresholds  
- [ ] B4: sanity checks \+ regression tests

**AC:** zero NaNs; stable ranges; monotonic gates passing; rollback works

