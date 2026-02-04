Create the API file.

1. Inside src, create a folder named: api

mkdir src\api

Inside src/api, create a file: authApi.ts

type nul > src\api\authApi.ts

```

export async function loginApi() {
  console.log("loginApi function called");
}

```
Right now, this file does nothing
It will eventually talk to the server

We are just proving:
👉 file exists
👉 TypeScript compiles
👉 No errors

2. Verify (important)

Run your app:
npm run dev

Open browser
Check Terminal + Browser Console

Expected result
❌ No errors
❌ Nothing changes in UI
✔ App still runs normally


3. At the top of Login.tsx, add:

import { loginApi } from "../api/authApi";

Call it inside handleSubmit
Inside your existing handleSubmit function, add this single line at the TOP:

loginApi();


Updated one:

```

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!email || !password) {
    setError("Email and Password are required");
    return;
  }

  loginApi();
};

```

4. Test

Run app (if not already):
npm run dev


Open Login page
Click Login 
Open Browser Console

✅ Expected output
loginApi function called
❌ No page refresh
❌ No API call

✔ Console log appears


5. Tiny next goal: 
Send email & password INTO the API function

Still:
❌ No real API
❌ No async logic
❌ No fetch

Only data flow.


6. Update authApi.ts

Replace with this: 

```

export function loginApi(email: string, password: string) {
  console.log("loginApi called with:");
  console.log("Email:", email);
  console.log("Password:", password);
}

```


⚠️ No async yet
⚠️ No return value

7. Update Login.tsx

From: 
loginApi();

To: 
loginApi(email, password);

updated Handlesubmit: 

```

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!email || !password) {
    setError("Email and Password are required");
    return;
  }

  loginApi(email, password);

  setError("");
  
};

```


⚠️ Do NOT rename variables
⚠️ Use the same email and password state you already have

8. Test: 

loginApi called with:
Email: email@gmail.com
Password: 12344
Login successful


9. Tiny Goal: 
Make loginApi async and return a fake success

Still:
❌ No real server
❌ No fetch
❌ No error handling yet

Just understand async → await → return value.

Simple analogy

Normal function:
Cook instant noodles → done in 2 minutes → serve

Async function:
Order food online → wait → continue doing other work

10. Open authApi.ts

Replace code with this: 

```

export async function loginApi(email: string, password: string) {
  console.log("loginApi called with:");
  console.log("Email:", email);
  console.log("Password:", password);

  return { success: true };
}

```
⚠️ Important:
Added async
Added return
Still NO real API

What changed (simple words)

async means: “this function returns a Promise”
return { success: true } means:
Caller will receive this value later
Nothing else changed

11. Update Login.tsx (ONE line)
From: 
loginApi(email, password);

To: 

loginApi(email, password).then((result) => {
  console.log("API result:", result);
});



Note: Do NOT convert handleSubmit to async yet

12. Test: 

Expected Output: 

loginApi called with:
Email: email@gmail.com
Password: 12344
API result: { success: true }


13. Tiny Goal: 
Use async / await instead of .then()

Open Login.tsx

From: 
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

To: 
const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {


Replace .then() with await

From: 
loginApi(email, password).then((result) => {
  console.log("API result:", result);
});


To: 
const result = await loginApi(email, password);
console.log("API result:", result);


14. Test: 
Same Expected Output like before. 

.then() and await do the same thing.

But:
.then() → harder to read
await → looks synchronous, easier to reason
That’s why almost all modern React code uses async/await.


16. Tiny Goal: 
Make loginApi sometimes fail and catch the error

17. Update authApi.ts

To: 

```

export async function loginApi(email: string, password: string) {
  console.log("loginApi called with:");
  console.log("Email:", email);
  console.log("Password:", password);

  if (email !== "test@example.com") {
    throw new Error("Invalid credentials");
  }

  return { success: true };
}

```
And update Login.tsx
If email is NOT test@example.com → ❌ fail
If it matches → ✅ success
Simple, predictable.

18. Catch the error in Login.tsx

Update handlesubmit with this: 

```

const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (!email || !password) {
    setError("Email and Password are required");
    return;
  }

  try {
    const result = await loginApi(email, password);
    console.log("API result:", result);
  } catch (err: any) {
    setError(err.message);
  }
};

```

⚠️ Only change is try / catch.

19. Confirm this error is existed: 

{error && (
  <p className="mb-3 text-sm text-red-600">
    {error}
  </p>
)}


20. Test: 

Test (VERY IMPORTANT)
❌ Case 1 — Wrong email
Email: wrong@example.com
Password: anything
Click Login

✅ Expected:
Error message shows: Invalid credentials
No console crash

✅ Case 2 — Correct email
Email: test@example.com
Password: anything
Click Login

✅ Expected:
API result: { success: true }
❌ No error message


Note: If I enter incorrect email and password. It is showing invalid error. Then, I entered, test@example.com. Console shows the expected output, but still the invalid error is there. After refresh and enter the test@example.com, error is not coming. So, I belive, we need to delete the previous log error message

So, update the try with this 

try {
  const result = await loginApi(email, password);
  setError(""); // ✅ clear old API error
  console.log("API result:", result);
}

