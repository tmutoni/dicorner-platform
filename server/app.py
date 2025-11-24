from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import uuid
app = FastAPI()

class Event(BaseModel):
    name: str
    timestamp: str
    properties: dict = {}

class ScoreRequest(BaseModel):
    account_id: str
    user_id: str | None
    events: list[Event]

@app.post("/score")
def score(req: ScoreRequest):
    # quick heuristic: more events -> lower risk
    ecount = len(req.events)
    score = max(0.0, min(1.0, 1 - (0.1 * ecount)))
    contributions = [{"feature":"event_count", "value": ecount, "contribution": -0.1*ecount}]
    return {
      "prediction_id": str(uuid.uuid4()),
      "score": score,
      "risk_label": "low" if score < 0.5 else "high",
      "explanation": {"contributions": contributions},
      "generated_at": datetime.utcnow().isoformat()+"Z"
    }
