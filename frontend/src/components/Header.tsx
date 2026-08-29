import { useEffect, useState } from "react"
import {
  getCurrentUser,
  type CurrentUser
} from "../services/api"

interface HeaderProps {
  currentPage: "catalog" | "profile"
  onNavigate: (page: "catalog" | "profile") => void
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