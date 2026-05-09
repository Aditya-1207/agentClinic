# Plan — Phase 2: Next.js, SQLite, Agents & Ailments

## 1. Next.js Foundation
- Run `npx create-next-app@latest frontend --typescript --eslint --app --src-dir --import-alias "@/*"` at the project root (do not select Tailwind).
- Install and configure PicoCSS in the frontend.
- Update `frontend/src/app/page.tsx` to display a responsive landing page welcoming users to AgentClinic.
- Start the dev server and ensure the page renders correctly in a browser.

## 2. Backend Database Setup
- Install `better-sqlite3` and `@types/better-sqlite3` in the `backend/` directory.
- Create a `backend/src/db/` directory.
- Write a database initialization script (`setup.ts`) to:
  - Create the `agents` table (id, name, model_type, status, presenting_complaints).
  - Create the `ailments` table (id, name, description).
  - Create the `agent_ailments` join table.
  - Insert mock AI-generated records.
- Run the script to generate `agentclinic.db`.

## 3. Backend API Endpoints
- Implement `GET /api/agents` to return a JSON list of all agents.
- Implement `GET /api/agents/:id` to return details for a single agent.
- Implement `GET /api/ailments` to return the ailments catalog.
- Add Vitest tests for the new API routes.

## 4. Frontend Integration
- Configure proxy or CORS so Next.js can communicate with Express on port 3001.
- Create the `/agents` route in Next.js fetching and listing agents.
- Create the `/agents/[id]` route to show an individual agent's profile.
- Create the `/ailments` route fetching and listing the catalog.
- Apply PicoCSS semantic HTML and layout classes to ensure all new UI components are attractive and responsive.

## 5. Verification
- Run tests and perform end-to-end manual checks to ensure Next.js displays data sourced from the SQLite database.
