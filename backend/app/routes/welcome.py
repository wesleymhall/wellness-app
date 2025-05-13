from app import db
from app.models import User, Metric, Log
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

@welcome_bp.route('/logmetric', methods=['POST'])
def log_metric():
    # check if user is logged in
    if 'username' not in session:
        return jsonify({'error': 'User not logged in'}), 401
    # get metric name and value from request
    name = request.get_json().get('name')
    value = request.get_json().get('value')
    if not name:
        return jsonify({'error': 'Name not provided'}), 400
    if not value:
        return jsonify({'error': 'Value not provided'}), 400
    # get username from session
    username = session['username']
    # query user from database
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    # find or create metric for the user
    metric = Metric.query.filter_by(name=name, user_id=user.id).first()
    if not metric:
        metric = Metric(name=name, user_id=user.id)
        db.session.add(metric)
        db.session.commit()
    # create a log entry for the mood
    log = Log(value=value, metric_id=metric.id)
    db.session.add(log)
    # commit the changes to the database
    db.session.commit()

    return jsonify({'message': 'Metric logged successfully'}), 200