from sqlalchemy import Column, Integer, String, Date, ForeignKey

from app.database import Base


class Borrowing(Base):
    __tablename__ = "borrowings"

    id = Column(Integer, primary_key=True)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)
    tenant_name = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    phone_number = Column(String(30), nullable=False)
    borrow_date = Column(Date, nullable=False)
    due_date = Column(Date, nullable=False)
    return_date = Column(Date, nullable=True)
    status = Column(String(50), nullable=False)
