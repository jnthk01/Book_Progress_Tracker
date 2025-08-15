import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import commonStyles from '../styles/commonStyles';
import theme from '../styles/theme';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal';
import '../styles/animations.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { token } = useContext(AuthContext);

  const fetchBooks = async (page = 1) => {
    setIsLoading(true);
    try {
      if (!token) {
        toast.error('Please log in to view books.');
        setIsLoading(false);
        return;
      }
      const params = new URLSearchParams();
      params.append('page', page);
      if (searchTitle) params.append('search_title', searchTitle);
      if (genreFilter) params.append('genre', genreFilter);
      if (sortBy) params.append('sort_by', sortBy);
      if (sortOrder) params.append('sort_order', sortOrder);

      const response = await axios.get(`http://127.0.0.1:5000/api/books?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && Array.isArray(response.data.books)) {
        setBooks(response.data.books);
        setTotalPages(response.data.pages);
        setCurrentPage(response.data.current_page);
      } else {
        setBooks([]);
        setTotalPages(1);
        setCurrentPage(1);
      }
    } catch (error) {
      toast.error('Failed to fetch books: ' + (error.response?.data?.error || error.message));
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [searchTitle, genreFilter, sortBy, sortOrder, token, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTitle, genreFilter, sortBy, sortOrder]);

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
      if (books.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchBooks(currentPage);
      }
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

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const ProgressBar = ({ progress }) => (
    <div style={commonStyles.progressBar}>
      <div style={{ ...commonStyles.progressFill, width: `${Math.min(progress, 100)}%` }} />
    </div>
  );

  return (
    <>
      <div style={commonStyles.container} className="fade-in">
        <div style={commonStyles.card}>
          <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
            <Link to="/home" style={{...commonStyles.smallButtonSecondary, color: 'black'}}>Home</Link>
          </div>
          <h2 style={commonStyles.title}>My Books</h2>
          <p style={commonStyles.subtitle}>Manage your personal book collection</p>

          {/* Search and Filter */}
          <div style={commonStyles.form}>
            <div style={commonStyles.formGroup}>
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                style={commonStyles.input}
              />
            </div>
            <div style={commonStyles.formGroup}>
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
          </div>

          {/* Sort Controls */}
          <div style={commonStyles.form}>
            <div style={commonStyles.formGroup}>
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
            </div>
            <div style={commonStyles.formGroup}>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={commonStyles.input}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {/* Book List */}
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
                Loading your books...
              </div>
            </div>
          ) : books.length > 0 ? (
            <div style={commonStyles.bookListContainer}>
              {books.map((book, index) => {
                const progress = typeof book.progress_percent === 'number' ? book.progress_percent : 0;
                const isHovered = hoveredCard === book.id;
                return (
                  <div
                    key={book.id}
                    style={{
                      ...commonStyles.bookCard,
                      ...(isHovered ? commonStyles.bookCardHover : {}),
                      animationDelay: `${index * 0.1}s`
                    }}
                    className="fade-in"
                    onMouseEnter={() => setHoveredCard(book.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <h3 style={commonStyles.bookTitle}>
                      <Link
                        to={`/books/${book.id}`}
                        style={{
                          color: theme.textDark,
                          textDecoration: 'none',
                          transition: theme.transitions.fast
                        }}
                      >
                        {book.title}
                      </Link>
                    </h3>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.sm,
                      marginBottom: theme.spacing.sm
                    }}>
                      <span style={{
                        ...commonStyles.bookMeta,
                        backgroundColor: theme.primary,
                        color: theme.textLight,
                        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                        borderRadius: theme.borderRadius.full,
                        fontSize: theme.fontSizes.xs,
                        fontWeight: theme.fontWeights.semibold,
                        textTransform: 'uppercase'
                      }}>
                        {book.genre}
                      </span>
                      {book.is_completed && (
                        <span style={{
                          backgroundColor: theme.success,
                          color: theme.textLight,
                          padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                          borderRadius: theme.borderRadius.full,
                          fontSize: theme.fontSizes.xs,
                          fontWeight: theme.fontWeights.semibold,
                          textTransform: 'uppercase'
                        }}>
                          ✓ Completed
                        </span>
                      )}
                    </div>

                    <div style={{ marginBottom: theme.spacing.md }}>
                      <div style={commonStyles.flexBetween}>
                        <p style={commonStyles.bookMeta}>
                          {book.pages_read} / {book.pages_total} pages
                        </p>
                        <p style={{
                          ...commonStyles.bookMeta,
                          fontWeight: theme.fontWeights.semibold,
                          color: progress === 100 ? theme.success : theme.primary
                        }}>
                          {progress.toFixed(1)}%
                        </p>
                      </div>
                      <ProgressBar progress={progress} />
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: theme.spacing.md,
                      marginTop: theme.spacing.md
                    }}>
                      <Link 
                        to={`/edit-book/${book.id}`} 
                        style={{
                          ...commonStyles.smallButton,
                          background: `linear-gradient(135deg, ${theme.warning} 0%, ${theme.warningLight} 100%)`,
                          color: theme.textDark,
                          fontWeight: theme.fontWeights.semibold,
                          flex: 1
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => confirmDelete(book.id)}
                        style={{
                          ...commonStyles.smallButton,
                          background: `linear-gradient(135deg, ${theme.error} 0%, ${theme.errorLight} 100%)`,
                          color: theme.textLight,
                          flex: 1
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={commonStyles.emptyState} className="fade-in">
              <div style={{ fontSize: theme.fontSizes['2xl'], marginBottom: theme.spacing.md }}>📚</div>
              <p>No books in your collection yet.</p>
              <p style={{ opacity: 0.8, marginTop: theme.spacing.sm }}>Add your first book to get started!</p>
            </div>
          )}

          {/* Pagination */}
          <div style={commonStyles.pagination}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{
                ...commonStyles.paginationButton,
                ...(currentPage === 1 ? { opacity: 0.5, cursor: 'not-allowed' } : {})
              }}
            >
              ← Previous
            </button>

            <div style={commonStyles.paginationInfo}>
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{
                ...commonStyles.paginationButton,
                ...(currentPage === totalPages ? { opacity: 0.5, cursor: 'not-allowed' } : {})
              }}
            >
              Next →
            </button>
          </div>

          <div style={{ ...commonStyles.textCenter, marginTop: theme.spacing.xl }}>
            <Link
              to="/add-book"
              style={{
                ...commonStyles.smallButton,
                background: `linear-gradient(135deg, ${theme.success} 0%, ${theme.successLight} 100%)`
              }}
            >
              ➕ Add Book
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
