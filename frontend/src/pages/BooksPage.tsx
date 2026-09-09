import { useEffect, useState } from "react"

import type { Book } from "../types/book"
import { getBooks, searchBooks, createBook } from "../services/api"
import BookCard from "../components/BookCard"
import SearchBar from "../components/SearchBar"

function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [inventoryNumber, setInventoryNumber] = useState("")

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

  async function handleCreateBook() {
    try {
      await createBook(
        title,
        author,
        inventoryNumber
      )

      alert("Book created successfully")

      setTitle("")
      setAuthor("")
      setInventoryNumber("")
      setShowCreateForm(false)

      const data = await getBooks()
      setBooks(data)
    } catch (error) {
      console.error(error)
      alert("Failed to create book")
    }
  }

  if (loading) {
    return <p>Loading books...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

return (
  <div className="page-container">
    <h1>Books</h1>

    <button onClick={() => setShowCreateForm(true)}>
      Add book
    </button>

  {showCreateForm && (
  <div className="form-panel">
    <h2>Add book</h2>

    <div className="form-field">
      <label>Title</label>
      <input
        placeholder="Enter book title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
    </div>

    <div className="form-field">
      <label>Author</label>
      <input
        placeholder="Enter author name"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />
    </div>

    <div className="form-field">
      <label>Inventory number</label>
      <input
        placeholder="Enter inventory number"
        value={inventoryNumber}
        onChange={(event) => setInventoryNumber(event.target.value)}
      />
    </div>

    <div className="form-actions">
      <button onClick={handleCreateBook}>
        Add book
      </button>

      <button
        className="clear-button"
        onClick={() => setShowCreateForm(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}

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