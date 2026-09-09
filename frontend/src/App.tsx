import { useState } from "react"

import LoginPage from "./pages/LoginPage"
import BooksPage from "./pages/BooksPage"
import ProfilePage from "./pages/ProfilePage"
import BorrowingsPage from "./pages/BorrowingsPage"
import Header from "./components/Header"
import { logout } from "./services/api"
import InactiveBooksPage from "./pages/InactiveBooksPage"
import type { Page } from "./types/page"
import PublicCatalogPage from "./pages/PublicCatalogPage"

type PublicView = "catalog" | "login"

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("access_token")
  )

  const [page, setPage] = useState<Page>("catalog")

  const [publicView, setPublicView] =
    useState<PublicView>("catalog")

  if (!token) {
    if (publicView === "login") {
      return (
        <LoginPage
          onLogin={(newToken) => {
            setToken(newToken)
          }}
        />
      )
    }

    return (
      <PublicCatalogPage
        onAdminLogin={() => setPublicView("login")}
      />
    )
  }

  function handleLogout() {
    logout()
    setToken(null)
    setPublicView("catalog")
  }

  return (
    <>
      <Header
        currentPage={page}
        onNavigate={setPage}
        onLogout={handleLogout}
      />

      <main>
        {page === "catalog" && <BooksPage />}

        {page === "profile" && <ProfilePage />}

        {page === "borrowings" && <BorrowingsPage />}

        {page === "inactive-books" && <InactiveBooksPage />}
      </main>
    </>
  )
}

export default App