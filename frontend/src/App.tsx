import { useState } from "react"

import LoginPage from "./pages/LoginPage"
import BooksPage from "./pages/BooksPage"
import ProfilePage from "./pages/ProfilePage"
import Header from "./components/Header"
import { logout } from "./services/api"

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("access_token")
  )

  const [page, setPage] = useState<"catalog" | "profile">("catalog")

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
      </main>
    </>
  )
}

export default App