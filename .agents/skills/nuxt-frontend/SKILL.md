---
name: nuxt-frontend
description: Use when implementing, fixing, refactoring, testing, or reviewing the Nuxt/Vue frontend, TypeScript code, routing, SSR, data fetching, or frontend integration with Laravel.
---

1. Work inside `frontend/` for public UI.
2. Inspect `nuxt.config.ts`, `package.json`, and relevant code before editing.
3. Use Vue 3 Composition API and `<script setup lang="ts">`.
4. Keep TypeScript strict; avoid `any`.
5. Prefer Nuxt-native SSR/data-fetching/runtime-config patterns.
6. Keep server-only values out of client bundles.
7. Centralize Laravel API interaction in reusable abstractions.
8. Handle loading, error, and empty states.
9. Use semantic accessible HTML.
10. Run configured typecheck/lint/tests and production build.
