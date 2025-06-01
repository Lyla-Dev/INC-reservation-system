import sqlite3
import os
from config import Config

def get_db_connection():
    os.makedirs(os.path.dirname(Config.DATABASE_PATH), exist_ok=True)
    
    """SQLite 데이터베이스 연결을 반환합니다."""
    try:
        conn = sqlite3.connect(Config.DATABASE_PATH)
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        print(f"SQLite 데이터베이스 연결 오류: {e}")
        raise

def close_db_connection(conn):
    """데이터베이스 연결을 닫습니다."""
    if conn:
        conn.close()