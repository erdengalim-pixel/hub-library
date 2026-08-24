from fastapi import APIRouter
from app.services.books import BookService
from app.schemas.books import BookCreate
from typing import Optional

router = APIRouter()

service = BookService()


@router.get("/books")
def get_books():
    return service.get_books()

@router.get("/books/search")
def search_books(
    title: Optional[str] = None,
    author: Optional[str] = None
):
    return service.search_books(
        title=title,
        author=author
    )

@router.get("/books/{book_id}")
def get_book(book_id: int):
    return service.get_book(book_id)

@router.post("/books")
def create_book(book_create: BookCreate):
    return service.create_book(book_create)