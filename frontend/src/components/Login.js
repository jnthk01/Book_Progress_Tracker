import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import theme from '../styles/theme';
import commonStyles from '../styles/commonStyles';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../styles/animations.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(' https://book-progress-tracker.onrender.com/auth/login', {
        username,
        password,
      });
      toast.success('Welcome back!');
      login(response.data.access_token);
    } catch (error) {
      toast.error('Login failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const getInputStyle = (fieldName) => ({
    ...commonStyles.input,
    ...(focusedField === fieldName ? commonStyles.inputFocused : {})
  });
  
  return (
    <div style={commonStyles.container} className="fade-in">
      <div style={{
        ...commonStyles.card,
        maxWidth: '450px'
      }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <Link to="/home" style={commonStyles.link}>← Home</Link>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
          <div style={{ 
            fontSize: theme.fontSizes['4xl'], 
            marginBottom: theme.spacing.md 
          }}>📚</div>
          <h2 style={commonStyles.title}>Welcome Back</h2>
          <p style={commonStyles.subtitle}>Sign in to your book collection</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
          <div style={commonStyles.formGroup}>
            <label style={commonStyles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocusedField('username')}
              onBlur={() => setFocusedField(null)}
              required
              placeholder="Enter your username"
              style={getInputStyle('username')}
              autoComplete="username"
            />
          </div>
          
          <div style={commonStyles.formGroup}>
            <label style={commonStyles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              required
              placeholder="Enter your password"
              style={getInputStyle('password')}
              autoComplete="current-password"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...commonStyles.submitButton,
              marginTop: theme.spacing.md,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                <div className="spin" style={{ 
                  width: '16px', 
                  height: '16px', 
                  border: '2px solid white', 
                  borderTop: '2px solid transparent', 
                  borderRadius: '50%' 
                }}></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div style={{
          ...commonStyles.loginLink,
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: theme.spacing.lg
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            ...commonStyles.link,
            fontWeight: theme.fontWeights.bold
          }}>
            Create one here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;