# React02 – Auth Flow Learning Project

A hands-on learning project built **from scratch** using **React + TypeScript + Rspack + Tailwind CSS**.

This project focuses on **fundamentals-first React learning** by implementing a real-world authentication flow:

* Login
* Register
* Forgot Password
* Dashboard (base)

The goal is not just UI, but **understanding how React actually works**: routing, state, forms, validation, accessibility, and architecture.

---

## 🚀 Tech Stack

* **React (Function Components)**
* **TypeScript**
* **Rspack** (custom bundler setup)
* **Tailwind CSS (v3)**
* **React Router DOM**

---

## 📂 Project Structure

```
src/
 ├── pages/
 │   ├── Login.tsx
 │   ├── Register.tsx
 │   ├── ForgotPassword.tsx
 │   └── Dashboard.tsx
 │
 ├── context/
 │   └── AuthContext.tsx
 │
 ├── App.tsx
 ├── index.tsx
 └── index.css
```

---

## 🧭 Application Flow

1. **Login Page** (`/`)

   * Email + Password form
   * Controlled inputs
   * Basic validation
   * Navigation links

2. **Register Page** (`/register`)

   * Email, Password, Confirm Password
   * Controlled inputs
   * Password match validation
   * Navigation back to Login

3. **Forgot Password Page** (`/forgot-password`)

   * Email input
   * Controlled form
   * Back to Login navigation

4. **Dashboard Page** (`/dashboard`)

   * Base page ready for auth protection

---

## 🎯 React Concepts Covered

### Core React

* Component-based architecture
* JSX syntax (vs HTML)
* Functional components
* Hooks-first approach
* `useState`

### Forms & Events

* Controlled components
* Synthetic events
* `onSubmit`, `onChange`
* `preventDefault`
* Form validation

### Routing

* Client-side routing
* `BrowserRouter`, `Routes`, `Route`
* Navigation with `Link`
* Multiple page flow

### Architecture

* Context API (AuthContext)
* Provider pattern
* Children props
* App-level wrapping

### Accessibility

* Semantic HTML (`form`, `label`, `button`)
* Keyboard submit (Enter key)

---

## 🎨 Tailwind CSS Concepts Used

* Utility-first styling
* Layout (`flex`, `min-h-screen`, `justify-center`)
* Typography (`text-xl`, `font-bold`)
* Spacing (`p-6`, `mb-4`)
* Colors (`text-blue-600`, `bg-gray-100`)
* Forms & buttons styling

---

## ▶️ How to Run the Project

```bash
npm install
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Project Demonstration Guide (Step-by-Step)

### 1️⃣ Login Page

* Open `/`
* Try submitting empty form → see validation
* Enter email + password → success logs
* Navigate to Register / Forgot Password

### 2️⃣ Forgot Password

* Enter email
* Submit without page refresh
* Navigate back to Login

### 3️⃣ Register Page

* Enter mismatched passwords → error shown
* Enter matching passwords → success
* Navigate back to Login

### 4️⃣ Architecture

* Entire app wrapped with `AuthProvider`
* Ready for authentication logic & protected routes

---

## 📌 Learning Focus

This project prioritizes:

* **Understanding over shortcuts**
* **Manual setup instead of CRA**
* **Tiny steps with clear outputs**
* **Real-world patterns**

---

## 🔮 Next Enhancements

* Auth state using Context
* Protected routes (Dashboard)
* API integration
* Lazy loading
* Testing with Jest

---

👨‍💻 Built as a structured React learning exercise.
