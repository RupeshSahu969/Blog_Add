import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthContext';
import Modal from '../Components/Modal';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [modalMsg, setModalMsg] = useState(null);
  const [modalError, setModalError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (modalMsg) {
      setModalMsg(null);
      setModalError(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setModalMsg('Please fill in all fields.');
      setModalError(true);
      return;
    }

    setLoading(true);

    try {
      await login(form);
      setModalMsg('Login successful! Redirecting...');
      setModalError(false);
      setForm({ email: '', password: '' });

      setTimeout(() => {
        setModalMsg(null);
        // Redirect if needed
      }, 1500);
    } catch (err) {
      let message = 'Login failed.';
      if (err.response) {
        if (err.response.status === 400) {
          message = 'Invalid credentials. Please try again.';
        } else if (err.response.status === 500) {
          message = 'Server error. Please try again later.';
        } else {
          message = err.response.data?.message || 'An error occurred.';
        }
      }
      setModalMsg(message);
      setModalError(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalMsg(null);
    setModalError(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm animate-fadeIn"
      >
       <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
  Login
</h2>


        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          autoComplete="email"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 hover:text-white text-white font-medium py-3 rounded-md transition duration-300 flex justify-center items-center disabled:opacity-50"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="mt-6 text-white text-center text-sm">
        Don't have an account?{' '}
        <a href="/register" className="font-semibold underline">
          Register here
        </a>
      </p>

      {modalMsg && (
        <Modal message={modalMsg} onClose={closeModal} isError={modalError} />
      )}
    </div>
  );
};

export default Login;
