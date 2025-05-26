# src/routes/user_routes.py
from flask import Blueprint, jsonify, request, session # session 추가
from src.database.user_queries import get_user_by_username, create_user, verify_password
from src.models.user_model import User # User 모델 임포트

user_bp = Blueprint('users', __name__)

# 기존 list_users와 add_user 함수는 그대로 유지하거나 제거 (프로젝트 요구사항에 따라)
# @user_bp.route('/', methods=['GET'])
# def list_users():
#    ...

# @user_bp.route('/', methods=['POST'])
# def add_user():
#    ...


@user_bp.route('/register', methods=['POST'])
def register_user():
    """회원가입 API 엔드포인트."""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email') # 회원가입 폼에 이메일 필드 추가 고려
    full_name = data.get('full_name') # 회원가입 폼에 이름 필드 추가 고려
    phone_number = data.get('phone_number') # 회원가입 폼에 전화번호 필드 추가 고려

    if not username or not password:
        return jsonify({"error": "아이디와 비밀번호는 필수입니다."}), 400

    if get_user_by_username(username):
        return jsonify({"error": "이미 존재하는 아이디입니다."}), 409 # Conflict

    new_user = create_user(username, password, email, full_name, phone_number)
    if new_user:
        # 회원가입 성공 시 바로 로그인 처리할 수도 있습니다.
        # 여기서는 단순히 성공 메시지 반환
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
        # 로그인 성공: 세션에 사용자 정보 저장
        session['user_id'] = user.id
        session['username'] = user.username
        return jsonify({"message": "로그인 성공!", "username": user.username}), 200
    else:
        return jsonify({"error": "아이디 또는 비밀번호가 올바르지 않습니다."}), 401 # Unauthorized

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