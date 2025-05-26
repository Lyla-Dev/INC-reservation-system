# src/app.py
from flask import Flask, jsonify, request, g, session # session 임포트
from src.config import Config
from src.routes.user_routes import user_bp
from src.database.connection import get_db_connection, close_db_connection

app = Flask(__name__)
app.config.from_object(Config)

# 세션 관리를 위한 SECRET_KEY 설정 확인
# Config.SECRET_KEY가 설정되어 있어야 합니다. (src/config.py 참조)
# app.secret_key = app.config['SECRET_KEY'] # 이렇게 직접 할당하는 대신 app.config.from_object(Config)가 처리함

from flask_cors import CORS
CORS(app, supports_credentials=True) # 자격 증명(쿠키, 세션)을 지원하도록 설정

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

# Blueprint 등록
app.register_blueprint(user_bp, url_prefix='/users')

@app.route('/')
def home():
    return jsonify(message="Welcome to the Restaurant Reservation Backend API!")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)