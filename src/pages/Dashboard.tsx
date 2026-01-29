import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Dashboard() {

  const isAuthenticated = useContext(AuthContext)

  return (
    <div>
      <header>

      
      <h1>Auth Status: </h1>
      <p>{isAuthenticated ? "Logged In" : "Logged Out"}</p>

    
    <h1 className="text-2xl font-bold text-blue-600">
      Dashboard
    </h1>
    </header>
    </div>
  );
}

export default Dashboard;
