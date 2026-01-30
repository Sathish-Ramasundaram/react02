1. Error Boundaries

If any component crashes at runtime, instead of:
blank screen
broken app
We want:
a friendly fallback UI
This is called an Error Boundary.

2. 
very important rule (don’t skip)

👉 Error Boundaries can ONLY be class components
Even in hook-first apps.
This is one of the few valid reasons class components still exist.

So:
Your app stays functional & hooks-based
Error Boundary is a tiny isolated class

3. 
They catch:
render errors
lifecycle errors
constructor errors

They do NOT catch:
event handlers
async code
errors inside setTimeout
(This is expected behavior.)

4. Tiny Plan: 
Create ErrorBoundary.tsx (class component)
Wrap <App /> with it
Simulate a crash to prove it works

5. Create src/components/ErrorBoundary.tsx

mkdir src\components

type nul > src\components\ErrorBoundary.tsx

```
import { Component, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by ErrorBoundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40 }}>
          <h1>Something went wrong.</h1>
          <p>Please refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

6. Wrap your App. Update index.tsx

import ErrorBoundary from "./components/ErrorBoundary";

--Update Render --

root.render(
  <ErrorBoundary>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ErrorBoundary>
);


Order matters:
ErrorBoundary should be outermost
It protects everything inside

7. Let’s intentionally crash a component.
Add this line at the top of the function:
For now, I add this inside Dasboard.tsx.

throw new Error("Dashboard crashed");

8. Test
if auth is true

Open /dashboard
Expected result:
App does NOT go blank
You see:
Something went wrong.
Please refresh the page.

✔ Error Boundary works
✔ App is protected

If Dashboard or any other page crashes
Error Boundary catches it
Fallback UI shows
App does not break completely

9. Remove the throw new Error(...) line
(It was only for testing.)

10. useMemo

Understand what problem useMemo solves
and why overusing it is a mistake.
We’ll:
Create a slow calculation
See the problem
Fix it with useMemo
See a wrong use case

11. useMemo caches a calculated value
so React doesn’t recompute it on every render.
Important:
It does NOT stop re-renders
It only avoids recalculating expensive logic

12. open Dashboard.tsx

At the top of the file, add:

function slowCalculation(num: number) {
  console.log("Running slow calculation...");
  let result = 0;
  for (let i = 0; i < 1_000_000_000; i++) {
    result += num;
  }
  return result;
}

13. update this 
To: 
import { useContext, useState } from "react";

Inside Dashboard function: ---

function Dashboard() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const calculatedValue = slowCalculation(count);


----Inside Return



      <p>Calculated value: {calculatedValue}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button>

      <br /><br />

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here"
      />

14. Test 
Open /dashboard
Type in the input

What happens?
App feels slow / frozen

Console logs:
Running slow calculation...
every keystroke
❌ Why is this bad?
Because:
Typing changes text
Component re-renders
Slow calculation runs again
Even though count didn’t change

🧠 Key realization (VERY important)
React re-renders the whole component
but not all calculations need to re-run
This is exactly where useMemo helps.

15. Fix it with useMemo
Update import:
To: 
import { useContext, useState, useMemo } from "react";

16. Replace this line:
From: 
const calculatedValue = slowCalculation(count);

To: 
const calculatedValue = useMemo(() => {
  return slowCalculation(count);
}, [count]);

17. 
slowCalculation runs only when count changes
Typing in input no longer triggers it
UI feels smooth
[count] = dependency list
→ “Recalculate only when count changes”

18. Test
Expected Output: 

Type in input
✅ No freezing
✅ No console spam

Click “Increment Count”
✅ Calculation runs
⏳ UI updates with delay