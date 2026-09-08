import { useEffect, useState } from "react"
import {
  getBorrowings,
  getActiveBorrowings,
  getOverdueBorrowings,
  getBorrowingHistory,
  extendBorrowing,
  returnBorrowing,
  type Borrowing,
  type BorrowingHistoryItem,
} from "../services/api"

function BorrowingsPage() {
  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("en-GB")
  }

  function formatDateTime(date: string): string {
    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const [borrowings, setBorrowings] = useState<Borrowing[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "overdue">("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedBorrowingId, setSelectedBorrowingId] = useState<number | null>(null)
  const [history, setHistory] = useState<BorrowingHistoryItem[]>([])
  const [extendDays, setExtendDays] = useState(7)
  const [extendingBorrowingId, setExtendingBorrowingId] = useState<number | null>(null)

async function handleViewHistory(borrowingId: number) {
  try {
    const data = await getBorrowingHistory(borrowingId)

    setSelectedBorrowingId(borrowingId)
    setHistory(data)
  } catch {
    setError("Failed to load borrowing history")
  }
}

async function handleExtend(borrowingId: number) {
  try {
    await extendBorrowing(borrowingId, extendDays)

    alert("Borrowing extended successfully")

    const data = await getBorrowings()
    setBorrowings(data)

    setExtendingBorrowingId(null)
  } catch (error) {
    console.error(error)
    alert("Failed to extend borrowing")
  }
}

async function handleReturn(borrowingId: number) {
  try {
    await returnBorrowing(borrowingId)

    alert("Book returned successfully")

    const data = await getBorrowings()
    setBorrowings(data)
  } catch (error) {
    console.error(error)
    alert("Failed to return book")
  }
}

async function loadBorrowings() {
  try {
    let data: Borrowing[]

    if (filter === "active") {
      data = await getActiveBorrowings()
    } else if (filter === "overdue") {
      data = await getOverdueBorrowings()
    } else {
      data = await getBorrowings()
    }

    setBorrowings(data)
  } catch {
    setError("Failed to load borrowings")
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  loadBorrowings()
}, [filter])

  if (loading) {
    return <p>Loading borrowings...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>Borrowings</h1>

      <div>
        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("active")}>
          Active
        </button>

        <button onClick={() => setFilter("overdue")}>
          Overdue
        </button>
      </div>

      {borrowings.length === 0 ? (
  <p>No borrowings found.</p>
) : (
  <div>
    {borrowings.map((borrowing) => {
      console.log("BORROWING:", borrowing)

      return (
        <div key={borrowing.id}>
          <h3>Borrowing #{borrowing.id}</h3>

          <p>
            <strong>Book:</strong> {borrowing.book_title}
          </p>

          <p>
            <strong>Tenant:</strong> {borrowing.tenant_name}
          </p>

          <p>
            <strong>Company:</strong> {borrowing.company}
          </p>

          <p>
            <strong>Status:</strong> {borrowing.status}
          </p>

          {borrowing.status === "active" && (
            <button
              onClick={() => setExtendingBorrowingId(borrowing.id)}
            >
              Extend
            </button>
          )}

          {borrowing.status === "active" && (
            <button
              onClick={() => handleReturn(borrowing.id)}
            >
              Return
            </button>
          )}

          {extendingBorrowingId === borrowing.id && (
            <div>
              <input
                type="number"
                min="1"
                value={extendDays}
                onChange={(event) => setExtendDays(Number(event.target.value))}
              />

              <button
                onClick={() => handleExtend(borrowing.id)}
              >
                Confirm
              </button>

              <button
                onClick={() => setExtendingBorrowingId(null)}
              >
                Cancel
              </button>
            </div>
          )}

          <p>
            <strong>Borrow date:</strong> {formatDate(borrowing.borrow_date)}
          </p>

          <p>
            <strong>Due date:</strong> {formatDate(borrowing.due_date)}
          </p>

          <button
            onClick={() => handleViewHistory(borrowing.id)}
          >
            View history
          </button>

          {selectedBorrowingId === borrowing.id && (
            <div>
              <h4>History</h4>

              {history.map((item) => (
                <div key={item.id}>
                  <p>
                    <strong>Action:</strong> {item.action}
                  </p>

                  <p>
                    <strong>Admin:</strong>{" "}
                    {item.admin_first_name} {item.admin_last_name}
                  </p>

                  <p>
                    <strong>Date:</strong> {formatDateTime(item.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    })}
  </div>
)}
    </div>
  )
}

export default BorrowingsPage