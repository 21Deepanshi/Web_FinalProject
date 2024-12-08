import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import ErrorMessage from '../../Components/ErrorMessage';

const SignIn = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to backend
      const response = await fetch('http://localhost:7000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      
      // Save token to localStorage or sessionStorage
      localStorage.setItem('token', data.token);
      setSuccess(true);
      setError('');

      onLoginSuccess();
      navigate('/');
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setShowModal(true);
    }
  };

  return (
    <div>
      <div className="signin-page">
      {showModal && (
        <ErrorMessage
          message={error}
          onClose={() => setShowModal(false)}
        />
      )}
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p>Sign in to access your account and manage your tasks.</p>

          {/* {error && <p className="error">{error}</p>} */}
          {success && <p className="success">Login successful!</p>}

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>
          <div className="signin-links">
            <p><a href="/forgot-password">Forgot Password?</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
