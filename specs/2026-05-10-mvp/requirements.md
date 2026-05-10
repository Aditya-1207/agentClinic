# Requirements: The MVP

## Goal
To ship a Minimum Viable Product (MVP) of AgentClinic by implementing phases 3 through 7 of the roadmap.

## Scope

### In scope
- **Phase 3: Therapies Catalog**: `therapies` table, `GET /api/therapies`, Next.js `/therapies` page, and `ailment_therapies` join table.
- **Phase 4: Appointment Booking**: `appointments` table, `POST /api/appointments` with conflict validation (preventing double-booking a therapist at the same time), and a booking form on the agent detail page.
- **Phase 5: Staff Dashboard**: `GET /api/dashboard/summary` endpoint, Next.js `/dashboard` page displaying counts and tables.
- **Phase 6: Polish & Accessibility**: Consistent PicoCSS styling, keyboard navigation, semantic HTML audit.
- **Phase 7: Hardening**: Error pages, basic input sanitization on form submissions, request logging middleware in Express.

## Decisions
| Decision | Choice | Rationale |
|---|---|---|
| Scope | Phases 3-7 Inclusive | The user mandated that the MVP must be fully feature-complete according to the original roadmap. |
| Scheduling | Conflict Validation | The `POST /api/appointments` endpoint will actively query the database to prevent overlapping appointments for the same therapist. |
| Pattern | Phase 2 Continuation | We will continue using Next.js App Router Server Components, PicoCSS, Express, and better-sqlite3. |
