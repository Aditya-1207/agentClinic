# Validation — Phase 1: Hello Express

## How to know this phase succeeded

### 1. TypeScript compiles cleanly

```bash
cd backend
npx tsc --noEmit
```

- **Pass:** Zero errors, zero warnings
- **Fail:** Any TypeScript compilation error

### 2. Dev server starts

```bash
cd backend
npm run dev
```

- **Pass:** Console prints `Server running on http://localhost:3001` and the process stays alive
- **Fail:** Crash, unhandled error, or port conflict

### 3. Route responds with HTML

```bash
curl http://localhost:3001/
```

- **Pass:** Response is HTML containing `Welcome to AgentClinic` and a tagline
- **Fail:** Plain text, 404, or connection refused

### 4. Home page renders in browser

- Open `http://localhost:3001/` in a browser
- **Pass:** Styled page displays with heading, tagline, and clean layout
- **Fail:** Unstyled, broken, or blank page

### 5. Hot reload works

- Edit the heading text in `src/views/home.ts`, save the file
- **Pass:** `ts-node-dev` restarts automatically, refreshing the browser shows the updated text
- **Fail:** Manual restart required

### 6. Automated tests pass

```bash
cd backend
npm test
```

- **Pass:** Vitest runs and reports that the test suite passed successfully.
- **Fail:** Tests fail to run or assertions fail.

### 7. Responsive design works

- Open the browser's developer tools and toggle Device Toolbar (mobile view) or shrink the browser window.
- **Pass:** Header and typography scale down gracefully without horizontal scrolling.
- **Fail:** Elements overflow, header breaks, or text is unreadable on small screens.

## Merge criteria

All seven checks above pass → the branch is ready to merge into `master`.
