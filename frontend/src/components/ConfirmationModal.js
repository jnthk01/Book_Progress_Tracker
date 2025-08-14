import React from 'react';
import commonStyles from '../styles/commonStyles';
import theme from '../styles/theme';

function ConfirmationModal({ show, message, onConfirm, onCancel }) {
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
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        ...commonStyles.card,
        backgroundColor: 'white',
        maxWidth: '350px',
        padding: '25px',
        textAlign: 'center',
      }}>
        <p style={{ color: theme.textDark, marginBottom: '20px' }}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button
            onClick={onConfirm}
            style={{ ...commonStyles.submitButton, backgroundColor: theme.error, width: '100px' }}
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            style={{ ...commonStyles.submitButton, backgroundColor: '#888', width: '100px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
