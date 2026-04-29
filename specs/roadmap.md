# Roadmap

Phases are intentionally small — each one is a shippable slice of work, independently reviewable and testable.

---

## Phase 1 — Hello Express

- Initialize Node.js project with TypeScript (`tsconfig.json`, `package.json`)
- Install and configure Express with `ts-node-dev` for hot reloading
- Single `GET /` route returning `"AgentClinic is open for business"`
- Confirm TypeScript types compile and the server starts cleanly

## Phase 2 — Hello Next.js

- Initialize a separate Next.js project with TypeScript
- Single landing page at `/` showing "Welcome to AgentClinic"
- Confirm the dev server starts and renders the page in a browser

## Phase 3 — SQLite + Agent List

- Add SQLite to the Express backend (e.g., `better-sqlite3`)
- Create the `agents` table (id, name, model_type, status, presenting_complaints)
- Seed a handful of fictional agents
- `GET /api/agents` endpoint returning all agents as JSON
- Next.js `/agents` page fetching from the API and listing all agents

## Phase 4 — Agent Detail

- `GET /api/agents/:id` endpoint returning a single agent
- Next.js `/agents/[id]` page showing the agent's profile
- Display: name, model type, current status, presenting complaints

## Phase 5 — Ailments Catalog

- `ailments` table + seed data (e.g., "context-window claustrophobia", "prompt fatigue")
- `GET /api/ailments` endpoint
- Next.js `/ailments` list page
- Link agents to one or more ailments via a join table (`agent_ailments`)

## Phase 6 — Therapies Catalog

- `therapies` table + seed data
- `GET /api/therapies` endpoint
- Next.js `/therapies` list page
- Map ailments → recommended therapies via a join table (`ailment_therapies`)

## Phase 7 — Appointment Booking

- `appointments` table (agent_id, therapist_name, datetime, status)
- `POST /api/appointments` endpoint with basic validation
- Booking form on the agent detail page in Next.js
- Confirmation message after successful booking

## Phase 8 — Staff Dashboard

- `GET /api/dashboard/summary` endpoint (counts: agents, open appointments, ailments)
- Next.js `/dashboard` page with summary cards and table views
- Staff can view and manage agent records — Mary's dashboard is now real

## Phase 9 — Polish & Accessibility

- Responsive layout for Steve's modern-browser requirement
- Consistent styling across all pages (typography, color, spacing)
- Semantic HTML audit, keyboard navigation, and focus styles

## Phase 10 — Hardening

- Error pages (404, 500) in both Express and Next.js
- Input sanitization on all form submissions
- Basic request logging middleware in Express

---

Later phases (not yet planned): auth, email notifications, therapist profiles, reporting.
