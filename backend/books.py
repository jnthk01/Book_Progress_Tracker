from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
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
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 5, type=int)
    genre_filter = request.args.get('genre', type=str)

    query = Book.query
    if genre_filter:
        try:
            genre_enum = Genre[genre_filter.upper()]
            query = query.filter_by(genre=genre_enum)
        except KeyError:
            return jsonify({'error': f'Invalid genre: {genre_filter}'}), 400

    paginated_books = query.paginate(page=page, per_page=limit, error_out=False)
    return jsonify(books_schema.dump(paginated_books.items))

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
