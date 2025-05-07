from flask import Blueprint, request, jsonify, session


# define blueprint
welcome_bp = Blueprint('welcome', __name__)

# get username to welcome user
@welcome_bp.route('/getuser', methods=['GET'])
def welcome():
    # check if user is logged in
    if 'username' not in session:
        return jsonify({'error': 'User not logged in'}), 401
    # get username from session
    username = session['username']
    return jsonify({'username': f'{username}'}), 200

@welcome_bp.route('/logmood', methods=['POST'])
def log_mood():
    # check if user is logged in
    if 'username' not in session:
        return jsonify({'error': 'User not logged in'}), 401
    mood = request.get_json().get('mood')
    if not mood:
        return jsonify({'error': 'Mood not provided'}), 400
    print(mood)
    return jsonify({'message': 'Mood logged successfully'}), 200