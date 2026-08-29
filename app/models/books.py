from sqlalchemy import Column, Integer, String, Boolean

from app.database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True)
    inventory_number = Column(String(20), unique=True, nullable=False)
    title = Column(String(255), nullable=False)
    author = Column(String(255), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
