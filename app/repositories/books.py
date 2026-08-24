from app.database import SessionLocal
from app.models.books import Book


class BookRepository:

    def get_all(self):
        db = SessionLocal()

        try:
            return db.query(Book).all()
        finally:
            db.close()

    def get_by_id(self, book_id):
        db = SessionLocal()

        try:
            return db.query(Book).filter(Book.id == book_id).first()
        finally:
            db.close()


    def get_by_inventory_number(self, inventory_number):
        db = SessionLocal()

        try:
            return (
                db.query(Book)
                .filter(Book.inventory_number == inventory_number)
                .first()
            )
        finally:
            db.close()

    def create(self, book):
        db = SessionLocal()

        try:
            db.add(book)
            db.commit()
            db.refresh(book)

            return book
        finally:
            db.close()

    def search_by_title(self, title):
        db = SessionLocal()

        try:
            return (
                db.query(Book)
                .filter(Book.title.ilike(f"%{title}%"))
                .all()
            )
        finally:
            db.close()

    def search(self, title=None, author=None):
        db = SessionLocal()

        try:
            query = db.query(Book)

            if title:
                query = query.filter(Book.title.ilike(f"%{title}%"))

            if author:
                query = query.filter(Book.author.ilike(f"%{author}%"))

            return query.all()

        finally:
            db.close()