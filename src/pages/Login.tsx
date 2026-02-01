import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../api/authApi';
import AuthContext from "../context/AuthContext";


function Login() {

  const navigate = useNavigate();

  const auth = useContext(AuthContext);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Email and Password are required');
      return;
    }

    setLoading(true);

try {
  const result = await loginApi(email, password);
  setError("");
  setIsSuccess(true); // ✅ mark success
  auth?.login(); // ✅ global auth update
  navigate("/dashboard"); // ✅ redirect
} catch (err: any) {
  setError(err.message);
  setIsSuccess(false); // optional but safe
} finally {
  setLoading(false);
}

  };

  return (
    <>
    

    {isSuccess && (
  <p className="mb-3 text-sm text-green-600">
    Login successful
  </p>
)}


    <form className="w-80 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <div className="mb-3">
        <label className="block mb-1 text-sm">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* ---------- Password ------------  */}

      <div className="mb-4">
        <label className="block mb-1 text-sm">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4 text-right">
        <Link
          to="/forgot-password"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded text-white
    ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}
  `}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <div className="mt-4 text-center">
        <Link to="/register" className="text-sm text-blue-600 hover:underline">
          Don’t have an account? Register
        </Link>
      </div>
    </form>

    </>
  );
}

export default Login;
