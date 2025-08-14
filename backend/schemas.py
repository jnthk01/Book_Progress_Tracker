from . import ma
from .models import Book, User
from marshmallow import fields

class BookSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        load_instance = True

    progress_percent = fields.Float(dump_only=True)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True

    password = fields.String(load_only=True)
