from flask import Flask, jsonify, g
from config import Config
from routes.user_routes import user_bp
from routes.reservation_routes import reservation_bp
from database.connection import get_db_connection, close_db_connection
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

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
app.register_blueprint(reservation_bp, url_prefix='/reservations')

@app.route('/tables', methods=['GET'])
def get_tables():
    conn = get_db_connection()
    cursor = conn.cursor()

    query = "SELECT table_id, location, capacity FROM dining_tables ORDER BY table_id"
    cursor.execute(query)
    rows = cursor.fetchall()

    tables = [
        {
            'table_id': row['table_id'],
            'location': row['location'],
            'capacity': row['capacity']
        }
        for row in rows
    ]

    conn.close()
    return jsonify(tables)

@app.route('/')
def home():
    return jsonify(message="Welcome to the Restaurant Reservation Backend API!")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)