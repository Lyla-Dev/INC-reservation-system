import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DATABASE_PATH = os.path.join(BASE_DIR, 'data', 'app.db')

class Config:
    DATABASE_PATH = DATABASE_PATH 
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key_here')
    DEBUG = True 