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

change 
email input to -----
<input
  type="email"
  className="w-full border px-3 py-2 rounded"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

- Add the button style for visual diference:

transition
    duration-150
    hover:bg-blue-700
    active:bg-blue-800
    active:scale-95


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

----- add email state ----
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


### c25 Add Register → Login link

--- At top,
import { Link } from "react-router-dom";

--- Below register button, 
<div className="mt-4 text-center">
  <Link
    to="/"
    className="text-sm text-blue-600 hover:underline"
  >
    Already have an account? Login
  </Link>
</div>

--- Test

### c26 Add Login → Register link

--- below log in button (Login.tsx),
<div className="mt-4 text-center">
  <Link
    to="/register"
    className="text-sm text-blue-600 hover:underline"
  >
    Don’t have an account? Register
  </Link>
</div>










