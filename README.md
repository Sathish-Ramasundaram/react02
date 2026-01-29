# React02 – Auth Flow Learning Project

A hands-on learning project built **from scratch** using **React + TypeScript + Rspack + Tailwind CSS**.

This project focuses on **fundamentals-first React learning** by implementing a real-world authentication flow:

- Login
- Register
- Forgot Password
- Dashboard (base)

The goal is not just UI, but **understanding how React actually works**: routing, state, forms, validation, accessibility, and architecture.

---

## 🚀 Tech Stack

- **React (Function Components)**
- **TypeScript**
- **Rspack** (custom bundler setup)
- **Tailwind CSS (v3)**
- **React Router DOM**

---

## 📂 Project Structure

```
src/
 ├── pages/                  # Page-level components (routes)
 │   ├── Login.tsx
 │   ├── Register.tsx
 │   ├── ForgotPassword.tsx
 │   └── Dashboard.tsx
 │
 ├── context/                # Context providers (global state)
 │   └── AuthContext.tsx
 │
 ├── App.tsx                 # Root app component with routing
 ├── index.tsx               # Entry point
 └── index.css               # Global styles
```

### Future Structure (Reusable Components)

As the project grows, we'll add:

```
src/
 ├── components/             # Reusable UI components
 │   ├── Form/
 │   │   ├── Input.tsx
 │   │   ├── Button.tsx
 │   │   └── FormContainer.tsx
 │   ├── Layout/
 │   │   └── AuthLayout.tsx
 │   └── Common/
 │       ├── Header.tsx
 │       └── Footer.tsx
 │
 ├── hooks/                  # Custom React hooks
 │   └── useForm.ts
 │
 └── types/                  # TypeScript type definitions
     └── index.ts
```

---

## 🧭 Application Flow

1. **Login Page** (`/`)
   - Email + Password form
   - Controlled inputs
   - Basic validation
   - Navigation links

2. **Register Page** (`/register`)
   - Email, Password, Confirm Password
   - Controlled inputs
   - Password match validation
   - Navigation back to Login

3. **Forgot Password Page** (`/forgot-password`)
   - Email input
   - Controlled form
   - Back to Login navigation

4. **Dashboard Page** (`/dashboard`)
   - Base page ready for auth protection

---

## 🎯 React Concepts Covered

### Core React

- Component-based architecture
- JSX syntax (vs HTML)
- Functional components
- Hooks-first approach
- `useState`

### Forms & Events

- Controlled components
- Synthetic events
- `onSubmit`, `onChange`
- `preventDefault`
- Form validation

### Routing

- Client-side routing
- `BrowserRouter`, `Routes`, `Route`
- Navigation with `Link`
- Multiple page flow

### Architecture

- Context API (AuthContext)
- Provider pattern
- Children props
- App-level wrapping

### Accessibility

- Semantic HTML (`form`, `label`, `button`)
- Keyboard submit (Enter key)

---

## 🔧 Reusable Components Best Practices

This project teaches component reusability patterns:

### Input Component

- Extract controlled input logic
- Props for validation, placeholder, error messages
- Reuse across Login, Register, Forgot Password

### Button Component

- Consistent styling via Tailwind
- Props for type, disabled state, loading state
- Single source of truth for button behavior

### Form Layout

- DRY (Don't Repeat Yourself) principle
- Shared form container styling
- Error display patterns

### Example Pattern

```tsx
// Instead of repeating this in each page:
<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full px-4 py-2 border rounded"
/>

// Create a reusable Input component:
<Input
  type="email"
  value={email}
  onChange={setEmail}
  error={emailError}
/>
```

---

## 🎨 Tailwind CSS Concepts Used

- Utility-first styling
- Layout (`flex`, `min-h-screen`, `justify-center`)
- Typography (`text-xl`, `font-bold`)
- Spacing (`p-6`, `mb-4`)
- Colors (`text-blue-600`, `bg-gray-100`)
- Forms & buttons styling

---

## ▶️ How to Run the Project

### Local Development

```bash
npm install
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

Output: `dist/` folder ready for deployment

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will build and push to GitHub Pages (configured in `package.json` → `"homepage"`)

Live: [https://Sathish-Ramasundaram.github.io/react02](https://Sathish-Ramasundaram.github.io/react02)

---

## 🧪 Project Demonstration Guide (Step-by-Step)

### 1️⃣ Login Page

- Open `/`
- Try submitting empty form → see validation
- Enter email + password → success logs
- Navigate to Register / Forgot Password

### 2️⃣ Forgot Password

- Enter email
- Submit without page refresh
- Navigate back to Login

### 3️⃣ Register Page

- Enter mismatched passwords → error shown
- Enter matching passwords → success
- Navigate back to Login

### 4️⃣ Architecture

- Entire app wrapped with `AuthProvider`
- Ready for authentication logic & protected routes

---

## 📌 Learning Focus

This project prioritizes:

- **Understanding over shortcuts**
- **Manual setup instead of CRA**
- **Tiny steps with clear outputs**
- **Real-world patterns**

---

## 🔮 Next Enhancements

### Phase 1: Component Reusability

- Extract `Input`, `Button`, `FormContainer` components
- Create `Layout` wrapper for consistent styling
- Build component library

### Phase 2: State & Auth

- Auth state using Context API
- Protected routes (Dashboard)
- Token management

### Phase 3: Advanced Features

- API integration
- Form validation library (e.g., Zod)
- Error boundaries
- Loading states
- Toast notifications

### Phase 4: Optimization & Testing

- Code splitting & lazy loading
- Unit testing with Jest
- Component testing with React Testing Library
- E2E testing with Playwright

---

👨‍💻 Built as a structured React learning exercise.
