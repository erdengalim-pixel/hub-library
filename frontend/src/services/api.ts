import type { Book } from "../types/book"

const API_URL = "http://127.0.0.1:8000"

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(`${API_URL}/books`)

  if (!response.ok) {
    throw new Error("Failed to fetch books")
  }

  return response.json()
}

export async function searchBooks(q: string): Promise<Book[]> {
  const response = await fetch(
    `${API_URL}/books/search?q=${encodeURIComponent(q)}`
  )

  if (!response.ok) {
    throw new Error("Failed to search books")
  }

  return response.json()
}

export async function login(
  username: string,
  password: string
): Promise<string> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })

  if (!response.ok) {
    throw new Error("Invalid username or password")
  }

  const data = await response.json()

  return data.access_token
}

export interface CurrentUser {
  id: number
  username: string
  first_name: string
  last_name: string
}

export async function getCurrentUser(): Promise<CurrentUser> {
  const token = localStorage.getItem("access_token")

  const response = await fetch(`${API_URL}/auth/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to get current user")
  }

  return response.json()
}

export function logout(): void {
  localStorage.removeItem("access_token")
}

export interface BorrowingHistoryItem {
  id: number
  borrowing_id: number
  action: string
  created_at: string
  admin_id: number
  admin_first_name: string
  admin_last_name: string
}

export async function getBorrowingHistory(
  borrowingId: number
): Promise<BorrowingHistoryItem[]> {
  const token = localStorage.getItem("access_token")

  const response = await fetch(
    `${API_URL}/borrowings/${borrowingId}/history`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch borrowing history")
  }

  return response.json()
}

export interface Borrowing {
  id: number
  book_id: number
  book_title: string
  tenant_name: string
  company: string
  phone_number: string
  borrow_date: string
  due_date: string
  return_date: string | null
  status: string
}

export async function getBorrowings(): Promise<Borrowing[]> {
  const token = localStorage.getItem("access_token")

  const response = await fetch(`${API_URL}/borrowings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch borrowings")
  }

  return response.json()
}

export async function createBorrowing(
  bookId: number,
  tenantName: string,
  company: string,
  phoneNumber: string
) {
  const token = localStorage.getItem("access_token")

  const response = await fetch(`${API_URL}/borrowings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      book_id: bookId,
      tenant_name: tenantName,
      company: company,
      phone_number: phoneNumber,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("Backend error:", error)
    throw new Error(error)
  }

  return response.json()
}

export async function extendBorrowing(
  borrowingId: number,
  days: number
) {
  const token = localStorage.getItem("access_token")

  const response = await fetch(
    `${API_URL}/borrowings/${borrowingId}/extend`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        days: days,
      }),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    console.error("Backend error:", error)
    throw new Error(error)
  }

  return response.json()
}

export async function returnBorrowing(borrowingId: number) {
  const token = localStorage.getItem("access_token")

  const response = await fetch(
    `${API_URL}/borrowings/${borrowingId}/return`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    const error = await response.text()
    console.error("Backend error:", error)
    throw new Error(error)
  }

  return response.json()
}

export async function createBook(
  title: string,
  author: string,
  inventoryNumber: string
) {
  const token = localStorage.getItem("access_token")

  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      author,
      inventory_number: inventoryNumber,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("Backend error:", error)
    throw new Error(error)
  }

  return response.json()
}

export async function deleteBook(bookId: number) {
  const token = localStorage.getItem("access_token")

  const response = await fetch(
    `${API_URL}/books/${bookId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    const error = await response.text()
    console.error("Backend error:", error)
    throw new Error(error)
  }

  return response.json()
}

export async function restoreBook(bookId: number) {
  const token = localStorage.getItem("access_token")

  const response = await fetch(
    `${API_URL}/books/${bookId}/restore`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    const error = await response.text()
    console.error("Backend error:", error)
    throw new Error(error)
  }

  return response.json()
}

export interface InactiveBook {
  id: number
  inventory_number: string
  title: string
  author: string
}

export async function getInactiveBooks(): Promise<InactiveBook[]> {
  const token = localStorage.getItem("access_token")

  const response = await fetch(
    `${API_URL}/books/inactive`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch inactive books")
  }

  return response.json()
}

export async function getActiveBorrowings(): Promise<Borrowing[]> {
  const token = localStorage.getItem("access_token")

  const response = await fetch(
    `${API_URL}/borrowings/active`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch active borrowings")
  }

  return response.json()
}


export async function getOverdueBorrowings(): Promise<Borrowing[]> {
  const token = localStorage.getItem("access_token")

  const response = await fetch(
    `${API_URL}/borrowings/overdue`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch overdue borrowings")
  }

  return response.json()
}

export async function updateBook(
  bookId: number,
  title: string,
  author: string,
  inventoryNumber: string
) {
  const token = localStorage.getItem("access_token")

  const response = await fetch(
    `${API_URL}/books/${bookId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        author,
        inventory_number: inventoryNumber,
      }),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    console.error("Backend error:", error)
    throw new Error(error)
  }

  return response.json()
}