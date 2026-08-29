from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

from app.database import SessionLocal
from app.models.users import User
from app.core.security import (
    verify_password,
    create_access_token,
    get_current_user
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(data: LoginRequest):
    db = SessionLocal()

    try:
        user = (
            db.query(User)
            .filter(User.username == data.username)
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid username or password"
            )

        if not user.is_active:
            raise HTTPException(
                status_code=401,
                detail="User is inactive"
            )

        if not verify_password(
            data.password,
            user.password_hash
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid username or password"
            )

        access_token = create_access_token({
            "sub": str(user.id),
            "username": user.username
        })

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }

    finally:
        db.close()

@router.get("/auth/me")
def get_me(current_user = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name
    }