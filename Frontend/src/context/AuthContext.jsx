import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../services/firebase'
import { registerUser, getCurrentUser } from '../services/api'



const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get token and save it for API calls
          const token = await firebaseUser.getIdToken()
          localStorage.setItem('token', token)

          // Get full user data from our backend
          const res = await getCurrentUser()
          setUser(res.data.user)
        } catch (error) {
          console.error('Error fetching user:', error)
          setUser(null)
        }
      } else {
        localStorage.removeItem('token')
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Signup function
  async function signup(fullName, email, password, role, phone) {
    const firebaseRes = await createUserWithEmailAndPassword(auth, email, password)
    const token = await firebaseRes.user.getIdToken()
    localStorage.setItem('token', token)

    // Register in our backend
    await registerUser({ fullName, email, role, phone })
    const res = await getCurrentUser()
    setUser(res.data.user)
  }

  // Login function
  async function login(email, password) {
    const firebaseRes = await signInWithEmailAndPassword(auth, email, password)
    const token = await firebaseRes.user.getIdToken()
    localStorage.setItem('token', token)

    const res = await getCurrentUser()
    setUser(res.data.user)
  }

  // Logout function
  async function logout() {
    await signOut(auth)
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth anywhere
export function useAuth() {
  return useContext(AuthContext)
}