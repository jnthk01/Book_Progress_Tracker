import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import theme from '../styles/theme'; // eslint-disable-next-line no-unused-vars
import commonStyles from '../styles/commonStyles';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/login', {
        username,
        password,
      });
      toast.success('Login successful!');
      console.log('Access Token:', response.data.access_token);
      login(response.data.access_token);
    } catch (error) {
      toast.error('Login failed: ' + (error.response?.data?.error || error.message));
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  const buttonStyle = {
    ...commonStyles.submitButton,
    ...(isButtonHovered ? commonStyles.submitButtonHover : {}),
  };

  const usernameInputStyle = {
    ...commonStyles.input,
    ...(isUsernameFocused ? commonStyles.inputFocused : {}),
  };

  const passwordInputStyle = {
    ...commonStyles.input,
    ...(isPasswordFocused ? commonStyles.inputFocused : {}),
  };
  
  return (
    <div style={commonStyles.container}>
      <div style={commonStyles.card}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <Link to="/home" style={commonStyles.link}>Back to Home</Link>
        </div>
        <h2 style={commonStyles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={commonStyles.form}>
          <div>
            <label style={commonStyles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={usernameInputStyle}
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
            />
          </div>
          <div>
            <label style={commonStyles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={passwordInputStyle}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Login
          </button>
        </form>

        <p style={commonStyles.loginLink}>
          Don't have an account? <Link to="/register" style={commonStyles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;