from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import asc, desc
from .models import db, Book, Genre
from .schemas import BookSchema

books_bp = Blueprint('books', __name__)
book_schema = BookSchema()
books_schema = BookSchema(many=True)

@books_bp.route('/books', methods=['POST'])
@jwt_required()
def create_book():
    data = request.get_json()
    try:
        new_book = book_schema.load(data)
        db.session.add(new_book)
        db.session.commit()
        return jsonify(book_schema.dump(new_book)), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@books_bp.route('/books', methods=['GET'])
@jwt_required()
def get_books():
    genre_filter = request.args.get('genre', type=str)
    search_title = request.args.get('search_title', type=str)
    sort_by = request.args.get('sort_by', type=str)
    sort_order = request.args.get('sort_order', 'asc', type=str)

    query = Book.query

    # Search by title
    if search_title:
        query = query.filter(Book.title.ilike(f'%{search_title}%'))

    # Filter by genre
    if genre_filter:
        try:
            genre_enum = Genre[genre_filter.upper()]
            query = query.filter_by(genre=genre_enum)
        except KeyError:
            return jsonify({'error': f'Invalid genre: {genre_filter}'}), 400

    # Sorting
    if sort_by:
        if sort_by == 'progress_percent':
            # progress_percent will be sorted in Python after fetching
            pass
        else:
            sortable_fields = {
                'title': Book.title,
                'pages_total': Book.pages_total,
                'pages_read': Book.pages_read,
                'genre': Book.genre,
                'is_completed': Book.is_completed,
            }
            field_to_sort = sortable_fields.get(sort_by)

            if field_to_sort is None:
                return jsonify({'error': f'Invalid sort_by field: {sort_by}'}), 400

            if sort_order == 'asc':
                query = query.order_by(asc(field_to_sort))
            elif sort_order == 'desc':
                query = query.order_by(desc(field_to_sort))
            else:
                return jsonify({'error': "Invalid sort_order. Must be 'asc' or 'desc'."}), 400

    items = query.all()

    if sort_by == 'progress_percent':
        items.sort(key=lambda x: x.progress_percent, reverse=(sort_order == 'desc'))
    elif sort_by and sort_by != 'progress_percent':
        # Re-sort if SQLAlchemy sort was applied
        sortable_fields = {
            'title': lambda x: x.title.lower(),
            'pages_total': lambda x: x.pages_total,
            'pages_read': lambda x: x.pages_read,
            'genre': lambda x: x.genre.value.lower(),
            'is_completed': lambda x: x.is_completed,
        }
        sort_key_func = sortable_fields.get(sort_by)
        if sort_key_func:
            items.sort(key=sort_key_func, reverse=(sort_order == 'desc'))

    return jsonify(books_schema.dump(items))

@books_bp.route('/books/<int:book_id>', methods=['GET'])
@jwt_required()
def get_book(book_id):
    book = Book.query.get_or_404(book_id)
    return jsonify(book_schema.dump(book))

@books_bp.route('/books/<int:book_id>', methods=['PUT'])
@jwt_required()
def update_book(book_id):
    book = Book.query.get_or_404(book_id)
    data = request.get_json()
    try:
        updated_book = book_schema.load(data, instance=book, partial=True)
        db.session.commit()
        return jsonify(book_schema.dump(updated_book))
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@books_bp.route('/books/<int:book_id>', methods=['DELETE'])
@jwt_required()
def delete_book(book_id):
    book = Book.query.get_or_404(book_id)
    db.session.delete(book)
    db.session.commit()
    return jsonify({'message': 'Book deleted'})