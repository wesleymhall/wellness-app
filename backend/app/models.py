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