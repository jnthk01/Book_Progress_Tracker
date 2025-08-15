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
    """
    Create a new book
    ---
    tags:
      - Books
    security:
      - Bearer: []
    parameters:
      - in: body
        name: body
        schema:
          id: BookCreate
          required:
            - title
            - genre
            - pages_total
          properties:
            title:
              type: string
              description: Title of the book
              example: The Hitchhiker's Guide to the Galaxy
            genre:
              type: string
              enum: [Fiction, Non-fiction, Fantasy]
              description: Genre of the book
              example: Fiction
            pages_total:
              type: integer
              description: Total number of pages in the book
              example: 193
            pages_read:
              type: integer
              description: Number of pages read so far
              example: 50
            is_completed:
              type: boolean
              description: Whether the book is completed
              example: false
    responses:
      201:
        description: Book created successfully
        schema:
          id: Book
          properties:
            id:
              type: integer
            title:
              type: string
            genre:
              type: string
            pages_total:
              type: integer
            pages_read:
              type: integer
            is_completed:
              type: boolean
            progress_percent:
              type: number
      400:
        description: Invalid input
        schema:
          $ref: '#/definitions/Error'
      401:
        description: Unauthorized
    """
    current_user_id = get_jwt_identity()
    data = request.get_json()
    try:
        new_book = book_schema.load(data)
        new_book.user_id = current_user_id  # Assign current user's ID
        db.session.add(new_book)
        db.session.commit()
        return jsonify(book_schema.dump(new_book)), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@books_bp.route('/books', methods=['GET'])
@jwt_required()
def get_books():
    """
    Get a list of books with optional filtering, sorting, and pagination
    ---
    tags:
      - Books
    security:
      - Bearer: []
    parameters:
      - name: page
        in: query
        type: integer
        description: Page number for pagination (default 1)
        example: 1
      - name: genre
        in: query
        type: string
        enum: [Fiction, Non-fiction, Fantasy]
        description: Filter books by genre
        example: Fantasy
      - name: search_title
        in: query
        type: string
        description: Search books by title (case-insensitive)
        example: guide
      - name: sort_by
        in: query
        type: string
        enum: [title, pages_total, pages_read, genre, is_completed, progress_percent]
        description: Field to sort books by
        example: title
      - name: sort_order
        in: query
        type: string
        enum: [asc, desc]
        description: Sort order (asc or desc, default asc)
        example: asc
    responses:
      200:
        description: A list of books with pagination info
        schema:
          id: BookList
          properties:
            books:
              type: array
              items:
                $ref: '#/definitions/Book'
            total:
              type: integer
              description: Total number of books
            pages:
              type: integer
              description: Total number of pages
            current_page:
              type: integer
              description: Current page number
      401:
        description: Unauthorized
      400:
        description: Invalid sort_by or genre field
        schema:
          $ref: '#/definitions/Error'
    """
    current_user_id = get_jwt_identity()
    page = request.args.get('page', 1, type=int)
    per_page = 6
    genre_filter = request.args.get('genre', type=str)
    search_title = request.args.get('search_title', type=str)
    sort_by = request.args.get('sort_by', type=str)
    sort_order = request.args.get('sort_order', 'asc', type=str)

    query = Book.query.filter_by(user_id=current_user_id)

    if search_title:
        query = query.filter(Book.title.ilike(f'%{search_title}%'))

    if genre_filter:
        try:
            genre_enum = Genre[genre_filter.replace('-', '_').upper()]
            query = query.filter_by(genre=genre_enum)
        except KeyError:
            return jsonify({'error': f'Invalid genre: {genre_filter}'}), 400

    if sort_by:
        if sort_by == 'progress_percent':
            # This custom sort is not compatible with pagination easily.
            # I will ignore pagination for this sort option for now.
            items = query.all()
            items.sort(key=lambda x: x.progress_percent, reverse=(sort_order == 'desc'))
            return jsonify(books_schema.dump(items))
        else:
            sortable_fields = {
                'title': Book.title,
                'pages_total': Book.pages_total,
                'pages_read': Book.pages_read,
                'genre': Book.genre,
                'is_completed': Book.is_completed,
            }
            field_to_sort = sortable_fields.get(sort_by)
            if not field_to_sort:
                return jsonify({'error': f'Invalid sort_by field: {sort_by}'}), 400

            if sort_order == 'asc':
                query = query.order_by(asc(field_to_sort))
            elif sort_order == 'desc':
                query = query.order_by(desc(field_to_sort))
            else:
                return jsonify({'error': "Invalid sort_order. Must be 'asc' or 'desc'."}), 400

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    items = pagination.items

    return jsonify({
        'books': books_schema.dump(items),
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': pagination.page,
    })


@books_bp.route('/books/<int:book_id>', methods=['GET'])
@jwt_required()
def get_book(book_id):
    """
    Get details of a specific book
    ---
    tags:
      - Books
    security:
      - Bearer: []
    parameters:
      - name: book_id
        in: path
        type: integer
        required: true
        description: ID of the book to retrieve
        example: 1
    responses:
      200:
        description: Details of a single book
        schema:
          $ref: '#/definitions/Book'
      401:
        description: Unauthorized
      404:
        description: Book not found
    """
    current_user_id = get_jwt_identity()
    book = Book.query.filter_by(id=book_id, user_id=current_user_id).first_or_404()  # Verify ownership
    return jsonify(book_schema.dump(book))


@books_bp.route('/books/<int:book_id>', methods=['PUT'])
@jwt_required()
def update_book(book_id):
    """
    Update an existing book
    ---
    tags:
      - Books
    security:
      - Bearer: []
    parameters:
      - name: book_id
        in: path
        type: integer
        required: true
        description: ID of the book to update
        example: 1
      - in: body
        name: body
        schema:
          id: BookUpdate
          properties:
            title:
              type: string
              description: New title of the book
              example: The Restaurant at the End of the Universe
            genre:
              type: string
              enum: [Fiction, Non-fiction, Fantasy]
              description: New genre of the book
              example: Science Fiction
            pages_total:
              type: integer
              description: New total number of pages
              example: 250
            pages_read:
              type: integer
              description: New number of pages read
              example: 100
            is_completed:
              type: boolean
              description: Whether the book is completed
              example: true
    responses:
      200:
        description: Book updated successfully
        schema:
          $ref: '#/definitions/Book'
      400:
        description: Invalid input
        schema:
          $ref: '#/definitions/Error'
      401:
        description: Unauthorized
      404:
        description: Book not found
    """
    current_user_id = get_jwt_identity()
    book = Book.query.filter_by(id=book_id, user_id=current_user_id).first_or_404()  # Verify ownership
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
    """
    Delete a book
    ---
    tags:
      - Books
    security:
      - Bearer: []
    parameters:
      - name: book_id
        in: path
        type: integer
        required: true
        description: ID of the book to delete
        example: 1
    responses:
      200:
        description: Book deleted successfully
        schema:
          properties:
            message:
              type: string
              example: Book deleted
      401:
        description: Unauthorized
      404:
        description: Book not found
    """
    current_user_id = get_jwt_identity()
    book = Book.query.filter_by(id=book_id, user_id=current_user_id).first_or_404()  # Verify ownership
    db.session.delete(book)
    db.session.commit()
    return jsonify({'message': 'Book deleted'})