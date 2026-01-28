import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Forgot password email:', email);
  };

  return (
    <form className="w-80 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Reset Password
      </button>

      <div className="mt-4 text-center">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          Back to Login
        </Link>
      </div>
    </form>
  );
}

export default ForgotPassword;
