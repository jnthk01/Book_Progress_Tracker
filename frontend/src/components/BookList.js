import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import commonStyles from '../styles/commonStyles';
import theme from '../styles/theme';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const { token, logout } = useContext(AuthContext);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      if (!token) {
        toast.error('Please log in to view books.');
        setIsLoading(false);
        return;
      }
      const params = new URLSearchParams();
      if (searchTitle) params.append('search_title', searchTitle);
      if (genreFilter) params.append('genre', genreFilter);
      if (sortBy) params.append('sort_by', sortBy);
      if (sortOrder) params.append('sort_order', sortOrder);

      const requestUrl = `http://127.0.0.1:5000/api/books?${params.toString()}`;
      const response = await axios.get(requestUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        setBooks(response.data);
      } else {
        setBooks([]);
      }
    } catch (error) {
      toast.error('Failed to fetch books: ' + (error.response?.data?.error || error.message));
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchTitle, genreFilter, sortBy, sortOrder, token]);

  const confirmDelete = (bookId) => {
    setBookToDelete(bookId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    try {
      if (!token) {
        toast.error('Please log in to delete books.');
        return;
      }
      await axios.delete(`http://127.0.0.1:5000/api/books/${bookToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Book deleted successfully!');
      fetchBooks();
    } catch (error) {
      toast.error('Failed to delete book: ' + (error.response?.data?.error || error.message));
    } finally {
      setBookToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setBookToDelete(null);
  };

  return (
    <>
      <div style={commonStyles.container}>
        <div style={commonStyles.card}>
          <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
            <Link to="/home" style={commonStyles.submitButton}>
              Home
            </Link>
          </div>
          <h2 style={commonStyles.title}>Book List</h2>

          

          {/* Search and Filter */}
          <div style={commonStyles.form}>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              style={commonStyles.input}
            />
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              style={commonStyles.input}
            >
              <option value="">All Genres</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-fiction">Non-fiction</option>
              <option value="Fantasy">Fantasy</option>
            </select>
          </div>

          {/* Sort Controls */}
          <div style={commonStyles.form}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={commonStyles.input}
            >
              <option value="">Sort By</option>
              <option value="title">Title</option>
              <option value="pages_total">Total Pages</option>
              <option value="pages_read">Pages Read</option>
              <option value="genre">Genre</option>
              <option value="is_completed">Completed</option>
              <option value="progress_percent">Progress</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={commonStyles.input}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* Book List in Grid */}
          {isLoading ? (
            <p style={{ color: theme.textDark }}>Loading books...</p>
          ) : books.length > 0 ? (
            <div style={commonStyles.bookListContainer}>
              {books.map((book) => (
                <div key={book.id} style={commonStyles.bookCard}>
                  <h3 style={commonStyles.bookTitle}>
                    <Link to={`/books/${book.id}`} style={{ color: theme.textDark, textDecoration: 'none' }}>
                      {book.title}
                    </Link>
                  </h3>
                  <p style={commonStyles.bookMeta}>Genre: {book.genre}</p>
                  <p style={commonStyles.bookMeta}>Pages: {book.pages_read} / {book.pages_total}</p>
                  <p style={commonStyles.bookMeta}>
                    Progress: {typeof book.progress_percent === 'number' ? book.progress_percent.toFixed(2) : '0.00'}%
                  </p>
                  <p style={commonStyles.bookMeta}>Completed: {book.is_completed ? 'Yes' : 'No'}</p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <Link
                      to={`/edit-book/${book.id}`}
                      style={{ ...commonStyles.submitButton, backgroundColor: theme.secondary }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => confirmDelete(book.id)}
                      style={{ ...commonStyles.submitButton, backgroundColor: theme.error }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: theme.textDark }}>No books found. Add one!</p>
          )}

          {/* Add Book Button */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Link to="/add-book" style={commonStyles.submitButton}>
              Add New Book
            </Link>
          </div>
        </div>
      </div>

      <ConfirmationModal
        show={showConfirmModal}
        message="Are you sure you want to delete this book?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}

export default BookList;
