# src/database/migrate.py
import sqlite3
import os
from src.config import Config

def apply_migrations():
    conn = None
    try:
        conn = sqlite3.connect(Config.DATABASE_PATH)
        cursor = conn.cursor()

        with open('migrations/001_initial_schema.sql', 'r') as f:
            sql_script = f.read()
            cursor.executescript(sql_script)
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
    os.makedirs(os.path.dirname(Config.DATABASE_PATH), exist_ok=True)
    apply_migrations()