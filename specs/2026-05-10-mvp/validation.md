# Validation: The MVP

## Success Criteria

1. **Therapies**: The `/therapies` page lists therapies.
2. **Booking**: An agent can successfully book an appointment.
3. **Conflict Resolution**: Attempting to book the same therapist at the same time results in a user-facing error.
4. **Dashboard**: The `/dashboard` correctly aggregates system data.
5. **Hardening**: Requests are logged in the backend console. Forms are sanitized.
6. **Stability**: `npm test` passes in `backend/`. Next.js builds successfully.

## Merge criteria
- All MVP features work end-to-end.
- The `mvp` branch passes all automated tests.
