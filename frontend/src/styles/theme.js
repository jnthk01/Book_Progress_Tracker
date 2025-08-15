const theme = {
  // Primary colors with modern gradients
  primary: '#667eea',
  primaryDark: '#5a67d8',
  primaryLight: '#7c3aed',
  
  // Modern gradient combinations
  gradientStart: '#667eea',
  gradientEnd: '#764ba2',
  gradientCard: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradientButton: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradientProgress: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  
  // Background colors
  backgroundPrimary: '#f8fafc',
  backgroundSecondary: '#ffffff',
  backgroundDark: '#1a202c',
  
  // Text colors
  textLight: '#ffffff',
  textDark: '#2d3748',
  textSecondary: '#718096',
  textMuted: '#a0aec0',
  
  // Border and divider colors
  border: '#e2e8f0',
  borderLight: '#f7fafc',
  borderDark: '#cbd5e0',
  
  // Status colors
  success: '#48bb78',
  successLight: '#68d391',
  error: '#f56565',
  errorLight: '#fc8181',
  warning: '#ed8936',
  warningLight: '#f6ad55',
  info: '#4299e1',
  infoLight: '#63b3ed',
  
  // Shadow colors
  shadowLight: 'rgba(0, 0, 0, 0.1)',
  shadowMedium: 'rgba(0, 0, 0, 0.15)',
  shadowDark: 'rgba(0, 0, 0, 0.25)',
  
  // Typography
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Spacing scale
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  
  // Border radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
};

export default theme;
