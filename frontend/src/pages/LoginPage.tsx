import { useState } from "react"
import { login } from "../services/api"

interface LoginPageProps {
  onLogin: (token: string) => void
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()

    setError("")

    try {
      const token = await login(username, password)

      localStorage.setItem("access_token", token)

      onLogin(token)
    } catch {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>HUB Library</h1>
        <h2>Administrator Login</h2>

        <form onSubmit={handleLogin}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
          </div>

          {error && <p>{error}</p>}

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage