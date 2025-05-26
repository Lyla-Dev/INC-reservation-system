# src/config.py
import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DATABASE_PATH = os.path.join(BASE_DIR, 'data', 'app.db')

class Config:
    DATABASE_PATH = DATABASE_PATH # 위에 정의한 DATABASE_PATH 변수를 클래스 속성으로 추가
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key_here')
    DEBUG = True # 개발 환경에서 True, 배포 환경에서는 False