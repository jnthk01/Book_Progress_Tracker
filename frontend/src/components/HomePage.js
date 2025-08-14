import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import commonStyles from '../styles/commonStyles';
import theme from '../styles/theme';
import AuthContext from '../context/AuthContext';

function HomePage() {
  const { logout } = useContext(AuthContext);

  return (
    <div style={commonStyles.container}>
      <div style={commonStyles.card}>
        <h2 style={commonStyles.title}>Welcome!</h2>
        <p style={{...commonStyles.message, color: theme.textLight, marginBottom: '30px'}}>
          Navigate through the application:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link to="/books" style={commonStyles.submitButton}>
            View Books
          </Link>
          <Link to="/add-book" style={commonStyles.submitButton}>
            Add New Book
          </Link>
          {/* Add more links to other pages as they are created */}
          <button
            onClick={logout}
            style={{ ...commonStyles.submitButton, backgroundColor: theme.error, marginTop: '20px' }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
