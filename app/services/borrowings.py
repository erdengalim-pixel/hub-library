from fastapi import HTTPException

from app.repositories.books import BookRepository
from app.repositories.borrowings import BorrowingRepository
from app.models.borrowings import Borrowing

from datetime import date, timedelta

class BorrowingService:

    def __init__(self):
        self.book_repository = BookRepository()
        self.borrowing_repository = BorrowingRepository()

    def borrow_book(self, book_id, tenant_name, company, phone_number):
        book = self.book_repository.get_by_id(book_id)

        if book is None:
            raise HTTPException(
                status_code=404,
                detail="Book not found"
            )

        active_borrowings = self.borrowing_repository.count_active_by_book_id(
            book_id
        )


        if active_borrowings > 0:
            raise HTTPException(
                status_code=400,
                detail="Book is not available"
            )

        borrowing = Borrowing(
            book_id=book_id,
            tenant_name=tenant_name,
            company=company,
            phone_number=phone_number,
            borrow_date=date.today(),
            due_date=date.today() + timedelta(days=30),
            return_date=None,
            status="active"
        )
        

        return self.borrowing_repository.create(borrowing)

    def return_book(self, borrowing_id):
        borrowing = self.borrowing_repository.get_by_id(borrowing_id)

        if borrowing is None:
            raise HTTPException(
                status_code=404,
                detail="Borrowing not found"
            )

        if borrowing.status == "returned":
            raise HTTPException(
                status_code=400,
                detail="Book already returned"
            )

        borrowing.status = "returned"
        borrowing.return_date = date.today()

        return self.borrowing_repository.update(borrowing)

    def get_borrowings(self):
        return self.borrowing_repository.get_all()

    def get_active_borrowings(self):
        return self.borrowing_repository.get_active()

    def get_overdue_borrowings(self):
        active_borrowings = self.borrowing_repository.get_active()

        overdue_borrowings = []

        for borrowing in active_borrowings:
            if borrowing.due_date < date.today():
                overdue_borrowings.append(borrowing)

        return overdue_borrowings

    def extend_borrowing(self, borrowing_id, days):
        borrowing = self.borrowing_repository.get_by_id(borrowing_id)

        if borrowing is None:
            raise HTTPException(
                status_code=404,
                detail="Borrowing not found"
            )

        if borrowing.status == "returned":
            raise HTTPException(
                status_code=400,
                detail="Book already returned"
            )

        if days <= 0:
            raise HTTPException(
                status_code=400,
                detail="Days must be greater than 0"
            )

        borrowing.due_date = borrowing.due_date + timedelta(days=days)

        return self.borrowing_repository.update(borrowing)
    
    def get_borrowing(self, borrowing_id):
        borrowing = self.borrowing_repository.get_by_id(borrowing_id)

        if borrowing is None:
            raise HTTPException(
                status_code=404,
                detail="Borrowing not found"
            )

        return borrowing