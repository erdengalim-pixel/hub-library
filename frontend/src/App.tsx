import { useState } from "react"

import LoginPage from "./pages/LoginPage"
import BooksPage from "./pages/BooksPage"
import ProfilePage from "./pages/ProfilePage"
import BorrowingsPage from "./pages/BorrowingsPage"
import Header from "./components/Header"
import { logout } from "./services/api"
import InactiveBooksPage from "./pages/InactiveBooksPage"
import type { Page } from "./types/page"

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("access_token")
  )

  const [page, setPage] = useState<Page>("catalog")
  
  if (!token) {
    return <LoginPage onLogin={setToken} />
  }

  function handleLogout() {
    logout()
    setToken(null)
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