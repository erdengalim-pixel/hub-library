from app.database import SessionLocal
from app.models.users import User
from app.core.security import hash_password


def create_admin(
    username: str,
    first_name: str,
    last_name: str,
    password: str
):
    db = SessionLocal()

    try:
        existing_user = (
            db.query(User)
            .filter(User.username == username)
            .first()
        )

        if existing_user is not None:
            raise ValueError("Username already exists")

        user = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password_hash=hash_password(password),
            is_active=True
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user

    finally:
        db.close()