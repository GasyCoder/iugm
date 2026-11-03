# IUGM Website — Claude Code Instructions

## Project mission
Build the official IUGM (Institut Universitaire de Gestion et de Management, Université de Mahajanga) website as a modern, credible, fast, mobile-first institutional platform.

## Architecture
- Laravel 13 stays at the repository root and is the backend/API.
- Nuxt is the frontend application under `frontend/`.
- Frontend stack: Nuxt + Vue 3 + TypeScript + Tailwind CSS v4 + shadcn-vue.
- Laravel exposes versioned JSON APIs under `/api/v1`.
- Do not mix Blade UI with the Nuxt public website unless explicitly requested.
- Prefer clear API contracts between Laravel and Nuxt.

## Required reading
Before substantial changes, read the relevant project docs:
- @docs/ARCHITECTURE.md
- @docs/CODING_STANDARDS.md
- @docs/API_CONTRACT.md
- @docs/UI_SYSTEM.md
- @docs/TESTING.md
- @docs/AGENT_WORKFLOW.md

## Core implementation rules
- Inspect the existing codebase before changing architecture.
- Reuse existing project patterns before introducing new abstractions.
- Keep changes scoped to the requested task.
- Never invent institutional facts, statistics, programs, fees, contacts, dates, or admission rules.
- Mark missing institutional data as `À CONFIRMER PAR L'IUGM` in seed/demo content.
- Never commit secrets, API keys, credentials, `.env`, production tokens, or private data.
- Never edit generated/vendor files unless required by the framework.
- Do not run destructive database commands against an unknown or production environment.
- Do not deploy, push, force-push, or merge unless explicitly requested.

## Laravel rules
- Follow Laravel 13 conventions.
- Prefer Form Requests for non-trivial validation.
- Prefer API Resources for external JSON representation.
- Keep controllers thin.
- Use policies/authorization for protected actions.
- Use database transactions when a multi-write operation must be atomic.
- Prevent N+1 queries.
- Add indexes for fields used for frequent filtering, joins, or uniqueness.

## Nuxt rules
- Use Vue 3 Composition API and `<script setup lang="ts">`.
- TypeScript should be strict; avoid `any`.
- Prefer Nuxt-native data fetching and SSR-friendly patterns.
- Keep server-only logic out of client bundles.
- Use shadcn-vue when suitable.
- Use Tailwind CSS v4 design tokens instead of scattered arbitrary brand colors.
- No React/Next.js code in this repository.

## UI identity
- Base the visual system on the official IUGM logo.
- Primary identity: institutional blue.
- Secondary accent: IUGM green.
- Neutral white/light surfaces should dominate.
- Do not guess final HEX values if the official logo asset has not been analyzed.
- Visual direction: public university + modern business school + contemporary Madagascar.

## Quality gate
Before declaring implementation complete:
1. Review the diff.
2. Run relevant backend tests/checks.
3. Run relevant frontend type-check/lint/tests.
4. Run the frontend production build for frontend changes.
5. Confirm no secrets or debug artifacts were added.
6. Report what changed, what was tested, and any remaining limitation.

## Agent skills
Use the specialized skills in `.claude/skills/` when the task matches them.
