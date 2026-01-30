import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404
      </h1>

      <p className="mb-6 text-gray-700">
        Page not found
      </p>

      <Link
        to="/"
        className="text-blue-600 hover:underline"
      >
        Go back to Login
      </Link>
    </div>
  );
}

export default NotFound;
