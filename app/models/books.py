from sqlalchemy import Column, Integer, String

from app.database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True)
    inventory_number = Column(String(20), unique=True, nullable=False)
    title = Column(String(255), nullable=False)
    author = Column(String(255), nullable=False)
    
