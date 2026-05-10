# Plan: The MVP

## 1. Backend: Therapies & Appointments (Phases 3 & 4)
- Update `backend/src/db/setup.ts` to include `therapies`, `ailment_therapies`, and `appointments` tables.
- Seed mock therapies and map them to existing ailments.
- Implement `GET /api/therapies` in Express.
- Implement `POST /api/appointments` with validation to check if the `therapist_name` is already booked for the given `datetime`.
- Add tests for these new endpoints.

## 2. Backend: Dashboard & Hardening (Phases 5 & 7)
- Implement `GET /api/dashboard/summary` returning counts for agents, open appointments, and ailments.
- Add request logging middleware to Express.
- Ensure error handlers (404, 500) are robust in Express.

## 3. Frontend: Therapies Catalog (Phase 3)
- Create `/therapies` Next.js page fetching and displaying therapies.
- Update global navigation in `layout.tsx` to include Therapies.

## 4. Frontend: Booking Form (Phase 4)
- Update `/agents/[id]/page.tsx` to include an Appointment Booking form (Client Component to handle submission).
- Handle success/error states, including displaying conflict errors from the API.

## 5. Frontend: Staff Dashboard (Phase 5)
- Create `/dashboard` Next.js page.
- Fetch summary data and display stats and upcoming appointments.

## 6. Frontend: Polish & Hardening (Phases 6 & 7)
- Ensure semantic HTML (forms, tables, labels).
- Add Next.js `not-found.tsx` for global 404s.
- Apply consistent PicoCSS spacing and typography.

## 7. Verification
- Run tests and perform end-to-end checks to ensure all MVP features work seamlessly.
