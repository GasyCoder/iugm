# Testing and Quality Gates

## Laravel
For changed backend behavior, prefer:
- Feature tests for API/workflows;
- Unit tests for isolated domain rules;
- authorization tests;
- validation tests;
- database integrity tests.

Typical checks, only if installed:
```bash
php artisan test
./vendor/bin/pint --test
```

If PHPStan/Larastan exists:
```bash
./vendor/bin/phpstan analyse
```

Inspect `composer.json` first; do not assume tools exist.

## Nuxt
Inspect `frontend/package.json` and run configured scripts.

Typical categories:
```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Do not invent missing scripts.

## UI verification
Check mobile/desktop layout, loading, empty/error states, keyboard focus, form validation, long text, and missing-image behavior.

## Completion report
Every agent should report changed areas, checks run, results, skipped checks, and remaining risks.
