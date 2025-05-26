# src/database/connection.py
import sqlite3
import os
from src.config import Config

def get_db_connection():
    """SQLite 데이터베이스 연결을 반환합니다."""
    try:
        # 데이터베이스 파일이 없는 경우 자동으로 생성됩니다.
        conn = sqlite3.connect(Config.DATABASE_PATH)
        conn.row_factory = sqlite3.Row # 결과를 딕셔너리 형태로 반환하도록 설정 (컬럼 이름으로 접근 가능)
        return conn
    except sqlite3.Error as e:
        print(f"SQLite 데이터베이스 연결 오류: {e}")
        raise

def close_db_connection(conn):
    """데이터베이스 연결을 닫습니다."""
    if conn:
        conn.close()