import theme from './theme';

// Helper function to create media queries
const mediaQuery = (breakpoint) => `@media (max-width: ${theme.breakpoints[breakpoint]})`;

const commonStyles = {
  // Main container with responsive padding
  container: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: theme.backgroundPrimary,
    padding: theme.spacing.xl,
    boxSizing: 'border-box',
    // Responsive padding
    [`${mediaQuery('md')}`]: {
      padding: theme.spacing.lg,
    },
    [`${mediaQuery('sm')}`]: {
      padding: theme.spacing.md,
      alignItems: 'center',
    },
  },

  // Modern card design with responsive sizing
  card: {
    background: theme.gradientCard,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    width: '100%',
    maxWidth: '900px',
    boxShadow: `0 20px 40px ${theme.shadowMedium}`,
    transition: `all ${theme.transitions.normal}`,
    position: 'relative',
    overflow: 'hidden',
    // Responsive padding and sizing
    [`${mediaQuery('lg')}`]: {
      maxWidth: '700px',
      padding: theme.spacing.lg,
    },
    [`${mediaQuery('md')}`]: {
      maxWidth: '100%',
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
    },
    [`${mediaQuery('sm')}`]: {
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      boxShadow: `0 10px 25px ${theme.shadowLight}`,
    },
  },

  // Enhanced card with hover effects
  cardInteractive: {
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 25px 50px ${theme.shadowDark}`,
    },
  },

  // Modern typography with responsive sizing
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    color: theme.textLight,
    fontSize: theme.fontSizes['3xl'],
    fontWeight: theme.fontWeights.bold,
    lineHeight: '1.2',
    letterSpacing: '-0.025em',
    // Responsive font sizes
    [`${mediaQuery('md')}`]: {
      fontSize: theme.fontSizes['2xl'],
      marginBottom: theme.spacing.lg,
    },
    [`${mediaQuery('sm')}`]: {
      fontSize: theme.fontSizes.xl,
      marginBottom: theme.spacing.md,
    },
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    color: theme.textLight,
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.medium,
    opacity: 0.9,
    [`${mediaQuery('sm')}`]: {
      fontSize: theme.fontSizes.base,
      marginBottom: theme.spacing.md,
    },
  },

  // Responsive form layout
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    [`${mediaQuery('sm')}`]: {
      flexDirection: 'column',
      gap: theme.spacing.sm,
    },
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    flex: '1',
    minWidth: '200px',
    [`${mediaQuery('sm')}`]: {
      minWidth: '100%',
    },
  },

  // Enhanced labels
  label: {
    fontWeight: theme.fontWeights.semibold,
    color: theme.textLight,
    fontSize: theme.fontSizes.sm,
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
  },

  // Modern input styling with enhanced focus states
  input: {
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    borderRadius: theme.borderRadius.lg,
    border: `2px solid transparent`,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.medium,
    color: theme.textDark,
    boxSizing: 'border-box',
    transition: `all ${theme.transitions.fast}`,
    backdropFilter: 'blur(10px)',
    '&::placeholder': {
      color: theme.textMuted,
      fontWeight: theme.fontWeights.normal,
    },
    [`${mediaQuery('sm')}`]: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.fontSizes.sm,
    },
  },

  inputFocused: {
    borderColor: theme.textLight,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: `0 0 0 4px rgba(255, 255, 255, 0.3)`,
    outline: 'none',
    transform: 'translateY(-1px)',
  },

  inputError: {
    borderColor: theme.error,
    backgroundColor: 'rgba(245, 101, 101, 0.1)',
  },

  // Modern button design with gradients - reduced size
  submitButton: {
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    background: theme.gradientButton,
    color: theme.textLight,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontWeight: theme.fontWeights.semibold,
    fontSize: theme.fontSizes.sm,
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
    transition: `all ${theme.transitions.fast}`,
    boxShadow: `0 2px 8px ${theme.shadowLight}`,
    position: 'relative',
    overflow: 'hidden',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '40px',
    [`${mediaQuery('sm')}`]: {
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      fontSize: theme.fontSizes.xs,
      minHeight: '36px',
    },
  },

  submitButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 25px ${theme.shadowMedium}`,
    '&::before': {
      opacity: 1,
    },
  },

  // Button variants
  buttonSecondary: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    border: `2px solid rgba(255, 255, 255, 0.3)`,
  },


  buttonSuccess: {
    background: `linear-gradient(135deg, ${theme.success} 0%, ${theme.successLight} 100%)`,
  },

  buttonDanger: {
    background: `linear-gradient(135deg, ${theme.error} 0%, ${theme.errorLight} 100%)`,
  },

  // Small button variants
  smallButton: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    fontSize: theme.fontSizes.sm,
    minHeight: '32px',
    minWidth: '70px',
    borderRadius: theme.borderRadius.md,
    border: 'none',
    cursor: 'pointer',
    fontWeight: theme.fontWeights.medium,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    transition: 'all 0.2s ease',
    background: theme.gradientPrimary,
    color: theme.textLight,
    boxShadow: theme.shadowMedium,
    ':hover': {
      transform: 'translateY(-1px)',
      boxShadow: theme.shadowLarge,
    },
  },

  smallButtonDanger: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    fontSize: theme.fontSizes.sm,
    minHeight: '32px',
    minWidth: '70px',
    borderRadius: theme.borderRadius.md,
    border: 'none',
    cursor: 'pointer',
    fontWeight: theme.fontWeights.medium,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    transition: 'all 0.2s ease',
    background: `linear-gradient(135deg, ${theme.error} 0%, ${theme.errorLight} 100%)`,
    color: theme.textLight,
    boxShadow: theme.shadowMedium,
    ':hover': {
      transform: 'translateY(-1px)',
      boxShadow: theme.shadowLarge,
    },
  },

  smallButtonSecondary: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    fontSize: theme.fontSizes.sm,
    minHeight: '32px',
    minWidth: '60px',
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.borderLight}`,
    cursor: 'pointer',
    fontWeight: theme.fontWeights.medium,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    transition: 'all 0.2s ease',
    background: 'rgba(255, 255, 255, 0.1)',
    color: theme.textSecondary,
    ':hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-1px)',
    },
  },

  // Enhanced message styling
  message: {
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    fontWeight: theme.fontWeights.medium,
    fontSize: theme.fontSizes.base,
    lineHeight: '1.6',
    [`${mediaQuery('sm')}`]: {
      fontSize: theme.fontSizes.sm,
      marginTop: theme.spacing.md,
    },
  },

  // Modern link styling
  loginLink: {
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: theme.fontSizes.base,
    [`${mediaQuery('sm')}`]: {
      fontSize: theme.fontSizes.sm,
      marginTop: theme.spacing.md,
    },
  },

  link: {
    color: theme.textLight,
    fontWeight: theme.fontWeights.semibold,
    textDecoration: 'none',
    borderBottom: '2px solid transparent',
    transition: `all ${theme.transitions.fast}`,
    '&:hover': {
      borderBottomColor: theme.textLight,
      opacity: 0.8,
    },
  },

  // Responsive grid for book list
  bookListContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: theme.spacing.lg,
    marginTop: theme.spacing.xl,
    // Responsive grid adjustments
    [`${mediaQuery('lg')}`]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: theme.spacing.md,
    },
    [`${mediaQuery('md')}`]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: theme.spacing.md,
    },
    [`${mediaQuery('sm')}`]: {
      gridTemplateColumns: '1fr',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.lg,
    },
  },

  // Enhanced book card with modern design
  bookCard: {
    backgroundColor: theme.backgroundSecondary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    boxShadow: `0 4px 20px ${theme.shadowLight}`,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    transition: `all ${theme.transitions.normal}`,
    cursor: 'pointer',
    border: `1px solid ${theme.borderLight}`,
    position: 'relative',
    overflow: 'hidden',
    [`${mediaQuery('sm')}`]: {
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
    },
  },

  bookCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 40px ${theme.shadowMedium}`,
    borderColor: theme.primary,
  },

  // Enhanced typography for book cards
  bookTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.textDark,
    marginBottom: theme.spacing.sm,
    lineHeight: '1.3',
    [`${mediaQuery('sm')}`]: {
      fontSize: theme.fontSizes.lg,
    },
  },

  bookMeta: {
    fontSize: theme.fontSizes.sm,
    color: theme.textSecondary,
    lineHeight: '1.5',
    fontWeight: theme.fontWeights.medium,
  },

  // Progress bar styling
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: theme.borderLight,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },

  progressFill: {
    height: '100%',
    background: theme.gradientProgress,
    borderRadius: theme.borderRadius.full,
    transition: `width ${theme.transitions.slow}`,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      animation: 'shimmer 2s infinite',
    },
  },

  // Action buttons container
  actionButtons: {
    display: 'flex',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
    [`${mediaQuery('sm')}`]: {
      flexDirection: 'column',
      gap: theme.spacing.xs,
    },
  },

  // Pagination styling
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
    [`${mediaQuery('sm')}`]: {
      flexDirection: 'column',
      gap: theme.spacing.sm,
    },
  },

  paginationButton: {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: theme.textLight,
    border: `1px solid rgba(255, 255, 255, 0.3)`,
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontWeight: theme.fontWeights.medium,
    fontSize: theme.fontSizes.sm,
    transition: `all ${theme.transitions.fast}`,
    backdropFilter: 'blur(10px)',
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },

  paginationInfo: {
    color: theme.textLight,
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.medium,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.md,
    backdropFilter: 'blur(10px)',
  },

  // Error message styling
  errorMessage: {
    color: theme.errorLight,
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.medium,
    marginTop: theme.spacing.xs,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },

  // Loading state
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    color: theme.textLight,
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.medium,
  },

  // Empty state
  emptyState: {
    textAlign: 'center',
    padding: theme.spacing.xl,
    color: theme.textLight,
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.medium,
    opacity: 0.8,
  },

  // Utility classes
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textCenter: {
    textAlign: 'center',
  },

  // Animation keyframes (to be used with CSS-in-JS or global CSS)
  animations: {
    fadeIn: {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    slideIn: {
      from: { transform: 'translateX(-100%)' },
      to: { transform: 'translateX(0)' },
    },
    shimmer: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' },
    },
  },
};

export default commonStyles;
