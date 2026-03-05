# Backend: DiCorner App Development

- [x] ### ~~Phase 0: Integration, validation \+ Observability (logging, trace, persistence)~~

- [x] ### ~~Phase 1: Scoring \+ Sanity Gates~~

- [x] ### ~~Phase 2: NBA Engine \+ Domain Rules~~

- [ ] ### Phase 3: Explainability \+ Dashboard

- [ ] ### Phase 4: Audit \+ Compliance Artifacts\_ Security \+ Ops

### Phase 3: Explainability (LLM) \+ Dashboard Readiness 

1. **nightly batch explainability \+ caching**  
2. **LLM fallback templates**  
3. **dashboard views \+ confidence \+ trace drill-down**  
4. **sandbox/prod separation \+ security hardening**  
5. **two-stage rollout gates**

### Epic3\_LLM Explainability \+ Dashboard \+ Full Casual Replay Proof

### **LLM Explainability Layer (Batch Only)**

Goal: Single LLM layer that narrates scores \+ NBA for dashboard use. No scoring, no decisioning.

**Step 1: Explanation Schema**

1. Create `explanations` table:  
   * `id`, `trace_id`, `client_id`, `user_id`, `session_id`,  
   * `nba_json`, `scores_json`, `segments_json`,  
   * `text`, `explanation_version`, `explanation_source`, `generated_at`.  
2. Add `EXPLANATION_LOG` function in `logging.ts` to mirror DB row.

**Step 2: Batch Job**

1. Implement a script or API route (`/api/explain-batch`) that:  
   * scans recent `decisions` (or score logs) without explanations.  
   * for each:  
     * fetches scores \+ segments \+ NBA summary.  
     * calls LLM with a prompt template strictly aligned to compliance constraints.  
     * stores `text` \+ metadata in `explanations` and logs `EXPLANATION_LOG`.  
2. Run this as:  
   * manual trigger now.  
   * future: scheduled (cron) for nightly batch.

### **Dashboard \+ Causal Replay**

Goal: Show the full chain, end-to-end, and prove it.

**Step 1: Internal Dashboard**

1. Create a simple internal page in Next.js:  
   * search by `trace_id` or `user_id`.  
   * show:  
     * events in order.  
     * cognitive scores.  
     * NBA.  
     * explanation text.  
   * bonus: highlight violations if any sanity issues are detected.

**Step 2: Golden Session Replay Harness**

1. Build a script or small internal UI:  
   * select a golden session from your list.  
   * send events to `/api/ingest` or `/api/score`.  
   * automatically fetch logs \+ explanation.  
   * compare to expected ranges \+ expected NBA.  
   * show pass/fail.

### Acceptance Criteria

**E1: structured input assembler**  
**E2: nightly batch generation at 2:00 AM**  
**E3: cache \+ 2SD refresh trigger**  
**E4: safety filter \+ banned language checks**  
**E5: non-LLM fallback templates**

**AC: no protected-attribute inference; cached served on failure; 24h cache works**

