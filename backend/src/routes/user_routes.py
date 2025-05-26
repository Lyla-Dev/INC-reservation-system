# src/routes/user_routes.py
from flask import Blueprint, jsonify, request
from src.database.user_queries import get_all_users, create_user

user_bp = Blueprint('users', __name__)

@user_bp.route('/', methods=['GET'])
def list_users():
    users = get_all_users()
    return jsonify([user.to_dict() for user in users])

@user_bp.route('/', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')

    if not username or not email:
        return jsonify({"error": "Username and email are required"}), 400

    new_user = create_user(username, email)
    if new_user:
        return jsonify(new_user.to_dict()), 201
    else:
        return jsonify({"error": "Failed to create user"}), 500