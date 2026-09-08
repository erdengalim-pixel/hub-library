import { useEffect, useState } from "react"
import {
  getInactiveBooks,
  restoreBook,
  type InactiveBook
} from "../services/api"

function InactiveBooksPage() {
  const [books, setBooks] = useState<InactiveBook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

    async function handleRestore(bookId: number) {
        try {
            await restoreBook(bookId)

            alert("Book restored successfully")

            const data = await getInactiveBooks()
            setBooks(data)
        } catch (error) {
            console.error(error)
            alert("Failed to restore book")
        }
    }

  useEffect(() => {
    getInactiveBooks()
      .then((data) => {
        setBooks(data)
      })
      .catch(() => {
        setError("Failed to load inactive books")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Loading inactive books...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>Inactive Books</h1>

      {books.length === 0 ? (
        <p>No inactive books found.</p>
      ) : (
        <div>
          {books.map((book) => (
            <div key={book.id}>
              <h2>{book.title}</h2>

              <p>{book.author}</p>

              <p>
                Inventory: {book.inventory_number}
              </p>

              <button onClick={() => handleRestore(book.id)}>
                Restore
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InactiveBooksPage