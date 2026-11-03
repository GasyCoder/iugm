# Architecture

## Target structure

```text
.
├── app/                       # Laravel backend
├── routes/
├── tests/
├── frontend/                  # Nuxt 4 frontend (srcDir: app/)
│   ├── app/
│   │   ├── assets/css/        # IUGM design tokens (Tailwind v4)
│   │   ├── components/        # iugm/, layout/, ui/ (shadcn-vue), home/…
│   │   ├── composables/
│   │   ├── data/              # typed local prototype data
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/          # data access (local now, /api/v1 later)
│   │   ├── types/
│   │   └── utils/
│   ├── public/
│   ├── nuxt.config.ts
│   └── package.json
├── design/                    # Claude Design reference (local, read-only, not committed)
├── docs/
├── .claude/skills/
├── .agents/skills/
├── CLAUDE.md
└── AGENTS.md
```

Laravel remains at the repository root because it is already installed.

Local development: Laravel on `http://localhost:8000`, Nuxt on `http://localhost:3000`.
The frontend requires Node `^22.22.3` (`frontend/.nvmrc`) and reads the API base URL from
`NUXT_PUBLIC_API_BASE` (see `frontend/.env.example`).

## Responsibility split

### Laravel
Laravel owns persistence, database schema, JSON APIs, validation, authorization, business rules, server-side security, and future admin/authentication services.

Laravel does not own the public website UI.

### Nuxt
Nuxt owns public pages, routing/layouts, SEO/meta, visual components, frontend state, interactions, responsive behavior, and Laravel API consumption.

### Tailwind CSS v4
Tailwind is the styling engine for the Nuxt application.

### shadcn-vue
Use shadcn-vue as a source of accessible composable Vue UI primitives. Adapt it to the IUGM design system.

## API boundary
- Base path: `/api/v1`.
- JSON responses.
- Frontend must not depend on Blade views.
- Material contract changes must be documented.

## Rendering
- Prefer SSR for SEO-relevant public pages.
- Use static/prerender only when justified.
- Use client-only rendering only for interactions that require it.

## Authentication
Do not introduce authentication until a concrete feature requires it.
When first-party Laravel/Nuxt authentication is needed, prefer a design compatible with Laravel Sanctum and secure cookie-based sessions when deployment topology permits it.

## Dependency rule
Before adding a package:
1. define the problem;
2. check native Laravel/Nuxt capability;
3. check existing project abstractions;
4. add the package only when the maintenance trade-off is justified.
