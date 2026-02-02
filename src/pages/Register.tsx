import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    console.log('Register Successful');
    console.log('Email:', email);
  };

  return (
    <form className="w-80 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <div className="mb-3">
        <label htmlFor="email" className="block mb-1 text-sm">Email</label>
        <input
          id="email"
          type="email"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 text-sm">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Confirm Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Register
      </button>

      <div className="mt-4 text-center">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          Already have an account? Login
        </Link>
      </div>
    </form>
  );
}

export default Register;
