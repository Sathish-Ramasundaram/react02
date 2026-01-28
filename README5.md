- update Login.tsx from pages (B14)
```
function Login() {
  return (
    <form className="w-80 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        Login
      </h2>

      <div className="mb-3">
        <label className="block mb-1 text-sm">
          Email
        </label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter email"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">
          Password
        </label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Login
      </button>
    </form>
  );
}

export default Login;

```

<form className="w-80 bg-white p-6 rounded shadow">
<form> element
Purpose: Creates a form container (for inputs, buttons, etc.).
className="..." → In React, we use className instead of class to apply CSS classes.
Tailwind CSS utilities:
w-80 → sets the width to 20rem (≈ 320px).
bg-white → background color white.
p-6 → padding of 1.5rem (24px) inside the form.
rounded → rounded corners.
shadow → applies a subtle box shadow.

<h2 className="text-xl font-bold mb-4 text-center">
text-xl → font size = extra large.
font-bold → bold text.
mb-4 → margin-bottom = 1rem (16px).
text-center → centers the text horizontally.

<div className="mb-3">
div → a container element.
mb-3 → Tailwind class → margin-bottom: 0.75rem (12px).

<label className="block mb-1 text-sm">
label → HTML element that describes an input field (like email, password, etc.). Clicking the label focuses the input if linked with for or htmlFor.
Tailwind classes:
block → makes the label a block-level element (takes full width).
mb-1 → margin-bottom: 0.25rem (4px), adds spacing below the label.
text-sm → sets font size to small.

className="w-full border px-3 py-2 rounded"
w-full → sets the element’s width to 100% of its parent container.
border → adds a default border (usually 1px solid #e5e7eb in Tailwind’s gray).
px-3 → horizontal padding = 0.75rem (12px) on left and right.
py-2 → vertical padding = 0.5rem (8px) on top and bottom.
rounded → applies border-radius (default = 0.25rem), giving slightly rounded corner

- test (B15)

- preventDefault (B16)
By default, <form>:
Submits to server
Reloads the page
In React apps:
We handle submission in JavaScript
So we must stop default browser behavior
That’s exactly what preventDefault() does.

- Add this function inside Login.tsx Below function Login() {    (B17)


function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
}

- update this (B18)
From: 
<form className="w-80 bg-white p-6 rounded shadow">

To:
<form
  className="w-80 bg-white p-6 rounded shadow"
  onSubmit={handleSubmit}
>

- Test (B19)

- Controlled Components (B20)
Right now, your email input works, but:
The browser owns the value
React does not know what the user typed
React apps prefer this instead:
React should know the input value at all times
That’s what controlled components mean.

- (B21)
❌ Before (uncontrolled)
User types → browser stores text
React is unaware

✅ After (controlled)
User types → React state updates
Input shows value from React
React becomes the single source of truth.

- (B22)
The input value comes from useState, and every keystroke updates that state.

- Inside Login.tsx, at top include this: (B23)
import { useState } from "react";

inside the Login() function, add this one line: (B23)

const [email, setEmail] = useState("");
What this means
email → stores the text
setEmail → updates the text
"" → starts empty

- update email input (B24)
From: 
<input
  type="email"
  className="w-full border px-3 py-2 rounded"
  placeholder="Enter email"
/>

To: 
<input
  type="email"
  className="w-full border px-3 py-2 rounded"
  placeholder="Enter email"
  value={email}
/>

What this means?
“Hey input, show whatever is inside email”

- Test (B25)
⚠️ IMPORTANT (Expected behavior)
Now try typing…
👉 You CANNOT type anymore
This is EXPECTED ❗
You just told the input:
“Only show what React gives you”
But React is not updating yet.
This is GOOD. Don’t panic.

- 
add this one more line in the input: (B26)
onChange={(e) => setEmail(e.target.value)}

<input
  type="email"
  className="w-full border px-3 py-2 rounded"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

User types → onChange fires
e.target.value → what user typed
setEmail(...) → update React state
React re-renders → input shows new value
🔁 Loop complete.

- Test (B27)
Now, you can type email

User types → onChange → setEmail → email state → input value
That’s controlled input.
React knows the email value

- tiny goal (B28)
When you click Login or press Enter, you should see the email value in the console.
No API. No validation. Just proof React has the data.

- update handleSubmit (B29)
From: 
function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
}

To: 
function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
  console.log("Email:", email);
}

- Test (B30)
EXPECTED OUTPUT (VERIFY)
Open: http://localhost:3000/
Type an email, e.g.:
test@example.com
Click Login or press Enter
Open DevTools → Console
You should see:
Email: test@example.com
✔ If you see this → React state + form submission works.

- FormEvent is struck through. No problem with result (B31)

Change From: 
function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
  console.log("Email:", email);
}

To:
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Email:", email);
};

still same struckthrough
Why React hasn’t removed it yet
React events are SyntheticEvents
DOM events are native events
There is no 1:1 DOM replacement yet
So React keeps the types but marks them deprecated for future transition
This is a library evolution issue, not a developer issue.
There is NO replacement yet that removes the strikethrough

⚠️ Strikethrough ≠ error
⚠️ Strikethrough ≠ wrong
⚠️ Strikethrough ≠ unsafe