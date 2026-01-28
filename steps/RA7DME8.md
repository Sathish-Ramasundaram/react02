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

## D1 Create AuthContext (NO LOGIC YET)
Create a context file that:
Exists
Compiles
Does NOTHING yet

### D2 create new folder inside 
src/context

### D4 create file src/context/AuthContext.tsx
paste this 
```
import { createContext } from "react";

const AuthContext = createContext(null);

export default AuthContext;
```
### D5 
import { createContext } from "react";

You are importing a React function called createContext.
What createContext is for
createContext lets you create a shared data container that:
Can be accessed by any component
Without passing props down manually
Think of it as:
A global box where you can store data like “Is user logged in?”

### D7
const AuthContext = createContext(null);
AuthContext is an object created by React that represents:
“Authentication-related shared data”
Right now, it contains nothing.

createContext(null)
The default value of the context is null
If a component tries to read this context without a Provider, it will get null
We use null because:
User is not logged in by default
Auth data does not exist yet

### D8
export default AuthContext;
This makes AuthContext available to other files.
Why?
Other components will need to:
Provide auth data
Consume auth data
So we export it.

### D9

function ComponentName()
→ This creates a React COMPONENT

createContext()
→ This creates a React CONTEXT OBJECT

### D10 Function component
Eg: 
function Login() {
  return <div>Login</div>;
}
What this is:
A function
Returns JSX
React renders it to the UI
👉 Used when:
You want something visible on the screen
So:
Components = UI

### D11 Context creation 
const AuthContext = createContext(null);
What this is:
It returns a Context object
NOT a component
NOT a function you call in JSX
👉 Used when:
You want to share data, not UI
So:
Context = data channel

### D12 Create AuthProvider

-- Add AuthProvider function. Full updated code

```
import { createContext, ReactNode } from "react";

const AuthContext = createContext(null);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  return children;
}

export { AuthProvider };
export default AuthContext;

```

### D13

import { createContext, ReactNode } from "react";

createContext:
A React function
Used to create shared data storage

ReactNode: 
A TypeScript type
Means: anything React can display on screen
Examples of ReactNode:
<div />
<App />
"Hello"
null

### D14

const AuthContext = createContext(null);
👉 “create object called AuthContext. Initially we give null value

### d15

type AuthProviderProps = { ... };

This is TypeScript only.
It means:
“I am defining what inputs (props) my component accepts.”
So AuthProviderProps describes the shape of props.

### d16

children: ReactNode;

This component accepts something inside it, and that thing can be anything React can render.
Example:
<AuthProvider>
  <App />
</AuthProvider>

### d17

function AuthProvider(...)
function 

{ children }: AuthProviderProps
This function receives props that contain children.

### d18

export { AuthProvider };

This allows other files to import and use the wrapper.

export default AuthContext;

This allows other files to access the shared data box.

### d19
1️⃣ AuthContext = shared data container
2️⃣ AuthProvider = wrapper component
3️⃣ children = what is inside the wrapper
