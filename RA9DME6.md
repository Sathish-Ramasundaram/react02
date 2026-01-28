- Make Password input controlled. (C1)
React should know the password value

- Inside Login() add ONE line, just below email state: (C2)

const [password, setPassword] = useState("");

- Update the password <input> (C3)

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

- update handleSubmit (C4)

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

- Test (C5)
You can type in Email
You can type in Password
Click Login
Console shows:
Email: your@email.com
Password: yourpassword

- Next tiny Goal: (c6)
When user clicks Login:
If email or password is empty → show a message

🔹 What kind of validation (VERY BASIC)
Only this rule:
❌ Email OR Password is empty → show error
✅ Both filled → log success

- Add error state (c7)

const [error, setError] = useState("");

Now, you have:
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

- update handleSubmit: 
From: 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Email:", email);
  console.log("Password:", password);
};

To: 
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

- show error message in UI c(8)

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

      {error && (
        <p className="mb-3 text-sm text-red-600">
            {error}
        </p>
        )
        }


      <div className="mb-3">
        <label className="block mb-1 text-sm">
          Email
        </label>

Conditional Rendering
In React, {error && (...)} means:
If error is a non‑empty string, render the <p> element.
If error is empty (""), render nothing.
This is a common pattern for showing error messages only when they exist.

- Test (c9)

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

- update ForgotPassword.tsx (c10)
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
