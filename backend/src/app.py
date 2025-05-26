# src/app.py
from flask import Flask, jsonify, request, g
from src.config import Config
from src.routes.user_routes import user_bp  # 추후 생성할 Blueprint
from src.database.connection import get_db_connection, close_db_connection

app = Flask(__name__)
app.config.from_object(Config)

# 요청이 시작될 때 데이터베이스 연결을 엽니다.
@app.before_request
def before_request():
    g.db = get_db_connection()

# 요청이 끝날 때 데이터베이스 연결을 닫습니다.
@app.teardown_request
def teardown_request(exception):
    db = g.pop('db', None)
    if db is not None:
        close_db_connection(db)

# Blueprint 등록 (예시)
app.register_blueprint(user_bp, url_prefix='/users')

@app.route('/')
def home():
    return jsonify(message="Welcome to the Backend API!")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)