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

  // Create axios instance with Authorization header
  const axiosAuth = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

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

      const response = await axiosAuth.get(`/api/books?${params.toString()}`);

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
      await axiosAuth.delete(`/api/books/${bookToDelete}`);
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
        {/* Existing UI remains unchanged */}
        {/* ... your entire UI and rendering logic ... */}
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
