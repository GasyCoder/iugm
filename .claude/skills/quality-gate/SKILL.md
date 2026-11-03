---
name: quality-gate
description: Use before declaring a coding task complete, or when asked to test, review, validate, audit, or verify the IUGM repository.
---

1. Inspect `git status` and relevant diff.
2. Identify changed backend/frontend surfaces.
3. Run targeted tests first.
4. Run installed formatter/static checks.
5. For frontend changes, run configured typecheck/lint/tests and build.
6. Check for secrets, debug code, generated junk, and unrelated changes.
7. Review accessibility for changed UI.
8. Review query/performance risks for changed backend code.
9. Confirm no official IUGM facts were fabricated.
10. Report checks, results, skipped checks, and remaining risk.
