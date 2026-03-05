# Backend: DiCorner App Development

- [x] ### ~~Phase 0: Integration, validation \+ Observability (logging, trace, persistence)~~

- [x] ### ~~Phase 1: Scoring \+ Sanity Gates~~

- [ ] ### Phase 2: NBA Engine \+ Domain Rules

- [ ] ### Phase 3: Explainability \+ Dashboard

- [ ] ### Phase 4: Audit \+ Compliance Artifacts\_ Security \+ Ops

### Epic2\_Domain Rule Pack \+ NBA engine

Goal: Turn cognitive scores \+ segments into disciplined, explainable recommendations.

**Step 1: Domain Rules Implementation**

1. Implement `lib/domainSegments.ts`:  
   * `deriveSegments(events: Event[], scores: CognitiveScores): SegmentFlags`  
   * examples:  
     * `rate_sensitive`  
     * `comparison_paralysis`  
     * `kyc_friction`  
     * `early_abandon`  
2. Use simple deterministic thresholds to start (aligned with your spreadsheet).

**Step 2: NBA Engine**

1. Implement `lib/nbaEngine.ts`:  
   * `selectNBA(scores: CognitiveScores, segments: SegmentFlags): NBAAction`  
   * constrained catalog only:  
     * `simplify_options`  
     * `clarify_terms`  
     * `reduce_steps`  
     * `offer_human_help`  
     * `no_op_monitor`  
2. Encode priority rules:  
   * KYC friction \> trust collapse \> comparison paralysis \> healthy baseline.

**Step 3: Wire NBA into Score Path (logs)**

1. In `/api/score`:  
   * compute `cognitive`.  
   * derive `segments`.  
   * call `selectNBA`.  
   * log via `logDecision({ nba, rule_pack_version })`.  
2. Do not yet expose NBA in the external API if not needed; keep it in logs \+ future dashboard.

**Step 4: Golden Sessions Against NBA**

1. For each golden session:  
   * run events → scoring \+ segments \+ NBA.  
   * verify `NBAAction` matches your `expected_nba_action` in the sheet.  
   * adjust thresholds as needed.

Now you have: deterministic scores \+ deterministic NBA tied to cognitive states.

### Checklist\_NBA Engine \+ Domain Rules

- [ ] intervention catalog finalized  
- [ ] rule pack (3–5 flags) implemented  
      - [ ] C1: 3–5 segment flags  
      - [ ] C2: override logic \+ versioning

**AC:** rule overrides prevent unsafe/illogical NBA; rules versioned

- [ ] NBA selection \+ override logic  
      - [ ] D1: constrained action catalog  
      - [ ] D2: ML selection \+ rules override  
      - [ ] D3: ignored/actioned telemetry

**AC:** NBA always returns valid payload; confidence always present; neutral fallback works

- [ ] ignored/actioned tracking