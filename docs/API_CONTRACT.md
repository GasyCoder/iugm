# API Contract

## Base
Use `/api/v1`.

## Principles
- JSON.
- Stable types.
- ISO-8601 dates/timestamps.
- Explicit pagination metadata.
- No stack traces or sensitive internal details.

## Suggested resource shape
```json
{
  "data": {
    "id": 1
  }
}
```

## Suggested collection shape
```json
{
  "data": [],
  "meta": {
    "current_page": 1,
    "per_page": 12,
    "total": 0,
    "last_page": 1
  }
}
```

## Initial endpoint candidates
Implement only when needed:

```text
GET /api/v1/programs
GET /api/v1/programs/{slug}
GET /api/v1/news
GET /api/v1/news/{slug}
GET /api/v1/events
GET /api/v1/events/{slug}
GET /api/v1/partners
POST /api/v1/contact
```

## Rules
- Use API Resources where appropriate.
- Normalize validation errors once on the frontend.
- Coordinate breaking changes with frontend types.
- Do not expose unverified or draft institutional data as official content.
- Keep production CORS restricted to required origins.
