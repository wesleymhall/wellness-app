import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
# enable CORS for all routes, change in production to only allow specific domains
# cross-origin resource sharing (CORS) allows flask to accept requests from react at a seperate port
cors = CORS(app)


@app.route('/')
def users():
    return jsonify({'users': [{'name': 'Alice'}, {'name': 'Bob'}]})