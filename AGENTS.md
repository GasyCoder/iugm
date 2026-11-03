# IUGM Website — Codex Project Instructions

## Goal
Develop and maintain the official IUGM website with a Laravel 13 API backend and a Nuxt/Vue frontend.

## Repository architecture
- Repository root: Laravel 13 backend/API.
- `frontend/`: Nuxt + Vue 3 + TypeScript + Tailwind CSS v4 + shadcn-vue.
- Public API namespace: `/api/v1`.

## Read before editing
For any non-trivial task, inspect the relevant documentation in:
- `docs/ARCHITECTURE.md`
- `docs/CODING_STANDARDS.md`
- `docs/API_CONTRACT.md`
- `docs/UI_SYSTEM.md`
- `docs/TESTING.md`
- `docs/AGENT_WORKFLOW.md`

Read only the documents relevant to the task; avoid loading unnecessary context.

## Repository-wide rules
- Inspect existing implementation before editing.
- Preserve established patterns unless there is a concrete reason to change them.
- Make the smallest coherent change that fully solves the task.
- Never invent official IUGM facts, statistics, programs, fees, admission criteria, dates, or contacts.
- Use `À CONFIRMER PAR L'IUGM` for unverified institutional demo content.
- Never commit secrets, credentials, API keys, private `.env` values, or personal data.
- Do not deploy, push, merge, force-push, or perform destructive database operations unless explicitly requested.

## Backend
- Follow Laravel 13 conventions.
- Thin controllers.
- Form Requests for meaningful validation.
- API Resources for public JSON responses.
- Policies/authorization for protected operations.
- Transactions for atomic multi-write workflows.
- Avoid N+1 queries.
- Add tests for changed behavior.

## Frontend
- Vue 3 Composition API with `<script setup lang="ts">`.
- Strict TypeScript; avoid `any`.
- Nuxt-native SSR/data-fetching patterns.
- Tailwind CSS v4.
- shadcn-vue, not React shadcn/ui.
- Accessible semantic HTML and keyboard-visible focus states.
- Mobile-first.
- Prefer server-rendered content and minimal client JavaScript.

## Verification
Before completion:
- Review `git diff`.
- Run relevant Laravel tests/checks.
- Run relevant frontend type-check/lint/tests.
- Run frontend production build when frontend code changed.
- State exactly which checks passed or could not be run.

## Skills
Reusable Codex skills live under `.agents/skills/`.
Use a skill only when its description matches the task.
