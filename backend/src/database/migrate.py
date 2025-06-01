# src/database/migrate.py
import sqlite3
import os
from config import Config

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
migrations_dir = os.path.join(base_dir, 'migrations')


def apply_migrations():
    conn = None
    try:
        conn = sqlite3.connect(Config.DATABASE_PATH)
        cursor = conn.cursor()

        with open(os.path.join(migrations_dir, '001_initial_schema.sql'), 'r', encoding='utf-8') as f:
            sql_script = f.read()
            cursor.executescript(sql_script)
            
        with open(os.path.join(migrations_dir, '002_insert_initial_tables.sql'), 'r', encoding='utf-8') as f:
            insert_script = f.read()
            cursor.executescript(insert_script)
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