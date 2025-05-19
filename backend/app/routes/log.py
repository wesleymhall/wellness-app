from app import db
from app.models import User, Metric, Log
from flask import Blueprint, request, jsonify, session

log_bp = Blueprint('log', __name__)


@log_bp.route('/logmetric', methods=['POST'])
def log_metric():
    # check if user is logged in
    if 'username' not in session:
        return jsonify({'error': 'user not logged in'}), 401
    # get metric name and value from request
    name = request.get_json().get('name')
    value = request.get_json().get('value')
    if not name:
        return jsonify({'error': 'name not provided'}), 400
    if not value:
        return jsonify({'error': 'value not provided'}), 400
    # get username from session
    username = session['username']
    # query user from database
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'user not found'}), 404
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

    return jsonify({'message': 'metric logged successfully'}), 200