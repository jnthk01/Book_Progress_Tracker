from flask import Blueprint, request, jsonify
import re
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from .models import db, User
from .schemas import UserSchema

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Register a new user
    ---
    tags:
      - Authentication
    parameters:
      - in: body
        name: body
        schema:
          id: UserRegistration
          required:
            - username
            - password
          properties:
            username:
              type: string
              description: User's chosen username
              example: testuser
            password:
              type: string
              description: User's chosen password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
              example: SecureP@ss1
    responses:
      201:
        description: User registered successfully
        schema:
          id: UserRegistered
          properties:
            id:
              type: integer
              description: User ID
            username:
              type: string
              description: Registered username
      400:
        description: Invalid input or password does not meet requirements
        schema:
          id: Error
          properties:
            error:
              type: string
              description: Error message
    """
    data = request.get_json()
    password = data.get('password')
    if len(password) < 8:
        return jsonify({'error': 'Password must be at least 8 characters long'}), 400
    if not re.search(r'[A-Z]', password):
        return jsonify({'error': 'Password must contain at least one uppercase letter'}), 400
    if not re.search(r'[a-z]', password):
        return jsonify({'error': 'Password must contain at least one lowercase letter'}), 400
    if not re.search(r'[0-9]', password):
        return jsonify({'error': 'Password must contain at least one number'}), 400
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return jsonify({'error': 'Password must contain at least one special character'}), 400

    user_schema = UserSchema()
    try:
        user = user_schema.load(data)
        user.password = bcrypt.generate_password_hash(user.password).decode('utf-8')
        db.session.add(user)
        db.session.commit()
        return jsonify(user_schema.dump(user)), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Authenticate a user and return an access token
    ---
    tags:
      - Authentication
    parameters:
      - in: body
        name: body
        schema:
          id: UserLogin
          required:
            - username
            - password
          properties:
            username:
              type: string
              description: User's username
              example: testuser
            password:
              type: string
              description: User's password
              example: SecureP@ss1
    responses:
      200:
        description: User logged in successfully
        schema:
          id: AccessToken
          properties:
            access_token:
              type: string
              description: JWT access token
      401:
        description: Invalid credentials
        schema:
          $ref: '#/definitions/Error'
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify(access_token=access_token)

    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/check-username', methods=['GET'])
def check_username():
    """
    Check if a username is available
    ---
    tags:
      - Authentication
    parameters:
      - name: username
        in: query
        type: string
        required: true
        description: Username to check for availability
        example: newuser
    responses:
      200:
        description: Username availability status
        schema:
          id: UsernameAvailability
          properties:
            available:
              type: boolean
              description: True if username is available, False otherwise
            message:
              type: string
              description: Optional message (e.g., "Username is already taken")
      400:
        description: Missing username parameter
        schema:
          $ref: '#/definitions/Error'
    """
    username = request.args.get('username', '', type=str)
    if not username:
        return jsonify({'available': False, 'error': 'Username parameter is missing'}), 400
    
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({'available': False})
    else:
        return jsonify({'available': True})
