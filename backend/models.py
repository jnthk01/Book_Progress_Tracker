from . import db
import enum

class Genre(enum.Enum):
    FICTION = 'Fiction'
    NON_FICTION = 'Non-fiction'
    FANTASY = 'Fantasy'

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.Enum(Genre, values_callable=lambda x: [e.value for e in x]), nullable=False)
    is_completed = db.Column(db.Boolean, default=False)
    pages_total = db.Column(db.Integer, nullable=False)
    pages_read = db.Column(db.Integer, default=0)

    @property
    def progress_percent(self):
        if self.pages_total > 0:
            return (self.pages_read / self.pages_total) * 100
        return 0

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
