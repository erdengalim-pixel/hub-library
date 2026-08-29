import type { Book } from "../types/book"

interface BookCardProps {
  book: Book
}

function BookCard({ book }: BookCardProps) {
  return (
    <div className="book-card">
      <h2>{book.title}</h2>

      <p className="book-author">{book.author}</p>

      <p>Inventory: {book.inventory_number}</p>

      <p className={book.is_available ? "available" : "borrowed"}>
        {book.is_available ? "Available" : "Borrowed"}
      </p>
    </div>
  )
}

export default BookCard