import React from 'react';
import { Link } from 'react-router-dom';
import commonStyles from '../styles/commonStyles';
import theme from '../styles/theme';
import '../styles/animations.css';

function NotFound() {
  return (
    <div style={commonStyles.container} className="fade-in">
      <div style={{
        ...commonStyles.card,
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: theme.spacing.xl }}>
          <div style={{ 
            fontSize: '6rem', 
            marginBottom: theme.spacing.md,
            background: theme.gradientPrimary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: theme.fontWeights.bold
          }}>404</div>
          <h2 style={{
            ...commonStyles.title,
            marginBottom: theme.spacing.md
          }}>Page Not Found</h2>
          <p style={{
            ...commonStyles.subtitle,
            marginBottom: theme.spacing.xl
          }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md, alignItems: 'center' }}>
          <Link 
            to="/home" 
            style={{
              ...commonStyles.submitButton,
              fontSize: theme.fontSizes.base
            }}
          >
            🏠 Go Home
          </Link>
          <Link 
            to="/books" 
            style={{
              ...commonStyles.link,
              fontSize: theme.fontSizes.base
            }}
          >
            📚 View Books
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;