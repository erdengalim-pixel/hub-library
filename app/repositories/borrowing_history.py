from app.database import SessionLocal
from app.models.borrowing_history import BorrowingHistory
from app.models.users import User

class BorrowingHistoryRepository:

    def create(self, history):
        db = SessionLocal()

        try:
            db.add(history)
            db.commit()
            db.refresh(history)

            return history
        finally:
            db.close()

    def get_by_borrowing_id(self, borrowing_id):
        db = SessionLocal()

        try:
            return (
                db.query(BorrowingHistory, User)
                .join(User, BorrowingHistory.admin_id == User.id)
                .filter(
                    BorrowingHistory.borrowing_id == borrowing_id
                )
                .order_by(BorrowingHistory.created_at)
                .all()
            )
        finally:
            db.close()