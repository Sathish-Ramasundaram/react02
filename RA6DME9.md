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

inside function News() {  -----
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

10. Change the Dashboard Page UI:
To: 


