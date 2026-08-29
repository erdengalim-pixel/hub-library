from fastapi import FastAPI
from app.routers import books, borrowings
from fastapi.middleware.cors import CORSMiddleware
from app.routers.auth import router as auth_router

app = FastAPI()

app.include_router(books.router)
app.include_router(borrowings.router)
app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "Welcome to HUB Library!"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)