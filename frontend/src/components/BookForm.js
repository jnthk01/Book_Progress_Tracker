import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import commonStyles from '../styles/commonStyles';
import theme from '../styles/theme';
import { toast } from 'react-toastify';
import '../styles/animations.css';

function BookForm() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('Fiction');
  const [pagesTotal, setPagesTotal] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (parseInt(pagesRead, 10) === parseInt(pagesTotal, 10) && parseInt(pagesTotal, 10) > 0) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [pagesRead, pagesTotal]);

  const handleCompletedChange = (e) => {
    const checked = e.target.checked;
    setIsCompleted(checked);
    if (checked) {
      setPagesRead(pagesTotal);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!pagesTotal || parseInt(pagesTotal) <= 0) newErrors.pagesTotal = 'Total pages must be positive';
    if (!pagesRead || parseInt(pagesRead) < 0) newErrors.pagesRead = 'Pages read cannot be negative';
    if (parseInt(pagesRead) > parseInt(pagesTotal)) newErrors.pagesRead = 'Pages read cannot exceed total pages';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setIsLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please log in to save books.');
        setIsLoading(false);
        setIsSubmitting(false);
        return;
      }

      const bookData = {
        title,
        genre,
        pages_total: parseInt(pagesTotal),
        pages_read: parseInt(pagesRead),
        is_completed: isCompleted,
      };

      await axios.post('http://127.0.0.1:5000/api/books', bookData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Book added successfully!');
      
      // Reset form after successful submission
      setTitle('');
      setGenre('Fiction');
      setPagesTotal('');
      setPagesRead('');
      setIsCompleted(false);
      setErrors({});
    } catch (error) {
      toast.error('Failed to save book: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const getInputStyle = (fieldName, hasError = false) => ({
    ...commonStyles.input,
    ...(focusedField === fieldName ? commonStyles.inputFocused : {}),
    ...(hasError ? commonStyles.inputError : {})
  });

  return (
    <div style={commonStyles.container} className="fade-in">
      <div style={{
        ...commonStyles.card,
        position: 'relative',
        maxWidth: '600px',
        width: '100%'
      }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <Link to="/home" style={{...commonStyles.submitButton, color: 'black'}}>Home</Link>
        </div>
        
        <h2 style={commonStyles.title}>Add New Book</h2>
        <p style={commonStyles.subtitle}>Add a book to your personal collection</p>

        {isLoading ? (
          <div style={commonStyles.loading} className="pulse">
            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
              <div className="spin" style={{ 
                width: '20px', 
                height: '20px', 
                border: `2px solid ${theme.textLight}`, 
                borderTop: '2px solid transparent', 
                borderRadius: '50%' 
              }}></div>
              Setting up form...
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
            <div style={commonStyles.formGroup}>
              <label style={commonStyles.label}>Book Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                onFocus={() => setFocusedField('title')}
                onBlur={() => setFocusedField(null)}
                required 
                placeholder="Enter the book title"
                style={getInputStyle('title', errors.title)}
              />
              {errors.title && (
                <div style={commonStyles.errorMessage}>
                  ⚠️ {errors.title}
                </div>
              )}
            </div>

            <div style={commonStyles.formGroup}>
              <label style={commonStyles.label}>Genre</label>
              <select 
                value={genre} 
                onChange={(e) => setGenre(e.target.value)} 
                onFocus={() => setFocusedField('genre')}
                onBlur={() => setFocusedField(null)}
                required 
                style={getInputStyle('genre')}
              >
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Fantasy">Fantasy</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: theme.spacing.md, flexWrap: 'wrap' }}>
              <div style={{ ...commonStyles.formGroup, flex: 1, minWidth: '200px' }}>
                <label style={commonStyles.label}>Total Pages</label>
                <input 
                  type="number" 
                  value={pagesTotal} 
                  onChange={(e) => setPagesTotal(e.target.value)} 
                  onFocus={() => setFocusedField('pagesTotal')}
                  onBlur={() => setFocusedField(null)}
                  required 
                  min="1"
                  placeholder="e.g. 350"
                  style={getInputStyle('pagesTotal', errors.pagesTotal)}
                />
                {errors.pagesTotal && (
                  <div style={commonStyles.errorMessage}>
                    ⚠️ {errors.pagesTotal}
                  </div>
                )}
              </div>

              <div style={{ ...commonStyles.formGroup, flex: 1, minWidth: '200px' }}>
                <label style={commonStyles.label}>Pages Read</label>
                <input 
                  type="number" 
                  value={pagesRead} 
                  onChange={(e) => setPagesRead(e.target.value)} 
                  onFocus={() => setFocusedField('pagesRead')}
                  onBlur={() => setFocusedField(null)}
                  required 
                  min="0"
                  placeholder="e.g. 150"
                  style={getInputStyle('pagesRead', errors.pagesRead)}
                />
                {errors.pagesRead && (
                  <div style={commonStyles.errorMessage}>
                    ⚠️ {errors.pagesRead}
                  </div>
                )}
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: theme.spacing.md,
              padding: theme.spacing.md,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: theme.borderRadius.lg,
              backdropFilter: 'blur(10px)'
            }}>
              <input 
                type="checkbox" 
                id="completed"
                checked={isCompleted} 
                onChange={handleCompletedChange}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: theme.success
                }}
              />
              <label htmlFor="completed" style={{
                ...commonStyles.label,
                textTransform: 'none',
                fontSize: theme.fontSizes.base,
                cursor: 'pointer'
              }}>
                Mark as completed
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{
                ...commonStyles.submitButton,
                ...commonStyles.buttonSuccess,
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                  <div className="spin" style={{ 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid white', 
                    borderTop: '2px solid transparent', 
                    borderRadius: '50%' 
                  }}></div>
                  Adding Book...
                </div>
              ) : (
                '+ Add Book'
              )}
            </button>
          </form>
        )}

        <div style={{ ...commonStyles.textCenter, marginTop: theme.spacing.lg }}>
          <Link to="/books" style={commonStyles.link}>← Back to Book List</Link>
        </div>
      </div>
    </div>
  );
}

export default BookForm;
