import os
from flask import Flask, jsonify
from flasgger import Swagger
import click

swagger_template = {
    "swagger": "2.0",
    "info": {
        "title": "Book Progress Tracker API",
        "description": "API for tracking book progress",
        "version": "1.0.0"
    },
    "securityDefinitions": {
        "Bearer": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "JWT Authorization header using the Bearer scheme (Example: \"Bearer {token}\")"
        }
    },
    "security": [
        {
            "Bearer": []
        }
    ]
}
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

# Swagger configuration
app.config['SWAGGER'] = {
    'title': 'Book Progress Tracker API',
    'uiversion': 3,
    'specs_route': '/docs/'
}
swagger = Swagger(app, template=swagger_template)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'

app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")

jwt = JWTManager(app)
bcrypt.init_app(app)
db.init_app(app)
ma.init_app(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(books_bp, url_prefix='/api')

app.cli.add_command(init_db_command)

@app.cli.command("init-db")
def init_db():
    """Initialize the database (creates tables)."""
    with app.app_context():
        db.create_all()
        click.echo("✅ Database initialized.")

@app.route('/ping')
def ping():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True)
