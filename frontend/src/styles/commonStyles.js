import theme from './theme';

const commonStyles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f9f9f9',
    padding: '30px',
    boxSizing: 'border-box',
  },
  card: {
    background: `linear-gradient(135deg, ${theme.gradientStart} 0%, ${theme.gradientEnd} 100%)`,
    borderRadius: '15px',
    padding: '30px',
    width: '100%',
    maxWidth: '900px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: theme.textLight,
    fontSize: '2.2rem',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '20px',
  },
  label: {
    fontWeight: '600',
    color: theme.textLight,
  },
  input: {
    flex: '1',
    minWidth: '180px',
    padding: '10px 14px',
    borderRadius: '8px',
    border: `1px solid ${theme.border}`,
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  inputFocused: {
    borderColor: theme.primary,
    boxShadow: `0 0 0 3px rgba(107, 115, 255, 0.4)`,
    outline: 'none',
  },
  submitButton: {
    padding: '12px 18px',
    backgroundColor: theme.primary,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  submitButtonHover: {
    backgroundColor: theme.primaryDark,
    transform: 'scale(1.05)',
  },
  message: {
    textAlign: 'center',
    marginTop: '20px',
    fontWeight: '500',
    fontSize: '1rem',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: '20px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1rem',
  },
  link: {
    color: theme.textLight,
    fontWeight: 'bold',
  },
  bookListContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px',
    marginTop: '20px',
  },

  bookCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  },
  bookCardHover: {
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
  },
  bookTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: theme.textDark,
    marginBottom: '3px',
  },
  bookMeta: {
    fontSize: '0.9rem',
    color: theme.textSecondary,
    lineHeight: '1.3',
  },
};

export default commonStyles;
