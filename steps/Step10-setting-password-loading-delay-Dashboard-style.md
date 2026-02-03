21. Tiny Goal:
    When login is in progress:
    Button is disabled
    Button text changes to “Logging in…”

Update: Login.tsx

const [loading, setLoading] = useState(false);

22. Set loading true before API call

To:

if (!email || !password) {
setError("Email and Password are required");
return;
}

setLoading(true);

try {
const result = await loginApi(email, password);
setError("");
console.log("API result:", result);
} catch (err: any) {
setError(err.message);
} finally {
setLoading(false);
}

⚠️ finally is important — it runs success or error.

23. Update your Login button:

To:

<button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded text-white
    ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}
  `}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

24. Test (important)
    Case 1 — Click Login
    Button text changes to Logging in…
    Button becomes disabled
    No double clicks possible

Case 2 — Error happens
Error message shows
Button re-enables

Case 3 — Success
Button re-enables
No error shown

Right now, your loginApi finishes instantly:
return { success: true };

So this happens too fast:
setLoading(true)
API finishes immediately
setLoading(false)

Result:
👉 You don’t see “Logging in…”
👉 Button looks unchanged

This is normal, not a bug.

TINY ADJUSTMENT (ONLY FOR LEARNING)

Add delay to loginApi (src/api/authApi.ts)

To:
export async function loginApi(email: string, password: string) {
console.log("loginApi called with:");
console.log("Email:", email);
console.log("Password:", password);

// ⏳ Artificial delay (2 seconds)
await new Promise((resolve) => setTimeout(resolve, 2000));

if (email !== "test@example.com") {
throw new Error("Invalid credentials");
}

return { success: true };
}

⚠️ This delay is intentional and temporary.

Now test Case 1 (again)
Open Login page
Enter any email + password
Click Login

✅ You should NOW see:
Button text → Logging in…
Button disabled
You cannot click again
After ~2 seconds:
Error OR success happens
Button returns to normal

Later, when we use a real API,
👉 You will REMOVE this artificial delay.

It exists only to teach loading state.

25. Tiny Goal:
    Know when login succeeded
    Just store success in local state so the UI knows login worked.

Update Login.tsx:

const [isSuccess, setIsSuccess] = useState(false);

update it like this:

try {
const result = await loginApi(email, password);
setError("");
setIsSuccess(true); // ✅ mark success
console.log("API result:", result);
} catch (err: any) {
setError(err.message);
setIsSuccess(false); //      optional but safe
} finally {
setLoading(false);
}

26. Show success message (temporary)
    Just above the form, add this JSX:

{isSuccess && (

  <p className="mb-3 text-sm text-green-600">
    Login successful
  </p>
)}

Note: Put the fragment after return, otherwise, you will get error.
{isSuccess && (...)} → one element

<form>...</form> → another element
JSX doesn’t allow siblings at the top level like this.
So, fragment is needed.

<>...</> is a Fragment

27. Tiny Goal:
    When login succeeds, mark the user as logged in globally
    Just prove global state works

28. Update AuthContext.tsx

Replace everything with this:

```

import { createContext, ReactNode, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;


```

⚠️ This looks big, but it’s just:
one boolean
two functions

Auth state is now real, not hardcoded
login() → sets auth to true
logout() → sets auth to false
Any component can now read or change auth

29. Use AuthContext in Login.tsx

import { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";

---

Get login function
Inside the Login component, add:

const auth = useContext(AuthContext);

---

Call login() on success
Inside your try block, after success, add:

auth?.login();

it becomes:

try {
const result = await loginApi(email, password);
setError("");
setIsSuccess(true);
auth?.login(); // ✅ global auth update
} catch (err: any) {
setError(err.message);
setIsSuccess(false);
} finally {
setLoading(false);
}

30. Test:

Login with:
test@example.com
any password

Go to /dashboard
✅ Expected result
Dashboard now shows Logged In
ProtectedRoute allows access

You just:
Connected UI → API → Global state
Removed fake auth
Built real authentication flow
This is production-grade architecture.

31. Tiny Goal:
    After successful login, automatically go to /dashboard

React Router gives us a hook called useNavigate.

update Login.tsx:

import { Link, useNavigate } from 'react-router-dom';

---

Inside the Login component, add:
const navigate = useNavigate();

So now you have:
auth → global login
navigate → routing

---

Redirect on success
Inside your try block, after auth?.login(), add:
navigate("/dashboard");

it becomes:

try {
const result = await loginApi(email, password);
setError("");
setIsSuccess(true);
auth?.login();
navigate("/dashboard"); // ✅ redirect
} catch (err: any) {
setError(err.message);
setIsSuccess(false);
} finally {
setLoading(false);
}

32. Test (important)

Open /
Login with:
test@example.com
any password

Watch carefully 👀
✅ Expected behavior
Login button shows loading
Login succeeds
App automatically navigates to /dashboard
Dashboard shows Logged In

No refresh.
No manual typing of URL.

---

Redirect happens only after success
Auth is already set
ProtectedRoute allows access
No race conditions

---

33. I want to make the dashboard status false and demonstrate to my trainee that is not taking in and it is protected

src/context/AuthContext.tsx

From:
const login = () => {
setIsAuthenticated(true);
};

To:
const login = () => {
setIsAuthenticated(false); // 👈 force false
};

---

Open ProtectedRoute.tsx

From:
const isAuthenticated = useContext(AuthContext);

if (!isAuthenticated) {
return <Navigate to="/" replace />;
}

To:
const auth = useContext(AuthContext);

if (!auth?.isAuthenticated) {
return <Navigate to="/" replace />;
}

And test now.

After test, change back the above AuthContext code and do not change this ProtectedRoute one
This code is now the correct and final version.

34. update Dashboard:

From:
const isAuthenticated = useContext(AuthContext);

To:
const auth = useContext(AuthContext);
if (!auth) return null;
const { isAuthenticated, logout } = auth;

This line already exists and now becomes correct automatically:
<p>{isAuthenticated ? 'Logged In' : 'Logged Out'}</p>
No edit needed — now it uses real boolean.

Add this log out at the bottom inside <div>:

<button
onClick={logout}
className="mt-4 bg-red-600 text-white px-4 py-2 rounded">

Logout
</button>

35. Test:
    After clicking log out button, it is redirect to home page.

As it is too fast, we are adding this below code to visualize the slow loggout.

Update Dashboard:
const [showLoggedOut, setShowLoggedOut] = useState(false);

From:

<p>{isAuthenticated ? 'Logged In' : 'Logged Out'}</p>

To:

<p>
  {showLoggedOut ? 'Logging Out' : isAuthenticated ? 'Logged In' : 'Logged Out'}
</p>

Replace the log out button:

<button
onClick={() => {
setShowLoggedOut(true);

    setTimeout(() => {
      logout();
    }, 1000);

}}
className="mt-4 bg-red-600 text-white px-4 py-2 rounded">

Logout
</button>

- Test now.

- For Dashboard visual set up use this.

Put this in main div

<div className="w-full min-h-screen relative flex items-center justify-center">

Create and use this div for counter

<div className="bg-white p-6 rounded shadow w-96">

create and use this div for auth

<div className="absolute top-4 right-4 text-right">
