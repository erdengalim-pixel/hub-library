from fastapi import HTTPException

from app.repositories.books import BookRepository
from app.repositories.borrowings import BorrowingRepository
from app.models.books import Book
from app.schemas.books import BookCreate, BookUpdate

class BookService:

    def __init__(self):
        self.repository = BookRepository()
        self.borrowing_repository = BorrowingRepository()

    def get_books(self):
        books = self.repository.get_all()

        result = []

        for book in books:
            active_borrowings = self.borrowing_repository.count_active_by_book_id(
                book.id
            )


            book_data = {
                "id": book.id,
                "inventory_number": book.inventory_number,
                "title": book.title,
                "author": book.author,
                "is_available": active_borrowings == 0
            }

            result.append(book_data)

        return result

    def get_book(self, book_id):
        book = self.repository.get_by_id(book_id)

        if book is None:
            raise HTTPException(
                status_code=404,
                detail="Book not found"
            )

        active_borrowings = self.borrowing_repository.count_active_by_book_id(
            book.id
        )

        return {
            "id": book.id,
            "inventory_number": book.inventory_number,
            "title": book.title,
            "author": book.author,
            "is_available": active_borrowings == 0
        }

    def create_book(self, book_create: BookCreate):
        inventory_number = book_create.inventory_number.zfill(5)

        existing_book = self.repository.get_by_inventory_number(
            inventory_number
        )

        if existing_book is not None:
            raise HTTPException(
                status_code=400,
                detail="Inventory number already exists"
            )

        book = Book(
            inventory_number=inventory_number,
            title=book_create.title,
            author=book_create.author
        )

        return self.repository.create(book)

    def update_book(self, book_id: int, book_update: BookUpdate):
        book = self.repository.get_by_id(book_id)

        if book is None:
            raise HTTPException(
                status_code=404,
                detail="Book not found"
            )

        inventory_number = book_update.inventory_number.zfill(5)

        existing_book = self.repository.get_by_inventory_number(
            inventory_number
        )

        if existing_book is not None and existing_book.id != book_id:
            raise HTTPException(
                status_code=400,
                detail="Inventory number already exists"
            )

        book.title = book_update.title
        book.author = book_update.author
        book.inventory_number = inventory_number

        return self.repository.update(book)

    def search_books(self, q=None, title=None, author=None):
        books = self.repository.search(
            q=q,
            title=title,
            author=author
        )

        result = []

        for book in books:
            active_borrowings = self.borrowing_repository.count_active_by_book_id(
                book.id
            )

            book_data = {
                "id": book.id,
                "inventory_number": book.inventory_number,
                "title": book.title,
                "author": book.author,
                "is_available": active_borrowings == 0
            }

            result.append(book_data)

        return result

    def delete_book(self, book_id):
        book = self.repository.get_by_id(book_id)

        if book is None:
            raise HTTPException(
                status_code=404,
                detail="Book not found"
            )

        if not book.is_active:
            raise HTTPException(
                status_code=400,
                detail="Book already deleted"
            )

        active_borrowings = self.borrowing_repository.count_active_by_book_id(
            book.id
        )

        if active_borrowings > 0:
            raise HTTPException(
                status_code=400,
                detail="Book is currently borrowed"
            )

        book.is_active = False

        self.repository.update(book)

        return {
            "message": "Book deleted successfully"
        }
    
    def restore_book(self, book_id):
        book = self.repository.get_by_id(book_id)

        if book is None:
            raise HTTPException(
                status_code=404,
                detail="Book not found"
            )

        if book.is_active:
            raise HTTPException(
                status_code=400,
                detail="Book is already active"
            )

        book.is_active = True

        self.repository.update(book)

        return {
            "message": "Book restored successfully"
        }

    def get_inactive_books(self):
        books = self.repository.get_inactive()

        result = []

        for book in books:
            result.append({
                "id": book.id,
                "inventory_number": book.inventory_number,
                "title": book.title,
                "author": book.author
            })

        return result