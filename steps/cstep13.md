1. You are using functional components everywhere — which is correct for modern React.
But you must still understand class components because:

✔ ErrorBoundary must be class
✔ older codebases use classes


2. What is class component in simple: 

Instead of : 
function Dashboard() {}

Old React used: 
class Dashboard extends React.Component {}

3. src/components/ClassCounter.tsx
create: 
type nul > src\components\ClassCounter.tsx

```

import React from "react";

type State = {
  count: number;
};

class ClassCounter extends React.Component<{}, State> {
  state: State = {
    count: 0,
  };

  render() {
    return (
      <div className="mt-4 border p-3 rounded">
        <p>Class Count: {this.state.count}</p>

        <button
          onClick={() =>
            this.setState({ count: this.state.count + 1 })
          }
          className="bg-gray-700 text-white px-3 py-1 rounded"
        >
          Class Increment
        </button>
      </div>
    );
  }
}

export default ClassCounter;

```

4. import in Dashboard: 

import ClassCounter from "../components/ClassCounter";


Render anywhere in whitecard: 

<ClassCounter />

5. Functional version:
useState

Class version:
this.state
this.setState

Same behavior — different API.

✅ Prefer functional components
⚠️ Use class only when required (ErrorBoundary)

6. shouldComponentUpdate & PureComponent
These are class-component performance tools — like: React.memo (functional world)

Equivalent in class world: 
PureComponent
shouldComponentUpdate

7. What problems this solve?
Normally:
parent re-render
→ child re-render

Even if props didn’t change ❌
Optimization tools stop unnecessary renders.

8. Tiny Upgrade — Convert ClassCounter → PureComponent

update ClassCounter.tsx:

From: 
class ClassCounter extends React.Component<{}, State> {

To: 
class ClassCounter extends React.PureComponent<{}, State> {


9. What PureComponent Doe
It automatically checks:

old props vs new props
old state vs new state


If same → skip render.

Like:
React.memo for class components


10. 

Optional (Test)
put this top of the render: 
Like

