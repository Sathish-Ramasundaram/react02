- **D1** Make Password input controlled  
React should know the password value

- **D2** Add password state with `useState`  
- Inside Login() add ONE line, just below email state: 

const [password, setPassword] = useState("");

- **D3** Update password input with value and onChange  

From: 
<input
  type="password"
  className="w-full border px-3 py-2 rounded"
  placeholder="Enter password"
/>

To: 
<input
  type="password"
  className="w-full border px-3 py-2 rounded"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

- **D4** Update `handleSubmit` to log password 

From: 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Email:", email);
};

To: 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Email:", email);
  console.log("Password:", password);
};

- **D5** Test email and password logging  
You can type in Email
You can type in Password
Click Login
Console shows:
Email: your@email.com
Password: yourpassword

- **D6** Add basic validation goal  
When user clicks Login:
If email or password is empty → show a message

🔹 What kind of validation (VERY BASIC)
Only this rule:
❌ Email OR Password is empty → show error
✅ Both filled → log success

- **D7** Add error state with `useState`  

const [error, setError] = useState("");

Now, you have:
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

- **D8** Update `handleSubmit` with validation logic  
From: 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Email:", email);
  console.log("Password:", password);
};

To: 
```
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!email || !password) {
    setError("Email and Password are required");
    return;
  }

  setError("");
  console.log("Login successful");
  console.log("Email:", email);
  console.log("Password:", password);
};

```
if (!email || !password) -> Checks if either email or password is empty (!email means empty string).
setError("Email and Password are required") → updates the error state so you can show a message in the UI.
return → stops the function here (no further code runs).

Success case: 
setError(""); 
console.log("Login successful"); 
console.log("Email:", email); 
console.log("Password:", password);

Failure Case: 
User clicks "Login"
   ↓
handleSubmit runs
   ↓
Check: email or password empty?
   ↓ YES
setError("Email and Password are required")
   ↓
STOP (return)

- **D9** Show error message in UI with conditional rendering  

update just above email field

From: 
<form className="w-80 bg-white p-6 rounded shadow"
    onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-center">
        Login
      </h2>

      <div className="mb-3">
        <label className="block mb-1 text-sm">
          Email
        </label>


To: 
<form className="w-80 bg-white p-6 rounded shadow"
    onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-center">
        Login
      </h2>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <div className="mb-3">
        <label className="block mb-1 text-sm">
          Email
        </label>

Conditional Rendering
In React, {error && (...)} means:
If error is a non‑empty string, render the <p> element.
If error is empty (""), render nothing.
This is a common pattern for showing error messages only when they exist.

- **D10** Test validation cases  

❌ Case 1: Click Login without typing
You see:
Email and Password are required (red text)

❌ Case 2: Type only email
Same error message

✅ Case 3: Type both email & password
Error disappears

Console shows:
Login successful
Email: ...
Password: ...

✔ Page does NOT refresh
✔ UI responds correctly

- **D11** Update `ForgotPassword.tsx` with form structure 
Goal: 
On /forgot-password, show:
Title
Email input
Submit button

function ForgotPassword() {
  return (
    <form className="w-80 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        Forgot Password
      </h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm">
          Email
        </label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter your email"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Reset Password
      </button>
    </form>
  );
}

export default ForgotPassword;


- **E1** Stop page refresh and make Forgot Password email controlled  
stop page refres and make the email input controlled / (React should know the email value) 

At top, add ---
import { useState } from "react";

Inside ForgotPassword() add: ---
const [email, setEmail] = useState("");

and add submit handler (stop refresh) ---
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Forgot password email:", email);
};

Strikethrough warning is OK (same reason as before).

- **E2** Attach submit handler to Forgot Password form  

From: 
<form className="w-80 bg-white p-6 rounded shadow">

To: 
<form
  className="w-80 bg-white p-6 rounded shadow"
  onSubmit={handleSubmit}
>

- **E3** Make Forgot Password email input controlled  

To: 
<input
  type="email"
  className="w-full border px-3 py-2 rounded"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

- **E4** Test Forgot Password form submission
Type an email
Click Reset Password or press Enter
Result:
❌ No page refresh
✅ Console shows:
Forgot password email: test@example.com

- Add button style for visually see the difference while clicking. 

- **E5** Add Forgot Password link in Login page  
On the Login page, users should be able to click:
“Forgot password?”
and go to /forgot-password without page reload.

import { Link } from "react-router-dom";

Between password and button field, add this 

<div className="mb-4 text-right">
  <Link
    to="/forgot-password"
    className="text-sm text-blue-600 hover:underline"
  >
    Forgot password?
  </Link>
</div>

Client-side
Code that runs in the browser and handles UI, routing, and logic without reloading pages.

History API
A browser API that allows JavaScript to change the URL and navigation history without triggering a page reload.

- **E6** Test Forgot Password navigation from Login

Below Password input, you should see:
Forgot password? (blue link)
Click it
Result:
URL changes to /forgot-password
Forgot Password page renders
❌ No page reload
✔ This is correct behavior.

- **E7** Add Back to Login link in Forgot Password page  

ForgotPassword.tsx
At top ----
import { Link } from "react-router-dom";

Below button ---
<div className="mt-4 text-center">
  <Link
    to="/"
    className="text-sm text-blue-600 hover:underline"
  >
    Back to Login
  </Link>
</div>

- **E8** Test Back to Login navigation  

EXPECTED OUTPUT (VERIFY)
Open /forgot-password
Below Reset Password button, you should see:
Back to Login
Click it
Result:
URL changes to /
Login page appears
❌ No page reload