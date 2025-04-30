from app import db

# create classes that extend db.Model class from Flask-SQLAlchemy
# db.Model registers classes in metadata object with the db instance
# db.create_all() creates tables from metadata object

class User(db.Model):
    __tablename__ = 'users'
    # initialise columns
    # autoincrement is default for primary key
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    # user can have many metrics and logs
    metrics = db.relationship('Metric', backref='user', lazy=True, cascade='all, delete-orphan')
    logs = db.relationship('Log', backref='user', lazy=True, cascade='all, delete-orphan')

class Metric(db.Model):
    __tablename__ = 'metrics'
    # initialise columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    # foregin key
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    # metric can have many logs
    logs = db.relationship('Log', backref='metric', lazy=True, cascade='all, delete-orphan')

class Log(db.Model):
    __tablename__ = 'logs'
    # initialise columns
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)
    # foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id',  ondelete='CASCADE'), nullable=False)
    metric_id = db.Column(db.Integer, db.ForeignKey('metrics.id',  ondelete='CASCADE'), nullable=False)