from app.repositories.books import BookRepository
from fastapi import HTTPException
from app.repositories.borrowings import BorrowingRepository

class BookService:

    def __init__(self):
        self.repository = BookRepository()

    def get_books(self):
        return self.repository.get_all()

    def get_books(self):
        books = self.repository.get_all()

        result = []

        for book in books:
            active_borrowings = self.borrowing_repository.count_active_by_book_id(
                book["id"]
            )

            available_quantity = book["quantity"] - active_borrowings

            book_data = book.copy()
            book_data["available_quantity"] = available_quantity

            result.append(book_data)

        return result

    def __init__(self):
        self.repository = BookRepository()
        self.borrowing_repository = BorrowingRepository()