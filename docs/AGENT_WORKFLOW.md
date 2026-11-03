# Agent Workflow

## Before implementation
For non-trivial work:
1. inspect repository status;
2. read root instructions;
3. read only relevant docs;
4. inspect existing target code;
5. choose the smallest safe implementation;
6. state meaningful assumptions.

## During implementation
- Keep changes focused.
- Do not silently refactor unrelated code.
- Preserve public contracts unless the task requires changes.
- Add/update tests alongside behavior.
- Keep Laravel and Nuxt concerns separated.
- Do not fabricate institutional content.

## Before completion
- inspect diff;
- run relevant checks;
- fix failures caused by the change;
- ensure no secrets/debug artifacts;
- summarize outcome.

## Git
Agents may inspect status/diff/history and edit files.
Do not push, merge, force-push, create releases, deploy, or discard unrelated user changes unless explicitly requested.

## Cross-agent continuity
When a decision materially changes architecture/contracts, update the relevant `docs/` file.
Keep `CLAUDE.md` and `AGENTS.md` concise; put detailed reusable workflows in skills.
