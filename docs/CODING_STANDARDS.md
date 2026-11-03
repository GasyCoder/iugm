# Coding Standards

## General
- Prefer readable code over clever code.
- Keep changes scoped.
- Remove dead code instead of commenting it out.
- Avoid speculative abstractions.

## Laravel
- Follow Laravel conventions and typed signatures where useful.
- Keep controllers thin.
- Use Form Requests for non-trivial validation.
- Use API Resources for public serialization.
- Use policies/gates for authorization.
- Avoid N+1 queries.
- Use transactions for atomic multi-write workflows.

## Database
- Migrations should be reversible where reasonable.
- Use foreign keys and constraints where appropriate.
- Add indexes for real query patterns.

## Nuxt / Vue
- Use `<script setup lang="ts">`.
- Type props/emits.
- Prefer `computed` over duplicated derived state.
- Avoid unnecessary watchers.
- Prefer Nuxt-native primitives.
- Avoid `any`.

## Components
- Semantic HTML first.
- Visible focus states.
- Buttons perform actions; links navigate.
- Informative images need meaningful alt text.

## Tailwind CSS v4
- Brand values belong in design tokens/theme.
- Avoid arbitrary one-off brand colors.
- Use mobile-first responsive utilities.

## shadcn-vue
- Use Vue-compatible components only.
- Adapt them to IUGM tokens.
- Preserve accessibility behavior.
