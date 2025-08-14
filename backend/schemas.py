from . import ma
from .models import Book, User, Genre
from marshmallow import fields

class BookSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        load_instance = True

    progress_percent = fields.Float(dump_only=True)
    genre = fields.Enum(Genre, by_value=True)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True

    password = fields.String(load_only=True)
