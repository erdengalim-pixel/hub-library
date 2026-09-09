import { useEffect, useState } from "react"

import type { Book } from "../types/book"
import { getBooks, searchBooks } from "../services/api"
import SearchBar from "../components/SearchBar"

interface PublicCatalogPageProps {
  onAdminLogin: () => void
}

function PublicCatalogPage({
  onAdminLogin
}: PublicCatalogPageProps) {
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
    return <p>Loading catalog...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <div className="public-header">
        <div className="public-header-content">
          <div className="public-logo">
            <span className="logo-icon">📚</span>
            <span>Hub Library</span>
          </div>

          <button
            className="public-login-button"
            onClick={onAdminLogin}
          >
            Login
          </button>
        </div>
      </div>

      <div className="page-container">
        <h1>Library Catalog</h1>

        <p>
          Browse the available books in the library.
        </p>

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
              <div className="book-card" key={book.id}>
                <h2>{book.title}</h2>

                <p className="book-author">
                  {book.author}
                </p>

                <p>
                  Inventory: {book.inventory_number}
                </p>

                <p
                  className={
                    book.is_available
                      ? "available"
                      : "borrowed"
                  }
                >
                  {book.is_available
                    ? "Available"
                    : "Borrowed"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default PublicCatalogPage