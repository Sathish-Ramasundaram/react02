## D1 Create AuthContext (NO LOGIC YET)
Create a context file that:
Exists
Compiles
Does NOTHING yet

### D2 create new folder inside 
mkdir src\context

### D4 create file src/context/AuthContext.tsx
type nul >src/context/AuthContext.tsx

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

-----

- 1. 
Goal: React should know whether a user is logged in or not, globally.

change it to: 

const AuthContext = createContext(false);

Before	                After
Context value = null	Context value = false
Means “nothing”	        Means “not logged in”

- 2. update Dashboard.tsx to: 

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Dashboard() {
  const isAuthenticated = useContext(AuthContext);

  return (
    <div>
      <h1>Auth Status:</h1>
      <p>{isAuthenticated ? "Logged In" : "Logged Out"}</p>

      <h1 className="text-2xl font-bold text-blue-600">
        Dashboard Page Working from pages
      </h1>
    </div>
  );
}

export default Dashboard;

- 3. Test
Expected Output: 

Auth Status:
Logged Out
Dashboard Page Working from pages

- 4. Add AuthProvider
Add this in index.tsx
import { AuthProvider } from "./context/AuthContext";

To: 
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>

It makes authentication data and logic available to the entire app without passing props manually.

❌ Without AuthProvider
You’d have to do prop drilling:
<App isAuthenticated={isAuthenticated} />
  → <Dashboard isAuthenticated={isAuthenticated} />
      → <Header isAuthenticated={isAuthenticated} />
      
Messy. Hard to maintain. Painful to explain 😵‍💫

✅ With AuthProvider
<AuthProvider>
  <App />
</AuthProvider>

- 5. update AuthContext.tsx

function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={false}>
      {children}
    </AuthContext.Provider>
  );
}

Before, Dashboard → default value (false)
Now, Dashboard → Provider value (false)
Same result, different source.

- 6. 
Goal to prove that Context is shared data by showing the same value on two different pages.
Dashboard (already exists)
News (we will add)

- 7. Open new page
type nul > src/pages/News.tsx 

Paste this

function News() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-purple-600">
        News Page Working
      </h1>
    </div>
  );
}

export default News;

-- import News in App

import News from "./pages/News";
And ---
<Route path="/news" element={<News />} />

8. Update News.tsx

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

--- inside function News() {  -----
    const isAuthenticated = useContext(AuthContext);

then: 
    <div>
      <h1>Auth Status:</h1>
      <p>{isAuthenticated ? "Logged In" : "Logged Out"}</p>

      <h1 className="text-2xl font-bold text-purple-600">
        News Page Working
      </h1>
    </div>

9. Test. Auth Status is shared data and it is received by Dashboard and News.



