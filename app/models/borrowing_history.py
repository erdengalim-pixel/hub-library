from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime, timezone

from app.database import Base


class BorrowingHistory(Base):
    __tablename__ = "borrowing_history"

    id = Column(
        Integer,
        primary_key=True
    )

    borrowing_id = Column(
        Integer,
        ForeignKey("borrowings.id"),
        nullable=False
    )

    admin_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    action = Column(
        String(50),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )