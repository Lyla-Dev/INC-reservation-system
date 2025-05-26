# src/database/user_queries.py
from flask import g # g 객체를 통해 현재 요청의 DB 연결에 접근
from src.models.user_model import User

def get_all_users():
    cursor = g.db.cursor()
    cursor.execute("SELECT id, username, email FROM users;")
    users_data = cursor.fetchall()
    users = [User(row['id'], row['username'], row['email']) for row in users_data]
    return users

def create_user(username, email):
    cursor = g.db.cursor()
    try:
        cursor.execute("INSERT INTO users (username, email) VALUES (?, ?)", (username, email))
        g.db.commit() # 변경사항 커밋
        user_id = cursor.lastrowid # SQLite에서 마지막으로 삽입된 행의 ID를 가져옴
        return User(user_id, username, email)
    except Exception as e:
        print(f"사용자 생성 오류: {e}")
        g.db.rollback() # 오류 발생 시 롤백
        return None