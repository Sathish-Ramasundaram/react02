# React02 — Auth Flow Learning Project 🔐

A concise, fundamentals-first React + TypeScript project with a minimal custom build using **Rspack** and styling with **Tailwind CSS**.

This repository demonstrates a simple authentication flow (Login, Register, Forgot Password) and the patterns to build a maintainable React app: routing, context-based auth, controlled forms, validation, accessibility, and component reusability.

---

## 🚀 Quick Overview

- Tech: **React (FC)**, **TypeScript**, **Rspack**, **Tailwind CSS**, **React Router**, **Redux + redux-saga**
- Pages: `Login`, `Register`, `ForgotPassword`, `Dashboard`
- Focus: learn React fundamentals by building small, testable units

---

## ▶️ Quickstart

**Requirements**

- Node.js (recommended >= 18)
- npm (or yarn)

```bash
# install deps
npm install

# dev server (Rspack)
npm run dev

# build for production
npm run build

# deploy to GitHub Pages
npm run predeploy && npm run deploy

# run tests
npm test

# start demo API server (in another terminal)
node server/server.js
```

Live demo: https://Sathish-Ramasundaram.github.io/react02

> Note: `npm run dev` uses `rspack serve` (see `package.json` scripts). The demo API runs on http://localhost:4000.

---

## 🧪 Tests & Coverage

- Run tests: `npm test`
- Generate coverage: `npm test -- --coverage` (coverage output is available in the `coverage/` folder)

---

## 🔧 Demo API

The demo API in `server/server.js` provides a minimal auth endpoint used by the app during development.

- Start it with: `node server/server.js`
- Default API port: `4000`
- Demo credentials (used by the app in dev):
  - email: `admin@test.com`
  - password: `1234`

---

## 📂 Project Structure

```
src/
 ├── pages/              # Route pages: Login, Register, ForgotPassword, Dashboard
 ├── context/            # AuthContext + provider
 ├── components/         # (planned) reusable UI components
 ├── App.tsx             # Routing setup
 ├── index.tsx           # App entry
 └── index.css           # Tailwind + global styles
```

---

## ✅ Features

- Controlled forms with basic validation
- Client-side routing and protected route pattern
- `AuthContext` provider (auth state + helper functions)
- **Redux** + **redux-saga** for global state and async flows
- Tailwind utility-first styling
- Minimal, manual build setup (no CRA)

---

## 🧭 Learning Goals

- Understand component + hooks-based design
- Manage global state with Context API
- Build accessible forms (semantic HTML + keyboard support)
- Create reusable inputs/buttons and layout patterns

---

## State management

This project uses **Redux** for global state and **redux-saga** to handle async side-effects. See `src/redux/` (reducers, actions, sagas) and the `news` feature for a concrete example covering API calls, caching, and UI state management.

## Contributing

Small, focused PRs welcome — add a feature, tests, or refactor a page into reusable components. Keep changes isolated and add a short description of the intent.

---

## License

ISC (see `package.json`)

---

Made for learning React best practices and patterns.
