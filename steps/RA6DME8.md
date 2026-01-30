1. Goal (very small)

If user is not logged in
and they visit /dashboard
👉 redirect them to /

2. A protected route means:
Route renders only if a condition is true
Otherwise → redirect
In React Router:
We don’t “block URLs”
We conditionally render elements

3. create src/routes/ProtectedRoute.tsx

mkdir src\routes

type nul > src\routes\ProtectedRoute.tsx

```
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

```
4. Explanation: 
children: ReactNode
This allows usage like:

<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

So ProtectedRoute does not render UI —
it decides whether UI is allowed.

5. Update App.tsx
----
import ProtectedRoute from "./routes/ProtectedRoute";
---
update Dashboard route only:
To: 
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

6. Test

Open /dashboard
You are not logged in

Result:
Redirected to /
Dashboard does NOT render

✔ That proves route protection works
✔ No hacks
✔ Real-world pattern

7. Optional test. Change the value to True and check, it will open dashboard page. 

8. Goal: 
Lazy Loading Routes

Load Dashboard code only when the user visits /dashboard
Not at app startup.
Why this matters:
Faster initial load
Real production pattern
Interview favorite

By default:
React loads all components at once
With lazy loading:
React loads a component only when it’s needed
React gives us two tools:
React.lazy
Suspense

9. 
We will:
Convert Dashboard import to lazy
Wrap it with <Suspense>
Keep ProtectedRoute exactly as-is

10. update App.tsx

Remove this import
❌ import Dashboard from "./pages/Dashboard";

Add this import 

import { lazy, Suspense } from "react";

Add this 

const Dashboard = lazy(() => import("./pages/Dashboard"));

What this means:
Dashboard code is split into a separate chunk
Loaded only when React renders it

11. Wrap with <Suspense>

update From: 
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

To: 
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Suspense fallback={<p>Loading Dashboard...</p>}>
        <Dashboard />
      </Suspense>
    </ProtectedRoute>
  }
/>

React needs a fallback UI while loading.

Why Suspense is required
Lazy components:
are async
may take time to load
So React says:
“While waiting, what should I show?”
That’s the fallback.

12. Test: 

Run the app (make it true for login)
Open /dashboard

Observe:
You briefly see Loading Dashboard...
Then Dashboard appears

✔ Lazy loading works
✔ Route protection still works
✔ No page reload

❌ Do NOT lazy load:
very small components
inputs
buttons
layout wrappers

✅ Lazy load:
routes
heavy pages
charts
dashboards

13. Error Route (404 – Not Found)
If a user goes to:
/random
/abc
/does-not-exist

They should see:
404 – Page Not Found
Instead of a blank screen (default)

14. What we’ll do (minimal)
Create a NotFound page
Add a wildcard route *
Add a link back to Login

---
path="*" → catch-all route

This component is just a normal React component
----

15. create src/pages/NotFound.tsx

type nul > src\pages\NotFound.tsx 

```

import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404
      </h1>

      <p className="mb-6 text-gray-700">
        Page not found
      </p>

      <Link
        to="/"
        className="text-blue-600 hover:underline"
      >
        Go back to Login
      </Link>
    </div>
  );
}

export default NotFound;

```

16. Add route in App.tsx

import NotFound from "./pages/NotFound";

Add this route LAST inside <Routes>: This must come after all other routes.

<Route path="*" element={<NotFound />} />

17. Test: 
Run app
Open:
/abc
/something-random

Expected:
404 page shows
“Go back to Login” works
No page reload

✔ Error route works
✔ Router fallback works

Eg: /abc will be reloaded. 
In a React SPA, direct URL access or refresh causes a full page reload, but navigation via React Router links is handled client-side without reload