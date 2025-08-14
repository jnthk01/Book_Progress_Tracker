import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// --- Style and Theme Definitions ---

// 1. Define a theme object for colors, making it easy to change the look.
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

// 2. Centralize all style objects. This cleans up the JSX immensely.
const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw', // Use vw for viewport width to ensure it spans the screen
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '20px',
    boxSizing: 'border-box', // Ensure padding doesn't add to the total width
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
    boxSizing: 'border-box', // THE FIX: Include padding and border in the element's total width
  },
  inputFocused: { // Style for when the input is focused
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
    boxSizing: 'border-box', // Good practice to add this to buttons as well
  },
  submitButtonHover: { // Style for when the button is hovered
    backgroundColor: theme.primaryDark,
    transform: 'scale(1.05)',
  },
  message: {
    textAlign: 'center',
    marginTop: '20px',
    fontWeight: '500',
  },
  loginLink: {
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

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // 3. Use state to track hover and focus for dynamic styling
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/register', {
        username,
        password,
      });
      setMessage('Registration successful!');
    } catch (error) {
      setMessage('Registration failed: ' + (error.response?.data?.error || error.message));
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
        <h2 style={styles.title}>Register</h2>
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
            Register
          </button>
        </form>

        {message && <p style={messageStyle}>{message}</p>}

        <p style={styles.loginLink}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
