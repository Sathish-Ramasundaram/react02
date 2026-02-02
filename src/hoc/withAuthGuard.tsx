import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";


function withAuthGuard(Wrapped: React.ComponentType<any>) {
  return function Guarded(props: any) {
    const auth = useContext(AuthContext);

    console.log("Auth inside HOC:", auth);

    if (!auth?.isAuthenticated) {
      return (
  <div className="fixed inset-0 bg-gray-200 flex items-center justify-center">
    <div className="bg-red-600 text-white p-6 rounded shadow text-center">
      <h2 className="text-xl font-bold mb-2">
        Access Denied
      </h2>

      <p className="mb-4">
        You must be logged in to view this page.
      </p>

      <Link to="/" className="underline font-semibold">
        Go to Login
      </Link>
    </div>
  </div>
);

    }

    return <Wrapped {...props} />;
  };
}

export default withAuthGuard;
