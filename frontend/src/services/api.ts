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