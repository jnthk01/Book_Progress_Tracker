import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import theme from '../styles/theme';
import commonStyles from '../styles/commonStyles';
import { toast } from 'react-toastify';
import '../styles/animations.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [usernameAvailability, setUsernameAvailability] = useState({
    available: true,
    message: '',
  });
  const [passwordValidity, setPasswordValidity] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const checkUsernameAvailability = useCallback(async (username) => {
    if (username.length < 3) {
      setUsernameAvailability({ available: false, message: '' });
      return;
    }
    try {
      const response = await axios.get(`http://127.0.0.1:5000/auth/check-username?username=${username}`);
      if (response.data.available) {
        setUsernameAvailability({ available: true, message: 'Username is available' });
      } else {
        setUsernameAvailability({ available: false, message: 'Username is already taken' });
      }
    } catch (error) {
      setUsernameAvailability({ available: false, message: 'Error checking username' });
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (username) {
        checkUsernameAvailability(username);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [username, checkUsernameAvailability]);

  useEffect(() => {
    setPasswordValidity({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const isPasswordValid = () => {
    return Object.values(passwordValidity).every(Boolean);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!username || username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }
    if (!usernameAvailability.available) {
        newErrors.username = usernameAvailability.message;
    }
    if (!isPasswordValid()) {
      newErrors.password = 'Please ensure your password meets all the requirements.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await axios.post('http://127.0.0.1:5000/auth/register', {
        username,
        password,
      });
      toast.success('Account created successfully! Please sign in.');
      setUsername('');
      setPassword('');
      setErrors({});
    } catch (error) {
      toast.error('Registration failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const getInputStyle = (fieldName, hasError = false) => ({
    ...commonStyles.input,
    ...(focusedField === fieldName ? commonStyles.inputFocused : {}),
    ...(hasError ? commonStyles.inputError : {})
  });

  const PasswordRequirement = ({ isValid, text }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, color: isValid ? theme.success : theme.error }}>
      <span>{isValid ? '✓' : '✗'}</span>
      <span style={{ fontSize: theme.fontSizes.sm }}>{text}</span>
    </div>
  );

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
          <h2 style={commonStyles.title}>Join Us</h2>
          <p style={commonStyles.subtitle}>Create your book collection account</p>
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
              placeholder="Choose a username (min 3 characters)"
              style={getInputStyle('username', errors.username || !usernameAvailability.available)}
              autoComplete="username"
            />
            {username.length > 0 && (
              <div style={{ fontSize: theme.fontSizes.sm, color: usernameAvailability.available ? theme.success : theme.error }}>
                {usernameAvailability.message}
              </div>
            )}
            {errors.username && (
              <div style={commonStyles.errorMessage}>
                ⚠️ {errors.username}
              </div>
            )}
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
              placeholder="Create a strong password"
              style={getInputStyle('password', errors.password)}
              autoComplete="new-password"
            />
            <div style={{ marginTop: theme.spacing.md, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing.sm }}>
              <PasswordRequirement isValid={passwordValidity.minLength} text="At least 8 characters" />
              <PasswordRequirement isValid={passwordValidity.uppercase} text="One uppercase letter" />
              <PasswordRequirement isValid={passwordValidity.lowercase} text="One lowercase letter" />
              <PasswordRequirement isValid={passwordValidity.number} text="One number" />
              <PasswordRequirement isValid={passwordValidity.specialChar} text="One special character" />
            </div>
            {errors.password && (
              <div style={commonStyles.errorMessage}>
                ⚠️ {errors.password}
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !isPasswordValid() || !usernameAvailability.available}
            style={{
              ...commonStyles.submitButton,
              ...commonStyles.buttonSuccess,
              marginTop: theme.spacing.md,
              opacity: (isLoading || !isPasswordValid() || !usernameAvailability.available) ? 0.7 : 1,
              cursor: (isLoading || !isPasswordValid() || !usernameAvailability.available) ? 'not-allowed' : 'pointer'
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
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div style={{
          ...commonStyles.loginLink,
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: theme.spacing.lg
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            ...commonStyles.link,
            fontWeight: theme.fontWeights.bold
          }}>
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;