import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/register', {
        username,
        password,
      });
      setMessage('Registration successful!');
      console.log('User registered:', response.data);
    } catch (error) {
      setMessage('Registration failed: ' + (error.response?.data?.error || error.message));
      console.error('Registration error:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
