class User:
    def __init__(self, id, username, password_hash=None, full_name=None, phone_number=None):
        self.id = id
        self.username = username
        self.password_hash = password_hash 

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username
        }
