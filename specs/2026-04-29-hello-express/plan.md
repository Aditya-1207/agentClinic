# Plan — Phase 1: Hello Express

## 1. Initialize the project

- Create `backend/` directory
- Run `npm init -y` inside `backend/`
- Install dependencies: `express`
- Install dev dependencies: `typescript`, `ts-node-dev`, `@types/node`, `@types/express`

## 2. Configure TypeScript

- Create `backend/tsconfig.json`
- Enable `"strict": true`
- Set `"outDir": "./dist"` and `"rootDir": "./src"`
- Target `ES2020`, module `commonjs`, `esModuleInterop: true`

## 3. Create the Express server

- Create `backend/src/index.ts`
- Import Express
- Create app, register `GET /` returning `"AgentClinic is open for business"`
- Listen on port `3001`
- Log a startup message to console: `Server running on http://localhost:3001`

## 4. Add a main layout with header/main/footer and external CSS

- Create `backend/public/styles.css` with global styles (reset, typography, colors, layout)
- Serve `backend/public/` as static files via `express.static` in `src/index.ts`
- Create `backend/src/views/header.ts` — exports `renderHeader()` returning a `<header>` with the site name and nav
- Create `backend/src/views/footer.ts` — exports `renderFooter()` returning a `<footer>` with a copyright line
- Create `backend/src/views/layout.ts` — exports `renderLayout(title, content)` that:
  - Returns a full HTML document (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`)
  - Links to `/styles.css` in the `<head>`
  - Wraps `content` inside `<header>` / `<main>` / `<footer>` using the subcomponents
- Update `backend/src/views/home.ts` to return only page-specific content (heading + tagline)
- Update `GET /` in `src/index.ts` to wrap the home content with `renderLayout("AgentClinic", ...)`

## 5. Add dev script

- Add `"dev": "ts-node-dev --respawn --transpile-only src/index.ts"` to `backend/package.json` scripts
- Verify `npm run dev` starts the server with hot reloading

## 6. Verify

- Run `npm run dev` from `backend/`
- Confirm server starts without TypeScript errors
- `curl http://localhost:3001/` returns HTML containing "Welcome to AgentClinic"
- Open `http://localhost:3001/` in a browser and confirm the styled home page renders

## 7. Add Automated Tests

- Create `backend/src/app.ts` that exports the configured Express app.
- Refactor `backend/src/index.ts` to import `app` and start the server (`app.listen()`).
- Install `vitest`, `supertest`, and `@types/supertest` as dev dependencies.
- Add `"test": "vitest run"` script to `backend/package.json`.
- Create `backend/src/app.test.ts` to test that `GET /` returns a 200 OK and HTML containing "Welcome to AgentClinic".
- Run `npm test` to confirm the test passes.
