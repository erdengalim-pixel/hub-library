from app.database import SessionLocal
from app.models.borrowings import Borrowing


class BorrowingRepository:

    def get_all(self):
        db = SessionLocal()

        try:
            return db.query(Borrowing).all()
        finally:
            db.close()

    def get_by_id(self, borrowing_id):
        db = SessionLocal()

        try:
            return (
                db.query(Borrowing)
                .filter(Borrowing.id == borrowing_id)
                .first()
            )
        finally:
            db.close()

    def get_active(self):
        db = SessionLocal()

        try:
            return (
                db.query(Borrowing)
                .filter(Borrowing.status == "active")
                .all()
            )
        finally:
            db.close()      

    def count_active_by_book_id(self, book_id):
        db = SessionLocal()

        try:
            return (
                db.query(Borrowing)
                .filter(
                    Borrowing.book_id == book_id,
                    Borrowing.status == "active"
                )
                .count()
            )
        finally:
            db.close()

    def create(self, borrowing):
        db = SessionLocal()

        try:
            db.add(borrowing)
            db.commit()
            db.refresh(borrowing)

            return borrowing
        finally:
            db.close()

    def update(self, borrowing):
        db = SessionLocal()

        try:
            borrowing = db.merge(borrowing)
            db.commit()
            db.refresh(borrowing)

            return borrowing
        finally:
            db.close()