  render() {

  console.log("ClassCounter rendered");


Expected output: 

It does not render when click or types. 


11. shouldComponentUpdate (Manual Version — Just Know)

Lower-level control:

shouldComponentUpdate(nextProps, nextState) {
  return nextState.count !== this.state.count;
}

You manually decide render or skip.
But today:
Prefer PureComponent


12. A Higher Order Component is a function that takes a component and returns a new enhanced component.

Component → wrapped → enhanced component

Like adding a feature layer

13. Create:
src/hoc/withAuthGuard.tsx

mkdir src\hoc

type nul > src\hoc\withAuthGuard.tsx

```

import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function withAuthGuard(Wrapped: React.ComponentType<any>) {
  return function Guarded(props: any) {
    const auth = useContext(AuthContext);

    if (!auth?.isAuthenticated) {
      return <p>Access denied — please login</p>;
    }

    return <Wrapped {...props} />;
  };
}

export default withAuthGuard;

```

14. Wrap Dashboard

import withAuthGuard from "../hoc/withAuthGuard";


-----

export default withAuthGuard(Dashboard);

Temporarily do this in App.tsx for dashboard route: 
becaise flow is:

visit /dashboard
→ ProtectedRoute runs first
→ sees not authenticated
→ redirects to /
→ Dashboard never renders
→ HOC never executes

Execution Order (Important)
Router guard (ProtectedRoute)  ← runs first
Component HOC guard            ← runs second

From: 
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

To: 

<Route
  path="/dashboard"
  element={
    <Suspense fallback={<p>Loading Dashboard...</p>}>
      <Dashboard />
    </Suspense>
  }
/>

Also, check if you put byepass in protectedRoute. 
Byepass what will do - show the access denied or log in screen. 
Without Bypass - show access denied only when no protected route covered App. 
Use bypass if you want in testing purpose

15. Test:

For better visual. Use this in withAuthGuard.tsx

import { Link } from "react-router-dom";


From: 
return <p>Access denied — please login</p>;

To: 

return (
  <div className="fixed inset-0 bg-gray-200 flex items-center justify-center">
    <div className="bg-red-600 text-white p-6 rounded shadow text-center">
      <h2 className="text-xl font-bold mb-2">
        Access Denied
      </h2>

      <p className="mb-4">
        You must be logged in to view this page.
      </p>

      <Link to="/" className="underline font-semibold">
        Go to Login
      </Link>
    </div>
  </div>
);

16. Temporary change in App for ProtectedRouted. Modify Bypass in protectedroute if needed.


17. Render Props Pattern
HOC → wraps component
Render Props → passes a function as child

Different pattern — same goal: reuse logic.
We’ll make a very small, real example using something that fits your app:
👉 login status display logic

18. create src/components/NewsLoader.tsx

```

import { useEffect, useState } from "react";

type News = {
  id: number;
  title: string;
};

type Props = {
  children: (data: News[], loading: boolean) => React.ReactNode;
};

function NewsLoader({ children }: Props) {
  const [data, setData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fake data — no API needed
    setTimeout(() => {
      setData([
        { id: 1, title: "React 19 Released" },
        { id: 2, title: "TypeScript New Features" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return <>{children(data, loading)}</>;
}

export default NewsLoader;

```


19. Open News Page: 
update: 

import NewsLoader from "../components/NewsLoader";



This is for AuthStatus: 
From: Old way
const isAuthenticated = useContext(AuthContext);

To: With Style

   <div className="absolute top-4 right-4 text-right">
        <h1>Auth Status:</h1>
        <p>{isAuthenticated ? 'Logged In' : 'Logged Out'}</p>
      </div>

----

Put another big div and put this below the auth div


      <NewsLoader>
        {(news, loading) => {
          if (loading) return <p>Loading news...</p>;

          return (
            <ul className="space-y-2">
              {news.map((n) => (
                <li key={n.id} className="font-bold text-red-600 text-lg">
                  {n.title}
                </li>
              ))}
            </ul>
          );
        }}
      </NewsLoader>


20. Test: 

This is the props render important line: 
  return <>{children(data, loading)}</>;


21. optional: Add link to news page from dashboard:
import { Link } from "react-router-dom";

-----

<Link
  to="/news"
  className="mt-3 inline-block text-blue-600 underline"
>
  Go to News
</Link>


22. Note: Refreshing news page only shows the current status of Auth. I tried to make it automatic change. But, it was failed and took more time. I will try it after when I gets time. 


23. React Developer Tools:
React DevTools lets you inspect React components, props, state, and context live in the browser.

24.  Install browser extension:
Chrome / Edge / Firefox:
React Developer Tools

Open your app → DevTools → you’ll see new tabs:

Components
Profiler

Click Components
25. 

Open your app → go to Dashboard → click Components tab.

Click:

Dashboard

You will see:

state
props
hooks
context values


You can live see:

count
text
isAuthenticated
profile


Updating as you interact.


26. Before going furture, I have updated in index.tsx to: 
React.StrictMode

  <React.StrictMode>
  <ErrorBoundary>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ErrorBoundary>
  </React.StrictMode>

27. Accessibility in React

Accessibility = making UI usable by:

screen readers
keyboard users
assistive tech

28. 
Just ensure:

label htmlFor === input id

Example (inside your InputField):

<label htmlFor="email">Email</label>
<input id="email" ... />

------

In register page: 
To: 
<label htmlFor="email" className="block mb-1 text-sm">Email</label>
        <input
          id="email"
          type="email"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

You already learned this — now it’s accessibility rule.

29. Tiny Fix 2 — Buttons Must Have Text

Avoid icon-only buttons without label.


30. Tiny Fix 3 — Error Messages Should Be Announced

From: 
<p className="text-red-600">{error}</p>

To: 
<p className="text-red-600" role="alert">
  {error}
</p>

Full in Login.tsx

 {error && <p className="mb-3 text-sm text-red-600" role="alert">{error}</p>}


 This tells screen readers:
announce immediately

Very important for forms.

31. <input required />
Helps assistive tools + browser validation.


Accessibility in React means using proper labels, roles, and ARIA attributes so assistive tools can understand the UI.
