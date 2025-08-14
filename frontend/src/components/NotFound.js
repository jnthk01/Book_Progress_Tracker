import React from 'react';
import { Link } from 'react-router-dom';
import commonStyles from '../styles/commonStyles';
import theme from '../styles/theme';

function NotFound() {
  return (
    <div style={commonStyles.container}>
      <div style={commonStyles.card}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <Link to="/home" style={commonStyles.link}>Back to Home</Link>
        </div>
        <h2 style={commonStyles.title}>404 - Page Not Found</h2>
        <p style={{...commonStyles.message, color: theme.textLight}}>
          The page you are looking for does not exist.
        </p>
        <div style={commonStyles.loginLink}>
          <Link to="/" style={commonStyles.link}>Go to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;