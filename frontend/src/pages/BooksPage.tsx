import { useEffect, useState } from "react"

import type { Book } from "../types/book"
import { getBooks, searchBooks } from "../services/api"
import BookCard from "../components/BookCard"
import SearchBar from "../components/SearchBar"

function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    getBooks()
      .then((data) => {
        setBooks(data)
      })
      .catch(() => {
        setError("Failed to load books")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  async function handleSearch() {
    if (!search.trim()) {
      const data = await getBooks()
      setBooks(data)
      return
    }

    try {
      setLoading(true)
      setError("")

      const data = await searchBooks(search)
      setBooks(data)
    } catch {
      setError("Failed to search books")
    } finally {
      setLoading(false)
    }
  }

  async function clearSearch() {
    setSearch("")
    setError("")
    setLoading(true)

    try {
      const data = await getBooks()
      setBooks(data)
    } catch {
      setError("Failed to load books")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p>Loading books...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

return (
  <div>
    <h1>Books</h1>

    <SearchBar
  value={search}
  onChange={setSearch}
  onSearch={handleSearch}
  onClear={clearSearch}
/>

    {books.length === 0 ? (
      <p>No books found.</p>
    ) : (
      <div className="books-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    )}
  </div>
)
}

export default BooksPage