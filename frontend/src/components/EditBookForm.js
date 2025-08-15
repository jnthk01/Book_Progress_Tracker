import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import commonStyles from '../styles/commonStyles';
import theme from '../styles/theme';
import { toast } from 'react-toastify';

function EditBookForm() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('Fiction');
  const [pagesTotal, setPagesTotal] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { bookId } = useParams();

  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        setIsLoading(true);
        try {
          const token = localStorage.getItem('access_token');
          if (!token) {
            toast.error('Please log in to edit books.');
            setIsLoading(false);
            return;
          }
          const response = await axios.get(`http://127.0.0.1:5000/api/books/${bookId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const book = response.data;
          setTitle(book.title);
          setGenre(book.genre);
          setPagesTotal(book.pages_total);
          setPagesRead(book.pages_read);
          setIsCompleted(book.is_completed);
        } catch (error) {
          toast.error('Failed to fetch book details: ' + (error.response?.data?.error || error.message));
        } finally {
          setIsLoading(false);
        }
      };
      fetchBook();
    }
  }, [bookId]);

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

    setIsLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please log in to save books.');
        setIsLoading(false);
        return;
      }

      const bookData = {
        title,
        genre,
        pages_total: parseInt(pagesTotal),
        pages_read: parseInt(pagesRead),
        is_completed: isCompleted,
      };

      await axios.put(`http://127.0.0.1:5000/api/books/${bookId}`, bookData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Book updated successfully!');
    } catch (error) {
      toast.error('Failed to save book: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      minWidth: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        ...commonStyles.card,
        position: 'relative',
        maxWidth: '500px',
        width: '100%',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <Link to="/home" style={commonStyles.submitButton}>Home</Link>
        </div>
        <h2 style={{ ...commonStyles.title, textAlign: 'center' }}>Edit Book</h2>

        {isLoading ? (
          <p style={{ color: theme.textDark, textAlign: 'center' }}>Loading form...</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={commonStyles.label}>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={commonStyles.input} />
              {errors.title && <span style={{ color: theme.error, fontSize: '0.8rem' }}>{errors.title}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={commonStyles.label}>Genre:</label>
              <select value={genre} onChange={(e) => setGenre(e.target.value)} required style={commonStyles.input}>
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Fantasy">Fantasy</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={commonStyles.label}>Total Pages:</label>
              <input type="number" value={pagesTotal} onChange={(e) => setPagesTotal(e.target.value)} required style={commonStyles.input} />
              {errors.pagesTotal && <span style={{ color: theme.error, fontSize: '0.8rem' }}>{errors.pagesTotal}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={commonStyles.label}>Pages Read:</label>
              <input type="number" value={pagesRead} onChange={(e) => setPagesRead(e.target.value)} required style={commonStyles.input} />
              {errors.pagesRead && <span style={{ color: theme.error, fontSize: '0.8rem' }}>{errors.pagesRead}</span>}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)} />
              <label style={commonStyles.label}>Is Completed</label>
            </div>

            <button type="submit" style={commonStyles.submitButton}>Update Book</button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Link to="/books" style={commonStyles.link}>Back to Book List</Link>
        </div>
      </div>
    </div>
  );
}

export default EditBookForm;