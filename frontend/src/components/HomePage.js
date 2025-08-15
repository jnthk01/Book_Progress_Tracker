import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import commonStyles from '../styles/commonStyles';
import theme from '../styles/theme';
import AuthContext from '../context/AuthContext';
import '../styles/animations.css';

function HomePage() {
  const { logout } = useContext(AuthContext);

  return (
    <div style={commonStyles.container} className="fade-in">
      <div style={{
        ...commonStyles.card,
        maxWidth: '500px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
          <div style={{ 
            fontSize: theme.fontSizes['4xl'], 
            marginBottom: theme.spacing.md 
          }}>📚</div>
          <h2 style={commonStyles.title}>Welcome Back!</h2>
          <p style={commonStyles.subtitle}>
            Manage your personal book collection
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          <Link 
            to="/books" 
            style={{
              ...commonStyles.smallButton,
              background: `linear-gradient(135deg, ${theme.info} 0%, ${theme.infoLight} 100%)`,
              color: theme.textLight,
              fontWeight: theme.fontWeights.bold
            }}
          >
            📖 View My Books
          </Link>
          
          <Link 
            to="/add-book" 
            style={{
              ...commonStyles.smallButton,
              background: `linear-gradient(135deg, ${theme.success} 0%, ${theme.successLight} 100%)`
            }}
          >
            ➕ Add New Book
          </Link>
          
          <button
            onClick={logout}
            style={{ 
              ...commonStyles.smallButtonDanger,
              marginTop: theme.spacing.lg
            }}
          >
            🚪 Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
