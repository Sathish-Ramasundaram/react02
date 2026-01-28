- (39)
BrowserRouter is the component that enables routing in a React app.
It allows your React app to change pages using URLs without reloading the page.

- update App.tsx (40)
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

update with the below (41)

```
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
- (42)
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

- Update rspack.config.js (43)
From: 
devServer: {
  port: 3000,
},

To: 
devServer: {
  port: 3000,
  historyApiFallback: true,
},

- update App.tsx (51)

          <Route
            path="/register"
            element={
              <h1 className="text-4xl font-bold text-purple-600 bg-yellow-100 p-4">
                Register Route Working
              </h1>
            }
          />

---

- Add one more route in App.tsx (B1)

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

- Add dasboard route in App.tsx (B2)

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

- create page /src/pages/Login.tsx (B3)

function Login() {
  return (
    <h1 className="text-2xl font-bold text-green-600">
      Login Page Working from pages
    </h1>
  );
}

export default Login;


- Update App.tsx (B4)

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

- npm run dev 
Test (B5)

- create /pages/Register.tsx (B6)

function Register() {
  return (
    <h1 className="text-2xl font-bold text-purple-600">
      Register Page Working from pages
    </h1>
  );
}

export default Register;

- update App.tsx (B7)

import Register from "./pages/Register";

replace with, 
<Route path="/register" element={<Register />} />

- create ForgotPassword.tsx inside src/pages/ and paste the below code (B8)

function ForgotPassword() {
  return (
    <h1 className="text-2xl font-bold text-red-600">
      Forgot Password Page Working from pages
    </h1>
  );
}

export default ForgotPassword;

- update App.tsx (B9)

import ForgotPassword from './pages/ForgotPassword';

replace with:
<Route path="/forgot-password" element={<ForgotPassword />} />

- test (B10)

- create Dashboard.tsx inside src/pages/ and paste the below code (B11)

function Dashboard() {
  return (
    <h1 className="text-2xl font-bold text-blue-600">
      Dashboard Page Working from pages
    </h1>
  );
}

export default Dashboard;

- update App.tsx (B12)

import Dashboard from './pages/Dashboard';

replace with: 
<Route path="/dashboard" element={<Dashboard />} />

- Test (B13)
