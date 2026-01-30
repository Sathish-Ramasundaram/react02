# React02 — Auth Flow Learning Project 🔐

A concise, fundamentals-first React + TypeScript project with a minimal custom build using **Rspack** and styling with **Tailwind CSS**.

This repository demonstrates a simple authentication flow (Login, Register, Forgot Password) and the patterns to build a maintainable React app: routing, context-based auth, controlled forms, validation, accessibility, and component reusability.

---

## 🚀 Quick Overview

- Tech: **React (FC)**, **TypeScript**, **Rspack**, **Tailwind CSS**, **React Router**
- Pages: `Login`, `Register`, `ForgotPassword`, `Dashboard`
- Focus: learn React fundamentals by building small, testable units

---

## ▶️ Quickstart

```bash
# install deps
npm install

# dev server
npm run dev
# build for production
npm run build
# deploy (uses gh-pages)
npm run deploy
```

Live demo: https://Sathish-Ramasundaram.github.io/react02

> Note: dev server runs via `rspack serve` (see `package.json` scripts)

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
- Tailwind utility-first styling
- Minimal, manual build setup (no CRA)

---

## 🧭 Learning Goals

- Understand component + hooks-based design
- Manage global state with Context API
- Build accessible forms (semantic HTML + keyboard support)
- Create reusable inputs/buttons and layout patterns

---

## 🔮 Roadmap / Next Steps

- Extract reusable `Input`, `Button`, `FormContainer` components ✅
- Add token-based auth + protected routes
- Integrate API mock / real backend
- Add validation library (Zod), loading & error states
- Add tests (Jest, React Testing Library) and E2E (Playwright)

---

## Contributing

Small, focused PRs welcome — add a feature, tests, or refactor a page into reusable components. Keep changes isolated and add a short description of the intent.

---

## License

MIT

---

Made for learning React best practices and patterns.
