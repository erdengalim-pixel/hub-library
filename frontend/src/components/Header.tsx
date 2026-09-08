import { useEffect, useState } from "react"
import {
  getCurrentUser,
  type CurrentUser
} from "../services/api"
import type { Page } from "../types/page"

interface HeaderProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  onLogout: () => void
}

function Header({
  currentPage,
  onNavigate,
  onLogout
}: HeaderProps) {
  const [user, setUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          📚 Hub Library
        </div>

        <nav>
          <button
            onClick={() => onNavigate("catalog")}
            disabled={currentPage === "catalog"}
          >
            Catalog
          </button>

          <button
            onClick={() => onNavigate("borrowings")}
            disabled={currentPage === "borrowings"}
          >
            Borrowings
          </button>

          <button
            onClick={() => onNavigate("inactive-books")}
            disabled={currentPage === "inactive-books"}
          >
            Inactive Books
          </button>

          {user && (
            <button
              onClick={() => onNavigate("profile")}
              disabled={currentPage === "profile"}
            >
              {user.first_name} {user.last_name}
            </button>
          )}

          <button onClick={onLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header