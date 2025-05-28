from flask import Blueprint, jsonify, request, session
from database.user_queries import get_user_by_username, create_user, verify_password
from models.user_model import User 

user_bp = Blueprint('users', __name__)

@user_bp.route('/register', methods=['POST'])
def register_user():
    """회원가입 API 엔드포인트."""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "아이디와 비밀번호는 필수입니다."}), 400

    if get_user_by_username(username):
        return jsonify({"error": "이미 존재하는 아이디입니다."}), 409 
    
    new_user = create_user(username, password)
    if new_user:
        return jsonify({"message": "회원가입 성공!", "user_id": new_user.id}), 201
    else:
        return jsonify({"error": "회원가입에 실패했습니다."}), 500

@user_bp.route('/login', methods=['POST'])
def login_user():
    """로그인 API 엔드포인트."""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "아이디와 비밀번호를 입력해주세요."}), 400

    user = get_user_by_username(username)
    if user and verify_password(user.password_hash, password):
        session['user_id'] = user.id
        session['username'] = user.username
        return jsonify({"message": "로그인 성공!", "username": user.username}), 200
    else:
        return jsonify({"error": "아이디 또는 비밀번호가 올바르지 않습니다."}), 401 

@user_bp.route('/logout', methods=['POST'])
def logout_user():
    """로그아웃 API 엔드포인트."""
    session.pop('user_id', None)
    session.pop('username', None)
    return jsonify({"message": "로그아웃 성공!"}), 200

@user_bp.route('/status', methods=['GET'])
def get_login_status():
    """로그인 상태 확인 API 엔드포인트."""
    if 'user_id' in session:
        return jsonify({"logged_in": True, "username": session['username']}), 200
    else:
        return jsonify({"logged_in": False}), 200