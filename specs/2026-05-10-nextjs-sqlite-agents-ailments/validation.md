# Validation — Phase 2: Next.js, SQLite, Agents & Ailments

## How to know this phase succeeded

### 1. Database Creation
- A local `agentclinic.db` file exists in the backend directory.
- It contains tables for `agents`, `ailments`, and `agent_ailments` populated with mock data.

### 2. API Endpoints
- Hitting `http://localhost:3001/api/agents` returns a valid JSON array of agent objects.
- Hitting `http://localhost:3001/api/ailments` returns a valid JSON array.

### 3. Frontend Rendering
- The Next.js app starts successfully on port 3000.
- Visiting `http://localhost:3000/agents` lists the agents populated from the backend.
- Visiting `http://localhost:3000/agents/1` (or another valid ID) shows the detailed agent profile.

### 4. Responsiveness
- The PicoCSS-styled Next.js pages scale gracefully when viewed on a simulated mobile device screen (using browser dev tools).

### 5. Automated Tests
- Running `npm test` in the backend continues to pass.

## Merge criteria
All the above checks pass, demonstrating full integration between the Next.js frontend, Express API, and SQLite database.
