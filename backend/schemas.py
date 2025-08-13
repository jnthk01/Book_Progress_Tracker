from . import ma
from .models import Book

class BookSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        load_instance = True

    progress_percent = ma.auto_field(dump_only=True)
