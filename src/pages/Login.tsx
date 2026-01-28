import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Email and Password are required');
      return;
    }

    setError('');
    console.log('Login successful');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
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
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Login
      </button>
      <div className="mt-4 text-center">
        <Link to="/register" className="text-sm text-blue-600 hover:underline">
          Don’t have an account? Register
        </Link>
      </div>
    </form>
  );
}

export default Login;
