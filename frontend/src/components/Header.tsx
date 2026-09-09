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
          <span className="logo-icon">📚</span>
          <span>Hub Library</span>
        </div>

        <nav className="navigation">

          <button
            className={currentPage === "catalog" ? "nav-button active" : "nav-button"}
            onClick={() => onNavigate("catalog")}
          >
            Catalog
          </button>

          <button
            className={currentPage === "borrowings" ? "nav-button active" : "nav-button"}
            onClick={() => onNavigate("borrowings")}
          >
            Borrowings
          </button>

          <button
            className={currentPage === "inactive-books" ? "nav-button active" : "nav-button"}
            onClick={() => onNavigate("inactive-books")}
          >
            Inactive Books
          </button>

          {user && (
            <button
              className={currentPage === "profile" ? "nav-button active" : "nav-button"}
              onClick={() => onNavigate("profile")}
            >
              {user.first_name} {user.last_name}
            </button>
          )}

          <button
            className="logout-button"
            onClick={onLogout}
          >
              Logout
          </button>

        </nav>

      </div>
    </header>
  )
}

export default Header