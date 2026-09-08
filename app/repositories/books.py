from app.database import SessionLocal
from app.models.books import Book


class BookRepository:

    def get_all(self):
        db = SessionLocal()

        try:
            return (
        db.query(Book)
        .filter(Book.is_active == True)
        .all()
            )
        finally:
            db.close()

    def get_inactive(self):
        db = SessionLocal()

        try:
            return (
                db.query(Book)
                .filter(Book.is_active == False)
                .all()
            )
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

    def update(self, book):
        db = SessionLocal()

        try:
            merged_book = db.merge(book)

            db.commit()

            db.refresh(merged_book)

            return merged_book
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

    def search(self, q=None, title=None, author=None):
        db = SessionLocal()

        try:
            query = db.query(Book)

            query = query.filter(Book.is_active == True)

            if q:
                query = query.filter(
                    (Book.title.ilike(f"%{q}%")) |
                    (Book.author.ilike(f"%{q}%"))
                )

            if title:
                query = query.filter(Book.title.ilike(f"%{title}%"))

            if author:
                query = query.filter(Book.author.ilike(f"%{author}%"))

            return query.all()

        finally:
            db.close()