1. React apps are built using small reusable components instead of one big file.

We split into:
LoginForm.tsx
InputField.tsx
Button.tsx
ErrorMessage.tsx

Each = one responsibility.

2. src/components inside this create: InputField.tsx

```
type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
};

function InputField({ label, value, onChange, type = "text" }: Props) {
  return (
    <div className="mb-3">
      <label className="block mb-1 text-sm">{label}</label>

      <input
        type={type}
        className="w-full border px-3 py-2 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default InputField;

```

3. Virtual DOM: 
Theory: 
Normal: state change → update whole DOM ❌ (slow)

React does: state change → update Virtual DOM → compare → update only changed part ✅

You type a letter
→ state updates
→ component re-renders
→ React compares Virtual DOM
→ Only input value updates
→ NOT whole page
Only the changed node updates — not the full UI.

That’s why React feels fast.

4. Props = data passed from parent component → child component

Login.tsx

import InputField from "../components/InputField";

Replace from: 
        <div className="mb-3">
          <label className="block mb-1 text-sm">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>


To: 

<InputField
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
/>

For password:

To:

<InputField
  label="Password"
  type="password"
  value={password}
  onChange={setPassword}
/>


5. What just happened (important)

Parent = Login.tsx
Child = InputField.tsx

Parent passed:

label
type
value
onChange

Child received them as props
That is Props usage.


6. State = data stored inside a component that can change and cause re-render

In your Login form:

User types
→ onChange runs
→ setEmail(newValue)
→ state changes
→ component re-renders
→ input shows new value

That loop = state-driven UI.

7. Lifecycle (Hooks-First — Tiny Step)
In old React (class components), we had lifecycle methods like:

componentDidMount
componentDidUpdate
componentWillUnmount

In modern React (your project style), we use:
useEffect

to handle lifecycle behavior.

How to verify: Add this in Login

import { useEffect } from "react";

Add inside component:

useEffect(() => {
  console.log("Login component mounted");
}, []);

Add this below your mount effect:

useEffect(() => {
  console.log("Email state changed:", email);
}, [email]);

Add this: 
useEffect(() => {
  return () => {
    console.log("Login component unmounted");
  };
}, []);


Life Cycle in Hook: 
Mount → useEffect(fn, [])
Update → useEffect(fn, [deps])
Unmount → cleanup return () => {}


Expected Output: 

Login component mounted
Email state changed: 
Email state changed: a
Email state changed: ad
Email state changed: adb
Email state changed: adbd
Email state changed: adbde
Login component unmounted

While first come to this page or refresh, 
Login component mounted
Email state changed: 

After typing email: 
Email state changed: a
Email state changed: ad
Email state changed: adb
Email state changed: adbd
Email state changed: adbde

After clicking register link or forgot password link: 
Login component unmounted

Why initially it is showing "Email state changed: " as well. Because, initially we gave the value "" empty string for Email. 

8. Event Bubbling: 

It travels upward to parent elements.
Child clicked
→ parent handler runs
→ grandparent handler runs
This is called bubbling.
Default behavior in browsers AND React.

Event bubbling means events propagate from child to parent unless stopped.
Example: If we have button inside div element. If we click button, div elemeent also fire.
We can stop div from fire using stopPropogation

9. Event Capturing

Capturing = reverse order:
Parent first
→ child next


10. Prevent default: 
Common ways: 
event.preventDefault();

<Link to="/dashboard">
React Router prevents default navigation and does client routing.

This is html way. But page reload. 
<a href="/dashboard">
→ full page reload

11. useCallback: 

useMemo → memoize VALUES
useCallback → memoize FUNCTIONS

12. Add Child Demo Component (top of file, above Dashboard)

Add this above function Dashboard():

function ChildDemo({ onAction }: { onAction: () => void }) {
  console.log("ChildDemo rendered");

  return (
    <button
      onClick={onAction}
      className="mt-3 bg-purple-600 text-white px-3 py-1 rounded"
    >
      Child Action
    </button>
  );
}

-------

Add TWO handlers inside Dashboard

Add inside Dashboard (near your other state):

// normal function (new every render)
const normalHandler = () => {
  setCount(c => c + 1);
};

// memoized function (stable reference)
const memoHandler = useCallback(() => {
  setCount(c => c + 1);
}, []);


----

Render both buttons (inside white card div)

Add below your existing Increment button:

<ChildDemo onAction={normalHandler} />
<ChildDemo onAction={memoHandler} />


13. Test: 

Both re-render right now — that’s expected.


14. Wrap ChildDemo with React.memo

import React from "react";


From: 
function ChildDemo({ onAction }: { onAction: () => void }) {

To: 
const ChildDemo = React.memo(function ChildDemo(
  { onAction }: { onAction: () => void }
) {


And end with );    (--------------- });----------)



15. Open Dashboard → type in the text input.

Watch console.
You should now see:
ChildDemo rendered   ← only ONE repeats

Not two.

That is the real purpose of:
useCallback + React.memo
working together.

React.memo prevents re-render when props are unchanged; useCallback helps keep function props stable.

16. useCallback — When NOT to Use

useCallback should be used only when passing handlers to memoized children to prevent unnecessary re-renders.

17. useRef — Remember Previous Value
useRef can store a value that:

✔ persists between renders
✔ does NOT cause re-render
✔ remembers previous value


This is a very common real pattern.


18. update Dashboard: 

import { useRef } from "react";


-----

  const prevCalcRef = useRef<number>(0);


useEffect(() => {
  prevCalcRef.current = calculatedValue;
}, [calculatedValue]);

------

Below Increment Count button: 

<p>Previous calculated value: {prevCalcRef.current}</p>

--------

Change the value to 1000 for testing. 

Output: 

count = 1 → calc = 1000 → prevCalc = 0
count = 2 → calc = 2000 → prevCalc = 1000
count = 3 → calc = 3000 → prevCalc = 2000


useRef remembers exactly what you put into .current, nothing more.

19. 
20. 
21. 
22. 
23. 
24.  
25. 
26. 
27. 
28. 
29. 
30. 
31. 
32. 
33. 
34. 
35. 
36. 
37. 
38. 
39. 
40. 
41. 
42. 
43. 
44. 
45. 
46. 
47. 
48. 
49. 
50.  
51. 
52. 
53. 
54. 
55. 
56. 
57. 
58. 
59. 
60. 


