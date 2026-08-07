from fastapi import APIRouter

from app.schemas.borrowings import BorrowingCreate
from app.services.borrowings import BorrowingService


router = APIRouter()

service = BorrowingService()


@router.post("/borrowings")
def create_borrowing(data: BorrowingCreate):
    return service.borrow_book(
        book_id=data.book_id,
        tenant_name=data.tenant_name,
        company=data.company
    )

@router.post("/borrowings/{borrowing_id}/return")
def return_book(borrowing_id: int):
    return service.return_book(borrowing_id)

@router.get("/borrowings")
def get_borrowings():
    return service.get_borrowings()

@router.get("/borrowings/active")
def get_active_borrowings():
    return service.get_active_borrowings()

@router.get("/borrowings/overdue")
def get_overdue_borrowings():
    return service.get_overdue_borrowings()