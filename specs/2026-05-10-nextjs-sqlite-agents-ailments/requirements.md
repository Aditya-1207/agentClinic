# Requirements — Phase 2: Next.js, SQLite, Agents & Ailments

## Goal
Establish the frontend application using Next.js (App Router) and PicoCSS, and introduce a persistent SQLite database to the Express backend to manage Agents and their Ailments.

## Scope

### In scope
- Initialize a new `frontend/` directory with a Next.js project (TypeScript, App Router, PicoCSS).
- Create a basic responsive landing page in Next.js (`/`).
- Install and configure `better-sqlite3` in the `backend/` project.
- Create database tables: `agents`, `ailments`, and a join table `agent_ailments`.
- Seed the database with AI-generated mock data (e.g., fictional agents, tech ailments like "context-window claustrophobia").
- Create REST endpoints in Express: `GET /api/agents`, `GET /api/agents/:id`, and `GET /api/ailments`.
- Create UI pages in Next.js to consume the API: `/agents`, `/agents/[id]`, and `/ailments`.

### Out of scope
- Authentication or user sessions.
- Modifying data via the UI (e.g., no POST/PUT requests for agents or ailments yet).
- Therapy or Appointment Booking features (these are future phases).

## Decisions
| Decision | Choice | Rationale |
|---|---|---|
| Frontend Framework | Next.js (App Router) | Modern, fast, full-stack React framework requested by the project. |
| Styling | PicoCSS | Minimal, semantic CSS framework that looks great out of the box without utility-class clutter. |
| Database | `better-sqlite3` | Synchronous, fast, simple file-based database for the Node.js backend. |
| Mock Data | AI-generated | Fictional but realistic data ensures the UI can be properly tested and demoed. |

## Context
Phase 1 established our basic Express server and test harness. Phase 2 introduces the actual user-facing application (Next.js) and the foundational data models (SQLite) needed to power AgentClinic.
