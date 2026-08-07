from fastapi import FastAPI
from app.routers import books, borrowings

app = FastAPI()

app.include_router(books.router)
app.include_router(borrowings.router)


@app.get("/")
def root():
    return {"message": "Welcome to HUB Library!"}