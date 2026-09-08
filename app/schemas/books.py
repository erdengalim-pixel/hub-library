from pydantic import BaseModel


class BookCreate(BaseModel):
    title: str
    author: str
    inventory_number: str

class BookUpdate(BaseModel):
    title: str
    author: str
    inventory_number: str