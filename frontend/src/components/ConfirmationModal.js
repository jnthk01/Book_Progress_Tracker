import React from 'react';
import commonStyles from '../styles/commonStyles';
import theme from '../styles/theme';
import '../styles/animations.css';

function ConfirmationModal({ show, title = "Confirm Action", message, onConfirm, onCancel }) {
  if (!show) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: theme.spacing.md
    }} className="fade-in">
      <div style={{
        ...commonStyles.card,
        maxWidth: '450px',
        width: '100%',
        margin: 0,
        transform: 'scale(1)',
        animation: 'slideIn 0.3s ease-out'
      }} className="bounce">
        <div style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
          <div style={{ 
            fontSize: theme.fontSizes['3xl'], 
            marginBottom: theme.spacing.md 
          }}>⚠️</div>
          <h3 style={{
            ...commonStyles.title,
            fontSize: theme.fontSizes.xl,
            marginBottom: theme.spacing.md
          }}>
            {title}
          </h3>
          <p style={{
            ...commonStyles.subtitle,
            fontSize: theme.fontSizes.base
          }}>
            {message}
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          gap: theme.spacing.md,
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onCancel}
            style={{
              ...commonStyles.submitButton,
              backgroundColor: theme.textSecondary,
              minWidth: '120px',
              fontSize: theme.fontSizes.base
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              ...commonStyles.submitButton,
              ...commonStyles.buttonDanger,
              minWidth: '120px',
              fontSize: theme.fontSizes.base
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
