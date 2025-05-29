from flask import g
from models.user_model import User
from werkzeug.security import generate_password_hash, check_password_hash # 추가

def get_user_by_username(username):
    """사용자 이름으로 사용자 정보를 조회합니다."""
    cursor = g.db.cursor()
    cursor.execute("SELECT id, username, password_hash FROM users WHERE username = ?", (username, ))
    user_data = cursor.fetchone()
    if user_data:
        return User(
            id=user_data['id'],
            username=user_data['username'],
            password_hash=user_data['password_hash'] if 'password_hash' in user_data.keys() else None
        )
    return None

def create_user(username, password):
    """새로운 사용자를 생성하고 비밀번호를 해싱하여 저장합니다."""
    hashed_password = generate_password_hash(password)
    cursor = g.db.cursor()
    try:
        cursor.execute(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)",
            (username, hashed_password)
        )
        g.db.commit()
        user_id = cursor.lastrowid
        return User(id=user_id, username=username)
    except Exception as e:
        print(f"사용자 생성 오류: {e}")
        g.db.rollback()
        return None

def verify_password(stored_password_hash, provided_password):
    """저장된 해시된 비밀번호와 제공된 비밀번호를 비교합니다."""
    return check_password_hash(stored_password_hash, provided_password)