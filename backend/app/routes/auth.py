from app import db
from app.models import User
from app.utils import hash_password, verify_password
from flask import Blueprint, request, jsonify, session

# define blueprint
auth_bp = Blueprint('auth', __name__)

# TODO: replace with a real SQLite database
user = {}


@auth_bp.route('/register', methods=['POST'])
def register():
    # TODO: restrict username and password length
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
    
    # insert user into database
    new_user = User(username=username, password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
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

    # check if user exists and verify password
    # use first to get a single user object
    user = User.query.filter_by(username=username).first()
    if not user or not verify_password(user.password_hash, password):
        return jsonify({'error': 'Invalid username or password'}), 400
    
    # create session for user
    session['username'] = username
    session.modified = True 
    print('Session after login:', session)
    
    return jsonify({'message': 'User logged in successfully'}), 200


@auth_bp.route('/logout', methods=['POST'])
def logout():
    # remove user session
    # if username is not in session, do nothing
    session.pop('username', None)
    
    return jsonify({'message': 'User logged out successfully'}), 200


@auth_bp.route('/session', methods=['GET'])
def check_session():
    print('Session data:', session)
    # check if user is logged in
    if 'username' in session:
        return jsonify({'isLoggedIn': True, 'username': session['username']}), 200
    return jsonify({'isLoggedIn': False}), 200