import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// --- Style and Theme Definitions ---
// Using the exact same theme as the Register component for consistency.
const theme = {
  primary: '#6b73ff',
  primaryDark: '#5a63e0',
  gradientStart: '#6b73ff',
  gradientEnd: '#000dff',
  textLight: '#fff',
  textDark: '#333',
  textSecondary: '#555',
  border: '#ccc',
  success: 'green',
  error: 'red',
};

// Using the same style structure as the Register component.
const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    background: `linear-gradient(135deg, ${theme.gradientStart} 0%, ${theme.gradientEnd} 100%)`,
    borderRadius: '15px',
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: theme.textLight,
    fontSize: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: `1px solid ${theme.border}`,
    fontSize: '1rem',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxSizing: 'border-box',
  },
  inputFocused: {
    borderColor: theme.primary,
    boxShadow: `0 0 0 3px rgba(107, 115, 255, 0.4)`,
    outline: 'none',
  },
  submitButton: {
    padding: '12px',
    backgroundColor: theme.primary,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxSizing: 'border-box',
  },
  submitButtonHover: {
    backgroundColor: theme.primaryDark,
    transform: 'scale(1.05)',
  },
  message: {
    textAlign: 'center',
    marginTop: '20px',
    fontWeight: '500',
  },
  registerLink: {
    textAlign: 'center',
    marginTop: '20px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '20px'
  },
  link: {
    color: theme.textLight,
    fontWeight: 'bold',
  },
};

// --- React Component ---

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Use state to track hover and focus for dynamic styling
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
      setMessage('Login successful!');
      console.log('Access Token:', response.data.access_token);
      // You would typically store the token in localStorage or a context API
    } catch (error) {
      setMessage('Login failed: ' + (error.response?.data?.error || error.message));
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  // Combine base and conditional styles for cleaner JSX
  const buttonStyle = {
    ...styles.submitButton,
    ...(isButtonHovered ? styles.submitButtonHover : {}),
  };

  const usernameInputStyle = {
    ...styles.input,
    ...(isUsernameFocused ? styles.inputFocused : {}),
  };

  const passwordInputStyle = {
    ...styles.input,
    ...(isPasswordFocused ? styles.inputFocused : {}),
  };
  
  const messageStyle = {
    ...styles.message,
    color: message.includes('successful') ? theme.success : theme.error,
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label style={styles.label}>Username:</label>
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
            <label style={styles.label}>Password:</label>
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

        {message && <p style={messageStyle}>{message}</p>}

        <p style={styles.registerLink}>
          Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
