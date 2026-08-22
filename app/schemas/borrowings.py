from pydantic import BaseModel, validator

class BorrowingCreate(BaseModel):
    book_id: int
    tenant_name: str
    company: str
    phone_number: str

    @validator("phone_number")
    def validate_phone_number(cls, value):
        if value.startswith("+7"):
            phone = value[2:]
        else:
            phone = value

        if not phone.isdigit():
            raise ValueError("Phone number must contain only digits")

        if len(phone) != 10:
            raise ValueError("Phone number must contain 10 digits")

        return "+7" + phone

class BorrowingExtend(BaseModel):
    days: int

    