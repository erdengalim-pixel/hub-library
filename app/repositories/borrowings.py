borrowings = []


class BorrowingRepository:

    def get_all(self):
        return borrowings

    def create(self, borrowing):
        borrowings.append(borrowing)
        return borrowing

    def count_active_by_book_id(self, book_id):
        count = 0

        for borrowing in borrowings:
            if (
                borrowing["book_id"] == book_id
                and borrowing["status"] == "active"
            ):
                count += 1

        return count
    
    def get_by_id(self, borrowing_id):
        for borrowing in borrowings:
            if borrowing["id"] == borrowing_id:
                return borrowing

        return None

    def get_active(self):
        active_borrowings = []

        for borrowing in borrowings:
            if borrowing["status"] == "active":
                active_borrowings.append(borrowing)

        return active_borrowings