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

## 4. Serve a minimal home page

- Create `backend/src/views/home.ts` exporting a function that returns an HTML string
- The HTML page should include:
  - A `<title>` of "AgentClinic"
  - An `<h1>` heading: "Welcome to AgentClinic"
  - A short tagline paragraph: "A wellness clinic for AI agents"
  - Inline `<style>` with basic styling (centered layout, clean font, background color)
- Update `GET /` in `src/index.ts` to return this HTML with `Content-Type: text/html`

## 5. Add dev script

- Add `"dev": "ts-node-dev --respawn --transpile-only src/index.ts"` to `backend/package.json` scripts
- Verify `npm run dev` starts the server with hot reloading

## 6. Verify

- Run `npm run dev` from `backend/`
- Confirm server starts without TypeScript errors
- `curl http://localhost:3001/` returns HTML containing "Welcome to AgentClinic"
- Open `http://localhost:3001/` in a browser and confirm the styled home page renders
