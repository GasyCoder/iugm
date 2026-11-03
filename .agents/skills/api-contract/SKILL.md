---
name: api-contract
description: Use when creating or changing communication between Laravel and Nuxt, API endpoints, payloads, validation errors, pagination, serialization, or versioning.
---

1. Read `docs/API_CONTRACT.md`.
2. Inspect both Laravel producer and Nuxt consumer.
3. Keep public endpoints under `/api/v1`.
4. Use stable typed JSON shapes.
5. Use API Resources where appropriate.
6. Update frontend TypeScript types when payloads change.
7. Treat breaking changes explicitly.
8. Add backend API tests and relevant frontend coverage.
9. Document material contract changes.
