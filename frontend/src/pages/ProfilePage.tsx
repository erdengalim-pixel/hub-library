import { useEffect, useState } from "react"
import {
  getCurrentUser,
  type CurrentUser
} from "../services/api"

function ProfilePage() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch((error) => {
        console.error(error)
        setError("Failed to load profile")
      })
  }, [])

  if (error) {
    return <p>{error}</p>
  }

  if (!user) {
    return <p>Loading...</p>
  }

  return (
  <main>
    <h1>Profile</h1>

    <section>
      <p>
        <strong>First name:</strong> {user.first_name}
      </p>

      <p>
        <strong>Last name:</strong> {user.last_name}
      </p>

      <p>
        <strong>Username:</strong> {user.username}
      </p>
    </section>
  </main>
)
}

export default ProfilePage