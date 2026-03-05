# Backend: DiCorner App Development

**v0 range system** that matches cognitive theory, supports monotonic sanity, and won’t collapse when we later ML-optimize.

**Global Rules (Apply to All Metrics)**

* **Range:** 0–100  
* **Direction:** higher \= more of the construct (fatigue, intent, etc.)  
* **Buckets:** Low / Medium / High / Critical  
* **No undefined states**  
* **Deterministic fallback always available**  
* **LLMs never change the score — only describe it**

**1\. Decision Fatigue Index (DFI)**

**What it measures:** Cognitive overload from repeated choices, backtracking, comparisons, and dwell inflation.

**Range semantics:**

| Score | Label | Meaning |
| ----- | ----- | ----- |
| 0–29 | Low | User is cognitively fresh |
| 30–49 | Moderate | Early friction signals |
| 50–69 | High | Decision paralysis forming |
| 70–100 | Critical | User likely to stall or abandon |

**Hard sanity rules:**

* 0 events → DFI \= 0  
* Linear monotonic increase with:  
  * repeated step views  
  * backtracking  
  * long dwell without progress  
* DFI must **never decrease within a session** unless session resets

**2\. Drop-Off Intent (DOI)**

**What it measures:** Probability user will abandon before conversion.

**Range semantics:**

| Score | Label | Meaning |
| ----- | ----- | ----- |
| 0–24 | Low | Strong continuation signals |
| 25–44 | Moderate | Hesitation forming |
| 45–64 | High | Likely to exit without intervention |
| 65–100 | Critical | Imminent abandonment |

**Hard sanity rules:**

* DOI increases with:  
  * session exits without completion  
  * long idle gaps  
  * repeated errors  
* DOI cannot exceed 50 if:  
  * user advances steps recently  
  * primary CTA clicked in last N events

**3\. Trust Health (TH)**

**What it measures:** Confidence in product, fairness, clarity, legitimacy.

**Range semantics (inverse risk):**

| Score | Label | Meaning |
| ----- | ----- | ----- |
| 80–100 | Healthy | Trust intact |
| 60–79 | Mild Risk | Questions forming |
| 40–59 | At Risk | Trust erosion visible |
| 0–39 | Broken | Likely distrust or fear |

**Hard sanity rules:**

* Trust cannot improve without:  
  * disclosure views  
  * documentation views  
  * successful form completions  
* Errors, identity steps, or rate disclosures can reduce trust  
* Trust changes slower than fatigue (lower volatility)

**4\. Engagement Readiness (ER)**

**What it measures:** Willingness to act if given a clear next step.

**Range semantics:**

| Score | Label | Meaning |
| ----- | ----- | ----- |
| 0–29 | Not Ready | Needs clarity or recovery |
| 30–54 | Warming | Responsive to simplification |
| 55–74 | Ready | Strong candidate for intervention |
| 75–100 | Primed | High conversion likelihood |

**Hard sanity rules:**

* ER must be **suppressed** when:  
  * DFI \> 70  
  * Trust \< 40  
* ER can spike after:  
  * comparison completion  
  * doc views followed by forward motion

**5\. Conversion Likelihood Under Intervention (CLI)**

**What it measures:** Probability conversion occurs **if an intervention is applied**.

**Range semantics:**

| Score | Label | Meaning |
| ----- | ----- | ----- |
| 0–19 | Very Low | Intervention unlikely to help |
| 20–39 | Low | High friction remains |
| 40–59 | Medium | Conditional success |
| 60–79 | High | Intervention likely effective |
| 80–100 | Very High | Act now |

**Hard sanity rules:**

* CLI \= 0 if:  
  * Trust \< 30  
* CLI cannot exceed:  
  * ER × (1 − DFI/100)

This enforces causal realism.

**Cross-Metric Consistency Constraints (Critical)**

These prevent nonsense outputs:

* High DFI \+ High ER → **invalid**  
* Broken Trust \+ High CLI → **invalid**  
* Zero events \+ non-zero scores → **invalid**  
* DOI must correlate positively with DFI and negatively with Trust

Violations trigger:

* score clamp  
* explanation flag  
* circuit breaker

**Explainability Contract (What LLMs Are Allowed to Say)**

LLM prompt must reference:

* score bucket (not raw math)  
* dominant drivers (max 3\)  
* 1 compliant intervention

Example:

“Decision Fatigue is **High (68)** due to repeated loan comparisons and backtracking. Trust remains **Moderate**, suggesting intent is present. A simplified comparison view may reduce overload.”

No speculation. No hallucinated causality.

**Why This Works**

* Executives understand it  
* Engineers can test it  
* Sales can explain it  
* ML can later replace internals without breaking semantics

These ranges are **good enough to sell**, **safe enough to deploy**, and **stable enough to evolve**.

Use them now.

