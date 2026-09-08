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
  <div>
    <h1>Books</h1>

    <button onClick={() => setShowCreateForm(true)}>
      Add book
    </button>

  {showCreateForm && (
    <div>
      <h2>Add book</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />

      <input
        placeholder="Inventory number"
        value={inventoryNumber}
        onChange={(event) => setInventoryNumber(event.target.value)}
      />

      <button onClick={handleCreateBook}>
        Create
      </button>

      <button onClick={() => setShowCreateForm(false)}>
        Cancel
      </button>
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