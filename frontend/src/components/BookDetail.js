import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import commonStyles from '../styles/commonStyles';
import theme from '../styles/theme';
import { toast } from 'react-toastify';
import '../styles/animations.css';

function BookDetail() {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          toast.error('Please log in to view book details.');
          setIsLoading(false);
          return;
        }
        const response = await axios.get(` https://book-progress-tracker.onrender.com/api/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBook(response.data);
      } catch (error) {
        toast.error('Failed to fetch book details: ' + (error.response?.data?.error || error.message));
        console.error('Fetch book details error:', error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  if (isLoading) {
    return (
      <div style={commonStyles.container} className="fade-in">
        <div style={commonStyles.card}>
          <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
            <Link to="/home" style={commonStyles.submitButton}>Home</Link>
          </div>
          <div style={commonStyles.loading} className="pulse">
            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
              <div className="spin" style={{ 
                width: '20px', 
                height: '20px', 
                border: `2px solid ${theme.textLight}`, 
                borderTop: '2px solid transparent', 
                borderRadius: '50%' 
              }}></div>
              Loading book details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div style={commonStyles.container} className="fade-in">
        <div style={commonStyles.card}>
          <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
            <Link to="/home" style={commonStyles.submitButton}>Home</Link>
          </div>
          <div style={commonStyles.emptyState}>
            <div style={{ fontSize: theme.fontSizes['2xl'], marginBottom: theme.spacing.md }}>❌</div>
            <p>Book not found.</p>
          </div>
          <div style={{ ...commonStyles.textCenter, marginTop: theme.spacing.lg }}>
            <Link to="/books" style={commonStyles.link}>← Back to Book List</Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = typeof book.progress_percent === 'number' ? book.progress_percent : 0;

  return (
    <div style={commonStyles.container} className="fade-in">
      <div style={{
        ...commonStyles.card,
        maxWidth: '600px'
      }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <Link to="/home" style={commonStyles.smallButtonSecondary}>Home</Link>
        </div>
        
        <h2 style={commonStyles.title}>Book Details</h2>
        
        <div style={{
          backgroundColor: theme.backgroundSecondary,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.xl,
          boxShadow: `0 4px 20px ${theme.shadowLight}`,
          border: `1px solid ${theme.borderLight}`
        }}>
          <h3 style={{
            fontSize: theme.fontSizes['2xl'],
            fontWeight: theme.fontWeights.bold,
            color: theme.textDark,
            marginBottom: theme.spacing.lg,
            textAlign: 'center'
          }}>
            {book.title}
          </h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: theme.spacing.lg
          }}>
            <span style={{
              backgroundColor: theme.primary,
              color: theme.textLight,
              padding: `${theme.spacing.xs} ${theme.spacing.md}`,
              borderRadius: theme.borderRadius.full,
              fontSize: theme.fontSizes.sm,
              fontWeight: theme.fontWeights.semibold,
              textTransform: 'uppercase'
            }}>
              {book.genre}
            </span>
            {book.is_completed && (
              <span style={{
                backgroundColor: theme.success,
                color: theme.textLight,
                padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                borderRadius: theme.borderRadius.full,
                fontSize: theme.fontSizes.sm,
                fontWeight: theme.fontWeights.semibold,
                textTransform: 'uppercase',
                marginLeft: theme.spacing.sm
              }}>
                ✓ Completed
              </span>
            )}
          </div>

          <div style={{ marginBottom: theme.spacing.lg }}>
            <div style={commonStyles.flexBetween}>
              <p style={{
                fontSize: theme.fontSizes.lg,
                color: theme.textSecondary,
                fontWeight: theme.fontWeights.medium
              }}>
                {book.pages_read} / {book.pages_total} pages
              </p>
              <p style={{
                fontSize: theme.fontSizes.lg,
                fontWeight: theme.fontWeights.bold,
                color: progress === 100 ? theme.success : theme.primary
              }}>
                {progress.toFixed(1)}%
              </p>
            </div>
            <div style={{
              ...commonStyles.progressBar,
              marginTop: theme.spacing.sm
            }}>
              <div style={{
                ...commonStyles.progressFill,
                width: `${Math.min(progress, 100)}%`
              }} />
            </div>
          </div>

          <div style={commonStyles.flexCenter}>
            <Link 
              to={`/edit-book/${book.id}`}
              style={commonStyles.smallButton}
            >
              ✏️ Edit Book
            </Link>
          </div>
        </div>
        
        <div style={{ ...commonStyles.textCenter, marginTop: theme.spacing.xl }}>
          <Link to="/books" style={commonStyles.link}>← Back to Book List</Link>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;