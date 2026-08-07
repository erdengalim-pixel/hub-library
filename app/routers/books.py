from fastapi import APIRouter
from app.services.books import BookService

router = APIRouter()

service = BookService()


@router.get("/books")
def get_books():
    return service.get_books()

@router.get("/books/{book_id}")
def get_book(book_id: int):
    return service.get_book(book_id)