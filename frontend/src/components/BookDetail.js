import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import commonStyles from '../styles/commonStyles';
import theme from '../styles/theme';
import { toast } from 'react-toastify';

function BookDetail() {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

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
        const response = await axios.get(`http://127.0.0.1:5000/api/books/${id}`, {
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
  }, [id]);

  if (isLoading) {
    return (
      <div style={commonStyles.container}>
        <div style={commonStyles.card}>
          <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
            <Link to="/home" style={commonStyles.link}>Back to Home</Link>
          </div>
          <p style={{color: theme.textDark}}>Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div style={commonStyles.container}>
        <div style={commonStyles.card}>
          <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
            <Link to="/home" style={commonStyles.link}>Back to Home</Link>
          </div>
          <p style={{color: theme.textDark}}>Book not found.</p>
          <div style={commonStyles.loginLink}>
            <Link to="/books" style={commonStyles.link}>Back to Book List</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={commonStyles.container}>
      <div style={commonStyles.card}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <Link to="/home" style={commonStyles.link}>Back to Home</Link>
        </div>
        <h2 style={commonStyles.title}>Book Details</h2>
        <div className="space-y-2">
          <h3 className="text-lg font-bold" style={{color: theme.textDark}}>{book.title}</h3>
          <p style={{color: theme.textSecondary}}>Genre: {book.genre}</p>
          <p style={{color: theme.textSecondary}}>Pages: {book.pages_read} / {book.pages_total}</p>
          <p style={{color: theme.textSecondary}}>Progress: {book.progress_percent.toFixed(2)}%</p>
          <p style={{color: theme.textSecondary}}>Completed: {book.is_completed ? 'Yes' : 'No'}</p>
        </div>
        <div style={commonStyles.loginLink}>
          <Link to="/books" style={commonStyles.link}>Back to Book List</Link>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;