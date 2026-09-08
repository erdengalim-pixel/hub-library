from fastapi import APIRouter, Depends
from app.services.books import BookService
from app.schemas.books import BookCreate, BookUpdate
from typing import Optional
from app.core.security import get_current_user

router = APIRouter()

service = BookService()


@router.get("/books")
def get_books():
    return service.get_books()

@router.get("/books/search")
def search_books(
    q: Optional[str] = None,
    title: Optional[str] = None,
    author: Optional[str] = None
):
    return service.search_books(
        q=q,
        title=title,
        author=author
    )

@router.get("/books/inactive")
def get_inactive_books(
    current_user = Depends(get_current_user)
):
    return service.get_inactive_books()

@router.get("/books/{book_id}")
def get_book(book_id: int):
    return service.get_book(book_id)

@router.post("/books")
def create_book(
    book_create: BookCreate,
    current_user = Depends(get_current_user)
):
    return service.create_book(book_create)

@router.put("/books/{book_id}")
def update_book(
    book_id: int,
    book_update: BookUpdate,
    current_user = Depends(get_current_user)
):
    return service.update_book(
        book_id,
        book_update
    )

@router.delete("/books/{book_id}")
def delete_book(
    book_id: int,
    current_user = Depends(get_current_user)
):
    return service.delete_book(book_id)

@router.post("/books/{book_id}/restore")
def restore_book(
    book_id: int,
    current_user = Depends(get_current_user)
):
    return service.restore_book(book_id)

