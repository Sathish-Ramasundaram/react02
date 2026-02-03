
---

## 🟢 Component Based Architecture — ✅ Used

Project is built using multiple reusable components like InputField.
Each feature is split into independent UI blocks.

---

## 🟢 JSX Syntax — ✅ Used

JSX looks like HTML but is actually JavaScript syntax that returns UI.

---

## 🟢 Virtual DOM — ✅ Used 

React uses it internally.
Whenever state/props change, React updates Virtual DOM → diffs → updates real DOM efficiently.

---

## 🟢 Props — ✅ Used

Used to pass data/functions from parent to child.

---

## 🟢 State — ✅ Used

State stores dynamic data inside a component and triggers re-render on change.
Used for form values, errors, loading, auth status.

---

## 🟢 Lifecycle 

useEffect is a **hook that replaces lifecycle methods** in functional components.

It can simulate:

* mount
* update
* unmount (via cleanup)

---

## 🟢 useState — ✅ Used

Stores local component state like email, password, count, loading.

---

## 🟢 useMemo — ✅ Used 

Used to avoid recalculating heavy loop calculations on every render.
Caches computed value based on dependency.

---

## 🟢 useCallback — ✅ Used

Memoizes function reference to avoid unnecessary child re-renders.


---

## 🟢 Functional vs Class Components 


Class component used only for:

✅ ErrorBoundary


> Functional components used everywhere; class component used only for ErrorBoundary.

---

## 🟢 Synthetic Event System — ✅ Used

React wraps browser events into a cross-browser consistent system called Synthetic Events.

---

## 🟢 Event Handlers — ✅ Used

Used onClick, onSubmit, onChange to handle user actions.
Prevents default browser behavior.

---

## 🟢 Event Bubbling & Capturing 


Event bubbling = event travels from child → parent handlers.
Capturing = event travels parent → child first.

---

## 🟢 preventDefault — ✅ Used

Stops default browser behavior like form refresh.
Used in form submit handlers.

---

## 🟢 Controlled Components — ✅ Used

Input value controlled by React state via useState.
React becomes source of truth instead of DOM.

---

## 🟡 Uncontrolled Components — ❌ Not used

You did not use refs for form values — so not used.

---

## 🟢 Forms & Validation — ✅ Used

Handled form submission and validation logic.
Example: password and confirm password match check.

---

## 🟢 React Router — ✅ Used

Client-side routing with BrowserRouter, Routes, Route.

---

## 🟢 Links — ✅ Used

Link navigates without page reload (SPA navigation).

---

## 🟢 Protected Routes — ✅ Used

ProtectedRoute checks auth context and redirects unauthorized users.

---

## 🟢 Lazy Loading — ✅ Used

Used React.lazy + Suspense to load only when needed.

---

## 🟢 Error Routes — ✅ Used

Wildcard route shows 404 page for unknown paths.

---

## 🟢 React DevTools — ✅ Used

Used for inspecting component tree and state.

---

## 🟢 Error Handling — ✅ Used

Used try/catch around async login API calls.

---

## 🟢 Error Boundaries — ✅ Used

Class component catches runtime render errors and shows fallback UI.

Eg: throw new Error("News page crashed");

---

## 🟢 API Integration — ✅ Used

Created loginApi and called it with async/await.


---

## 🔴 REST, GraphQL — ❌ Not used


---

## 🟡 Unit Testing 

Tested slowCalculation manually — not formal test suite.

---

## 🔴 Jest — ❌ Not used

Correct.

---

## 🔴 Storybook / Chromatic — ❌ Not used

Do not claim.

---

## 🟡 shouldComponentUpdate — ❌ Not used

---

## 🟡 PureComponent — ❌ Not used

Equivalent of React.memo — but you used React.memo instead.

---

## 🟢 Context — ✅ Used

Global auth state sharing using AuthContext.

---

## 🔴 Refs — 



---

## 🔴 HOC — 

ProtectedRoute is a wrapper component 
---

## 🔴 Render Props — ❌ Not used

---

## 🔴 SSR — ❌ Not used

---

## 🟡 Accessibility — ⚠️ Basic only

Used semantic elements and labels — basic accessibility.

---

# 🔴 Redux Saga Section — ❌ Not Yet Used
