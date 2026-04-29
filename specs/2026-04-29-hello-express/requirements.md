# Requirements — Phase 1: Hello Express

## Goal

Stand up a minimal Express server written in TypeScript that proves the backend toolchain works end-to-end, and serve a minimal AgentClinic home page. No business logic, no database — just a running server with a styled landing page.

## Scope

### In scope

- New `backend/` directory at the repo root containing the Express project
- `package.json` initialized via `npm init`
- TypeScript in strict mode (`"strict": true`)
- Express configured with a single `GET /` route
- `GET /` serves a minimal HTML home page with heading, tagline, and inline styling
- `ts-node-dev` for hot-reloading during development
- Server listens on port `3001` (to avoid collision with Next.js on `3000`)

### Out of scope

- Database, SQLite, or any data layer
- Frontend / Next.js (that is Phase 2)
- Authentication, middleware beyond the basics
- Production build or deployment

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Project directory | `backend/` | Clear separation from future `frontend/` directory |
| Port | `3001` | Avoids default Next.js port `3000` |
| TypeScript strictness | `strict: true` | Catches errors early, aligns with mission for a reliable stack |
| Package manager | `npm` | Standard, no extra tooling needed |
| Dev runner | `ts-node-dev` | Hot reload out of the box, specified in the roadmap |

## Context

- **Mission** — AgentClinic is a wellness platform for AI agents; this phase establishes the backend foundation.
- **Tech stack** — Node.js + TypeScript + Express (see `specs/tech-stack.md`).
- **Stakeholder** — Mary wants a reliable site with a popular TypeScript stack; strict mode and Express deliver on that.
