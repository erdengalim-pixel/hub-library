import { useState } from "react"
import type { Book } from "../types/book"
import {
  createBorrowing,
  deleteBook,
  updateBook
} from "../services/api"

interface BookCardProps {
  book: Book
}

function BookCard({ book }: BookCardProps) {
  const [showForm, setShowForm] = useState(false)

  const [showEditForm, setShowEditForm] = useState(false)

  const [editTitle, setEditTitle] = useState(book.title)
  const [editAuthor, setEditAuthor] = useState(book.author)
  const [editInventoryNumber, setEditInventoryNumber] = useState(
    book.inventory_number
  )

  const [tenantName, setTenantName] = useState("")
  const [company, setCompany] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  async function handleBorrow() {
    try {
      await createBorrowing(
        book.id,
        tenantName,
        company,
        phoneNumber
      )

      alert("Book borrowed successfully")
      setShowForm(false)
    } catch (error) {
      console.error(error)
      alert("Failed to borrow book")
    }
  }

  async function handleDelete() {
    try {
      await deleteBook(book.id)

      alert("Book deleted successfully")
    } catch (error) {
      console.error(error)
      alert("Failed to delete book")
    }
  }

  async function handleEdit() {
    try {
      await updateBook(
        book.id,
        editTitle,
        editAuthor,
        editInventoryNumber
      )

      alert("Book updated successfully")

      setShowEditForm(false)
    } catch (error) {
      console.error(error)
      alert("Failed to update book")
    }
  }

  return (
    <div className="book-card">
      <h2>{book.title}</h2>

      <p className="book-author">{book.author}</p>

      <p>Inventory: {book.inventory_number}</p>

      <p className={book.is_available ? "available" : "borrowed"}>
        {book.is_available ? "Available" : "Borrowed"}
      </p>

      {book.is_available && (
          <button onClick={() => setShowForm(true)}>
            Borrow
          </button>
        )}

          <button onClick={() => setShowEditForm(true)}>
            Edit
          </button>

          <button onClick={handleDelete}>
            Delete
          </button>        

      {showForm && (
        <div>
          <input
            placeholder="Tenant name"
            value={tenantName}
            onChange={(event) => setTenantName(event.target.value)}
          />

          <input
            placeholder="Company"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />

          <div>
            <span>+7 </span>

            <input
              placeholder="7023334433"
              value={phoneNumber}
              maxLength={10}
              onChange={(event) => {
                const value = event.target.value.replace(/\D/g, "")
                setPhoneNumber(value)
              }}
            />
          </div>

          <button onClick={handleBorrow}>
            Confirm
          </button>

          <button onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      )}

      {showEditForm && (
        <div>
          <h3>Edit book</h3>

          <input
            placeholder="Title"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
          />

          <input
            placeholder="Author"
            value={editAuthor}
            onChange={(event) => setEditAuthor(event.target.value)}
          />

          <input
            placeholder="Inventory number"
            value={editInventoryNumber}
            onChange={(event) => setEditInventoryNumber(event.target.value)}
          />

          <button onClick={handleEdit}>
            Save
          </button>

          <button onClick={() => setShowEditForm(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default BookCard