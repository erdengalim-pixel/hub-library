books = [
    {
        "id": 1,
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "quantity": 3,
    },
    {
        "id": 2,
        "title": "Design Patterns",
        "author": "Gang of Four",
        "quantity": 2,
    },
]


class BookRepository:
    def get_all(self):
        return books

    def get_by_id(self, book_id):
        for book in books:
            if book["id"] == book_id:
                return book

        return None