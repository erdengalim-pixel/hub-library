from pydantic import BaseModel


class BorrowingCreate(BaseModel):
    book_id: int
    tenant_name: str
    company: str