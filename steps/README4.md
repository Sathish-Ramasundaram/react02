- **C1** Update `Login.tsx` form structure  
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

- **C2** Test form rendering  

- **C3** Prevent default form submission 
By default, <form>:
Submits to server
Reloads the page
In React apps:
We handle submission in JavaScript
So we must stop default browser behavior
That’s exactly what preventDefault() does.

- **C4** Add `handleSubmit` function  
- Add this function inside Login.tsx Below function Login() {    


function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
}

-- 

- **C19** FormEvent strikethrough explanation
FormEvent is struck through. No problem with result

Change From: 
function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
}

To:
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
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

- **C5** Update form with `onSubmit` handler  
From: 
<form className="w-80 bg-white p-6 rounded shadow">

To:
<form
  className="w-80 bg-white p-6 rounded shadow"
  onSubmit={handleSubmit}
>

- **C6** Test form submission prevention  

- update the button className for visual difference:
    <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded
    transition
    duration-150
    hover:bg-blue-700
    active:bg-blue-800
    active:scale-95
  "
      >

- **C7** Controlled components concept  
Right now, your email input works, but:
The browser owns the value
React does not know what the user typed
React apps prefer this instead:
React should know the input value at all times
That’s what controlled components mean.

- **C8** Uncontrolled vs Controlled inputs  
❌ Before (uncontrolled)
User types → browser stores text
React is unaware

How to verify this: 
Type email and open Console and run:
document.querySelector('input[type="email"]').value


✅ After (controlled)
User types → React state updates
Input shows value from React
React becomes the single source of truth.

- **C9** Input value comes from `useState`  
The input value comes from useState, and every keystroke updates that state.

- **C10** Import `useState` in `Login.tsx`  
import { useState } from "react";

- **C11** Add email state with `useState`  
inside the Login() function, add this one line: 

const [email, setEmail] = useState("");

What this means
email → stores the text
setEmail → updates the text
"" → starts empty

- **C12** Update email input with `value`  
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

- **C13** Test controlled input behavior  
⚠️ IMPORTANT (Expected behavior)
Now try typing…
👉 You CANNOT type anymore
This is EXPECTED ❗
You just told the input:
“Only show what React gives you”
But React is not updating yet.
This is GOOD. Don’t panic.

- **C14** Add `onChange` to email input 
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

- **C15** Test controlled input typing  
Now, you can type email

User types → onChange → setEmail → email state → input value
That’s controlled input.
React knows the email value

- **C16** Tiny goal: log email on submit  
When you click Login or press Enter, you should see the email value in the console.
No API. No validation. Just proof React has the data.

- **C17** Update `handleSubmit` to log email  

To: 
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Email:", email);
};

- **C18** Test email logging in console  
EXPECTED OUTPUT (VERIFY)
Open: http://localhost:3000/
Type an email, e.g.:
test@example.com
Click Login or press Enter
Open DevTools → Console
You should see:
Email: test@example.com
✔ If you see this → React state + form submission works.

In controlled inputs, the browser still holds the value, but React state is the single source of truth and always wins.
Controlled Input

Keyboard
   ↓
React State (truth)
   ↓
DOM (mirror)
Browser DOM is still know the value. Right?”
✔ Correct
✔ But React owns it
✔ DOM is just a reflection

To verify: 

add a value in useState.
put this command in console: 
document.querySelector('input[type="email"]').value = ""

Input visually clears ❌
Next re-render → value comes back
Why?
React re-applies its state to the DOM.
💥 This is the strongest proof that React owns the value.
