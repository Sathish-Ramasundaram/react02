Login → works
Refresh → logged out ❌
In real apps:

Login → refresh → still logged in ✅
We’ll fix that using localStorage.

1. 
We will store auth state here:
localStorage

When login happens → save flag
When app loads → read flag


2. update AuthContext.tsx: 

From: 
const [isAuthenticated, setIsAuthenticated] = useState(false);

To: 

const [isAuthenticated, setIsAuthenticated] = useState(
  localStorage.getItem("auth") === "true"
);


From: 
const login = () => {
  setIsAuthenticated(true);
};

To: 

const login = () => {
  setIsAuthenticated(true);
  localStorage.setItem("auth", "true");
};



From: 
const logout = () => {
  setIsAuthenticated(false);
};

To: 
const logout = () => {
  setIsAuthenticated(false);
  localStorage.removeItem("auth");
};

3. Test: 

Dashboard will be even after refresh. 


4. During development, logging in every time is slow. Real developers use a dev shortcut for protected pages.
We’ll add a safe, tiny development bypass — only for local testing.

Open ProtectedRoute.tsx

Add this : 

const DEV_BYPASS = true;

And
From: 
if (!auth?.isAuthenticated) {
  return <Navigate to="/" replace />;
}

To: 
if (!DEV_BYPASS && !auth?.isAuthenticated) {
  return <Navigate to="/" replace />;
}

5. Tiny Goal: 

Create a small local API server
→ one /login endpoint
→ returns JSON
→ your React app calls it

we will built: 

Endpoint:
POST /login

Input:
email + password

Output:
success JSON OR error JSON


6. In your project root (same level as src): create folder server

mkdir server

open server
cd server

Initialize node Project: 
npm init -y


Install Express + CORS
npm install express cors

Why:
express → server
cors → allow React to call API

7. create file server.js

type nul > server.js

```

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@test.com" && password === "1234") {
    return res.json({
      success: true,
      token: "demo-token-123",
      user: { name: "Admin" }
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});

```

8. Run this command inside server folder: 
node server.js

You should see API running on http://localhost:4000

Keep this terminal running.

Open browser:
http://localhost:4000/login

You will see:
Cannot GET /login

✅ Correct — because it expects POST.


9. Tiny Goal: 
React Login page should call:
POST http://localhost:4000/login


10. src/api/authApi.ts
update, replace with this

```

export async function loginApi(email: string, password: string) {
  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

```

11. Test now: 
Keep the server terminal on:
Open react project

credential should be worked: 
email: admin@test.com
password: 1234

Case 1: Correct credential - Login
Case 2: Incorrect credential - Error

12. useEffect: 

useEffect runs side-effects after render.
Side-effects = things outside React rendering:

API calls
timers
subscriptions
localStorage
event listeners
manual DOM work

13. update Dashboard.tsx

import { useEffect } from "react";

inside dashboard component: 

useEffect(() => {
  console.log("Dashboard mounted");
}, []);


14. Test: 

Open dashboard page.
Expected console:
Dashboard mounted

Only once. Why? Because dependency array is empty: []

Meaning: Run only on first render (mount)

15. change it from: 
}, []);

To: 
}, [count]);


16. Test: 

Click:
Increment Count

Console should print:
Dashboard mounted
Dashboard mounted
Dashboard mounted

Each click = effect runs.


Dependency array controls when effect runs.

[]        → only once
[count]   → when count changes
[text]    → when text changes
none      → every render (danger)


17. change this temporarily: Show comman mistake

useEffect(() => {
  console.log("Effect runs");
});

(no dependency array)
Test: 
Type in input field.

You’ll see spam:

Effect runs
Effect runs
Effect runs

Every render.


18. Rule: No dependency array = run on EVERY render
Usually wrong.

19. Put it back: 

useEffect(() => {
  console.log("Dashboard mounted");
}, []);

20. We will simulate a very real pattern:

Dashboard opens
→ useEffect runs once
→ fetch user profile from API
→ store in state
→ show on screen

We will build: 

New API endpoint:
GET /me

Returns:
{ name: "Admin", role: "Developer" }

Dashboard will auto-fetch it on load.


21. Open: server/server.js

Add this endpoint above app.listen:

app.get("/me", (req, res) => {
  res.json({
    name: "Admin",
    role: "Developer"
  });
});

22. Restart API Server (important)

ctrl + C

node server.js

23. Create API Function (tiny)

open src/api/authApi.ts

Add new function:

export async function fetchMe() {
  const res = await fetch("http://localhost:4000/me");
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

24.  update dashboard: 

import { fetchMe } from "../api/authApi";

-----

const [profile, setProfile] = useState<any>(null);


<any> tells TypeScript:
“This state can hold any type of value — don’t do type checking here.”
So profile can become:
string
number
object
array
boolean
anything at all
TypeScript will not give errors for wrong usage.

----

Add this block: 

useEffect(() => {
  fetchMe()
    .then(data => {
      setProfile(data);
    })
    .catch(err => {
      console.error(err);
    });
}, []);


Note: 
[] = run once on mount


Add somewhere in JSX: (I have added in the div of auth status and logout button)

 {profile && (
          <p className="mt-4">
            Welcome {profile.name} ({profile.role})
          </p>
        )}

25. Test: 


26. What Is the Infinite Loop Trap?

effect runs
→ sets state
→ state change causes render
→ effect runs again
→ sets state again
→ repeat forever

27. Create the Bug (on purpose)

Dashboard: 

const [loopValue, setLoopValue] = useState(0);


And add this effect: 

useEffect(() => {
  console.log("Effect running");
  setLoopValue(loopValue + 1);
}, [loopValue]);


28. Test:

Open Dashboard.

Console will spam:

Effect running
Effect running
Effect running
Effect running
...


UI may freeze 🔥

That’s the infinite loop.

Why This Happens
Because dependency = loopValue
But effect changes loopValue

So:
dependency changed → run effect
effect updates dependency → run again

Cycle never ends.

29. Fix version: 

useEffect(() => {
  console.log("Effect running once");
  setLoopValue(v => v + 1);
}, []);


30. Test:

Now:
runs once
updates once
stops

Correct.

31. Real-World Version of This Bug

Common mistake:

useEffect(() => {
  fetchData().then(setData);
}, [data]); // ❌ WRONG


Should be:

useEffect(() => {
  fetchData().then(setData);
}, []); // ✅
