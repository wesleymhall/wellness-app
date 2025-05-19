from flask import Blueprint, jsonify, session


welcome_bp = Blueprint('welcome', __name__)


@welcome_bp.route('/getuser', methods=['GET'])
def welcome():
    # check if user is logged in
    if 'username' not in session:
        return jsonify({'error': 'user not logged in'}), 401
    # get username from session
    username = session['username']
    return jsonify({'username': f'{username}'}), 200