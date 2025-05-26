# src/database/migrate.py
import sqlite3
import os
from src.config import Config

def apply_migrations():
    conn = None
    try:
        # 데이터베이스 파일이 없는 경우 자동으로 생성됩니다.
        conn = sqlite3.connect(Config.DATABASE_PATH)
        cursor = conn.cursor()

        # 마이그레이션 스크립트 실행
        with open('migrations/001_create_users_table.sql', 'r') as f:
            sql_script = f.read()
            cursor.executescript(sql_script) # 여러 SQL 문을 한 번에 실행
        conn.commit()
        print(f"마이그레이션 적용 완료: {Config.DATABASE_PATH}에 테이블 생성")
    except sqlite3.Error as e:
        print(f"마이그레이션 적용 오류: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    # data 디렉토리가 없으면 생성 (ensure data directory exists)
    os.makedirs(os.path.dirname(Config.DATABASE_PATH), exist_ok=True)
    apply_migrations()