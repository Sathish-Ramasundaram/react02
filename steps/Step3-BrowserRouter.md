- **A** Install `react-router-dom`  
  npm install react-router-dom

npm → Node Package Manager
install → install a package
react-router-dom → the package name

Routing means:
Multiple pages in a single-page app (SPA)
URL changes without full page reload
Navigation like /login, /dashboard, /profile

Example:
import { BrowserRouter, Routes, Route } from "react-router-dom";

- **B13** BrowserRouter explanation  
BrowserRouter is the component that enables routing in a React app.
It allows your React app to change pages using URLs without reloading the page.

- **B14** Update `App.tsx` with BrowserRouter wrapper 
```
import { BrowserRouter } from "react-router-dom";

---
  return (
    <BrowserRouter>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-blue-600">
        Tailwind is working. Router wrapper working
      </h1>
    </div>
    </BrowserRouter>
  );

```

- Test: 
No change. 

Right now:
You are not using routes yet
BrowserRouter is just preparing the app for routing

Think of it like this 🧠
👉 BrowserRouter = wiring
👉 Routes/Route = actual switches

- **B14.B** Update `rspack.config.js` for history fallback  
From: 
devServer: {
  port: 3000,
},

To: 
devServer: {
  port: 3000,
  historyApiFallback: true,
},

❌ Without historyApiFallback
/ → works
/login → works only if navigated inside app
Refresh /login → 404

✅ With historyApiFallback: true
/
/login
/dashboard
Refresh anywhere → always works

- **B15** Update `App.tsx` with Routes and Route  

```
update Import: 

import { BrowserRouter, Routes, Route } from "react-router-dom";

--

    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-2xl font-bold text-green-600">
                Home Route Working
              </h1>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>

```
- **B16** Explanation of `<Routes>` and `<Route>`  
<Routes> is a container for all your routes. Decision Maker

<Route> defines a mapping: If the URL matches this path, render something.

path="/" Match the root URL - http://localhost:3000/
later: /register
/forgot-password
/dashboard

element={...} 
element expects JSX. NOT a component name. NOT a string
This are all valid
element={<Home />}
element={<h1>Hello</h1>}
Here, we are rendering JSX directly — which is perfect for learning.

You can try this, 
<Route path="/test" element={<h2>Test</h2>} />

Test will appear in .../test
If it is not coming, try save and run again. 


- **B18** Add Register route in `App.tsx`  

          <Route
            path="/register"
            element={
              <h1 className="text-4xl font-bold text-purple-600 bg-yellow-100 p-4">
                Register Route Working
              </h1>
            }
          />

---

- **B19** Add Forgot Password and Dashboard route in `App.tsx`  

```
<Route
            path="/forgot-password"
            element={
              <h1 className="text-2xl font-bold text-red-600">
                Forgot Password Route Working
              </h1>
            }
          />
```

```
          <Route
            path="/dashboard"
            element={
              <h1 className="text-2xl font-bold text-blue-600">
                Dashboard Route Working
              </h1>
            }
          />

```

- Test it. 


- **B21** Create pages folder inside src and `Login.tsx` (src/pages)

mkdir src\pages   

type nul > src\pages\Login.tsx

```

function Login() {
  return (
    <h1 className="text-2xl font-bold text-green-600">
      Login Page Working from pages
    </h1>
  );
}

export default Login;

```

- **B22** Update `App.tsx` to use Login page  

import Login from "./pages/Login";

And
From: 
<Route
  path="/"
  element={
    <h1 className="text-2xl font-bold text-green-600">
      Home Route Working 
    </h1>
  }
/>

To: 
<Route path="/" element={<Login />} />

- **B23** Test with `npm run dev`  

- **B24** create /pages/Register.tsx 

type nul > src/pages/Register.tsx

```
function Register() {
  return (
    <h1 className="text-2xl font-bold text-purple-600">
      Register Page Working from pages
    </h1>
  );
}

export default Register;

```

- **B25** Update `App.tsx` to use Register page  

import Register from "./pages/Register";

replace with, 
<Route path="/register" element={<Register />} />

- **B26** create ForgotPassword.tsx inside src/pages/ and paste the below code 
type nul >src/pages/ForgotPassword.tsx

function ForgotPassword() {
  return (
    <h1 className="text-2xl font-bold text-red-600">
      Forgot Password Page Working from pages
    </h1>
  );
}

export default ForgotPassword;

- **B27** Update `App.tsx` to use ForgotPassword page  

import ForgotPassword from './pages/ForgotPassword';

replace with:
<Route path="/forgot-password" element={<ForgotPassword />} />

- **B28** Test ForgotPassword route  

- **B29** create Dashboard.tsx inside src/pages/ and paste the below code 

type nul >src/pages/Dashboard.tsx  

function Dashboard() {
  return (
    <h1 className="text-2xl font-bold text-blue-600">
      Dashboard Page Working from pages
    </h1>
  );
}

export default Dashboard;

- **B30** Update `App.tsx` to use Dashboard page  

import Dashboard from './pages/Dashboard';

replace with: 
<Route path="/dashboard" element={<Dashboard />} />

- **B31** Test Dashboard route  
