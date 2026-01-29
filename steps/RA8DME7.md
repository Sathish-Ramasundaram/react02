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

- **E9** Register page UI structure  
On /register, show:
Email
Password
Confirm Password
Register button

- **E10** Replace Register page code 
function Register() {
  return (
    <form className="w-80 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        Register
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

      <div className="mb-3">
        <label className="block mb-1 text-sm">
          Password
        </label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter password"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">
          Confirm Password
        </label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          placeholder="Confirm password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Register
      </button>
    </form>
  );
}

export default Register;

- **E11** Test Register page UI  

- **E12** Stop refresh and make Register email controlled  

Pressing Enter should NOT refresh
React should know the email value (Controlled email)
UI should look the same

At top, -----
import { useState } from "react";

below register() {, -----
const [email, setEmail] = useState("");

Add submit handler, ----
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Register email:", email);
};

(Strikethrough warning is OK, as discussed.)

Attach handler to <form> ----
To: 
<form
  className="w-80 bg-white p-6 rounded shadow"
  onSubmit={handleSubmit}
>

change email input to -----
<input
  type="email"
  className="w-full border px-3 py-2 rounded"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

Expected Output: 
Open /register
Type an email
Click Register or press Enter
Result:
❌ No page refresh
✅ Console shows:
Register email: test@example.com

- **E13** Controlled password and confirm password inputs in Register page  
Goal: 
On /register:
React should know password
React should know confirmPassword
Typing should work normally
Submit should log all three values

add email state ----
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

---- Make password input controlled
To: 
<input
  type="password"
  className="w-full border px-3 py-2 rounded"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

---- Make confirmed password input controlled
To: 
<input
  type="password"
  className="w-full border px-3 py-2 rounded"
  placeholder="Confirm password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>

---- update handleSubmit To: 
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Confirm Password:", confirmPassword);
};

- **E14** Test Register form with all controlled inputs  
EXPECTED OUTPUT (VERIFY)
Open /register
Type in all three fields
Click Register
Console should show:
Email: test@example.com
Password: 123456
Confirm Password: 123456
✔ No refresh
✔ Typing works
✔ React owns all values

- **E15** Add password match validation in Register page  
On /register:
If passwords don’t match → show error
If they match → log “Register successful”

-- setError,
const [error, setError] = useState("");

--- replace handleSubmit, 

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setError("");
  console.log("Register successful");
  console.log("Email:", email);
};

--- add above the email field, 
{error && <p className="mb-3 text-sm text-red-600">{error}</p>}

Note: 
In React, {error && (...)} is a shorthand for:
If error is truthy (non‑empty string), render the <p> element.
If error is empty (""), render nothing.
This is how you show error messages only when they exist.

- **E16** Test Register form validation  
EXPECTED OUTPUT (TEST CAREFULLY)
❌ Case 1: Passwords don’t match
Enter different passwords
Click Register
You see:
Passwords do not match (red text)

✅ Case 2: Passwords match
Enter same password in both fields
Click Register
Result:
Error disappears
Console shows:
Register successful
Email: test@example.com


✔ No refresh
✔ Validation works









