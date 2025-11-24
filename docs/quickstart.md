# DiCorner API Quickstart

## 1. Make your first request

```bash
curl -X POST https://api.dicorner.com/v1/score \
  -H "Authorization: Bearer <YOUR_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "account_id": "acct_demo",
    "events": [
      {
        "name": "session_start",
        "timestamp": "2025-01-01T00:00:00Z",
        "properties": { "device": "web" }
      }
    ]
  }'
