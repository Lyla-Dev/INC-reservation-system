from flask import Flask, jsonify, request, g, session 
from config import Config
from routes.user_routes import user_bp
from database.connection import get_db_connection, close_db_connection

app = Flask(__name__)
app.config.from_object(Config)

from flask_cors import CORS
CORS(app, supports_credentials=True)

@app.before_request
def before_request():
    g.db = get_db_connection()

@app.teardown_request
def teardown_request(exception):
    db = g.pop('db', None)
    if db is not None:
        close_db_connection(db)

app.register_blueprint(user_bp, url_prefix='/users')

@app.route('/')
def home():
    return jsonify(message="Welcome to the Restaurant Reservation Backend API!")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)