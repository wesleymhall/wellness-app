from app import db
from app.models import User, Metric, Log
from flask import Blueprint, request, jsonify, session

# define blueprint
profile_bp = Blueprint('profile', __name__)


@profile_bp.route('/metrics', methods=['GET', 'POST'])
def get_metrics():
    if request.method == 'GET':
        # TODO: get metrics where user_id = session['user_id']
        pass
    else:
        # TODO: add metric where user_id = session['user_id']
        pass