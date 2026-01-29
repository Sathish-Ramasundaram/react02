import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function News() {
    const isAuthenticated = useContext(AuthContext);

  return (
    <div>
      <h1>Auth Status:</h1>
      <p>{isAuthenticated ? "Logged In" : "Logged Out"}</p>

      <h1 className="text-2xl font-bold text-purple-600">
        News Page Working
      </h1>
    </div>
  );
}

export default News;
