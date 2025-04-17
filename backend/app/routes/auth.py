from flask import Blueprint, request, jsonify, session
from app.utils import hash_password, verify_password

# define blueprint
auth_bp = Blueprint('auth', __name__)

# TODO: replace with a real SQLite database
user = {}


@auth_bp.route('/register', methods=['POST'])
def register():
    # convert json request data to python dictionary
    data = request.get_json()
    username = data['username']
    password = data['password']

    # validate input
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # check if user already exists
    if username in user:
        return jsonify({'error': 'User already exists'}), 400
    
    # hash the password
    hashed_password = hash_password(password)
    user[username] = hashed_password
    
    return jsonify({'message': 'User registered successfully'}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    # convert json request data to python dictionary
    data = request.get_json()
    username = data['username']
    password = data['password']

    # validate input
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # check if user exists
    if username not in user:
        return jsonify({'error': 'User does not exist'}), 400
    
    # check if password is correct
    if not verify_password(user[username], password):
        return jsonify({'error': 'Invalid password'}), 400
    
    # create session for user
    session['username'] = username
    
    return jsonify({'message': 'User logged in successfully'}), 200


@auth_bp.route('/logout', methods=['POST'])
def logout():
    # remove user session
    # if username is not in session, do nothing
    session.pop('username', None)
    
    return jsonify({'message': 'User logged out successfully'}), 200