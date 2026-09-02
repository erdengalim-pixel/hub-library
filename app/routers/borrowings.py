from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.schemas.borrowings import BorrowingCreate, BorrowingExtend
from app.services.borrowings import BorrowingService

router = APIRouter(
    dependencies=[Depends(get_current_user)]
)


service = BorrowingService()


@router.post("/borrowings")
def create_borrowing(
    data: BorrowingCreate,
    current_user = Depends(get_current_user)
):

    return service.borrow_book(
        book_id=data.book_id,
        tenant_name=data.tenant_name,
        company=data.company,
        phone_number=data.phone_number,
        admin_id=current_user.id
    )

@router.post("/borrowings/{borrowing_id}/return")
def return_book(
    borrowing_id: int,
    current_user = Depends(get_current_user)
):

    return service.return_book(
        borrowing_id=borrowing_id,
        admin_id=current_user.id
    )

@router.post("/borrowings/{borrowing_id}/extend")
def extend_borrowing(
    borrowing_id: int,
    data: BorrowingExtend,
    current_user = Depends(get_current_user)
):
    return service.extend_borrowing(
        borrowing_id=borrowing_id,
        days=data.days,
        admin_id=current_user.id
    )
@router.get("/borrowings")
def get_borrowings():
    return service.get_borrowings()

@router.get("/borrowings/active")
def get_active_borrowings():
    return service.get_active_borrowings()

@router.get("/borrowings/{borrowing_id}/history")
def get_borrowing_history(borrowing_id: int):
    return service.get_borrowing_history(borrowing_id)


@router.get("/borrowings/{borrowing_id}")
def get_borrowing(borrowing_id: int):
    return service.get_borrowing(borrowing_id)

