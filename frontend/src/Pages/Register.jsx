import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthContext';
import Modal from '../Components/Modal'; // Import Modal here

const Register = () => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [modalMsg, setModalMsg] = useState(null);
  const [modalError, setModalError] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (modalMsg) {
      setModalMsg(null);
      setModalError(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setModalMsg('All fields are required');
      setModalError(true);
      return;
    }
    try {
      await register(form);
      setModalMsg('Registration successful!');
      setModalError(false);
      setForm({ username: '', email: '', password: '' });
    } catch (err) {
      setModalMsg(err.message || 'Registration failed');
      setModalError(true);
    }
  };

  const closeModal = () => {
    setModalMsg(null);
    setModalError(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center  from-pink-300 via-purple-300 to-indigo-400 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 tracking-wide text-gray-800">
          Sign up
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          autoComplete="username"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          autoComplete="email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          autoComplete="new-password"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-400 hover:text-white text-white font-semibold py-3 rounded-md transition duration-300"
        >
          Register
        </button>
      </form>

      <p className="mt-6 text-gray-700 text-center">
        Already have an account?{' '}
        <a href="/login" className="text-pink-600 font-semibold hover:underline">
          Log in
        </a>
      </p>

      {/* Modal */}
      {modalMsg && (
        <Modal message={modalMsg} onClose={closeModal} isError={modalError} />
      )}
    </div>
  );
};

export default Register;
