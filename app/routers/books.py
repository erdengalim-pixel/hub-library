from fastapi import APIRouter
from app.services.books import BookService
from app.schemas.books import BookCreate

router = APIRouter()

service = BookService()


@router.get("/books")
def get_books():
    return service.get_books()

@router.get("/books/search")
def search_books(title: str):
    return service.search_books(title)

@router.get("/books/{book_id}")
def get_book(book_id: int):
    return service.get_book(book_id)

@router.post("/books")
def create_book(book_create: BookCreate):
    return service.create_book(book_create)