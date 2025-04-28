import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_session import Session

# extensions
bcrypt = Bcrypt()
cors = CORS()
session = Session()


def create_app():
    app = Flask(__name__)

    # configure app with settings from config.py
    app.config.from_object('app.config.Config')

    # initialize extensions
    bcrypt.init_app(app)
    # enable cross-origin resource sharing (CORS) for all routes
    # TODO: change in production to allow specific domains
    cors.init_app(app, supports_credentials=True)
    session.init_app(app)
    
    # register blueprints from routes/__init__.py
    from .routes import auth_bp
    # all routes in auth_bp will be prefixed with /auth
    app.register_blueprint(auth_bp, url_prefix='/auth')

    # return app instance
    return app