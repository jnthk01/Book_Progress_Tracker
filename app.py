import os
from flask import Flask, jsonify
from dotenv import load_dotenv  
from backend import db, ma, models
from backend.auth import auth_bp, bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from backend.db_commands import init_db_command
from backend.books import books_bp

load_dotenv()

app = Flask(__name__)
CORS(app) # Initialize CORS with your app

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'

app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")

jwt = JWTManager(app)
bcrypt.init_app(app)
db.init_app(app)
ma.init_app(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(books_bp, url_prefix='/api')

app.cli.add_command(init_db_command)

@app.route('/ping')
def ping():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True)
