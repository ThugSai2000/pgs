import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userApi } from '@/api/userApi'
import { ownerApi } from '@/api/ownerApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (credentials, role) => {
    try {
      const api = role === 'resident' ? userApi : ownerApi
      const response = await api.login(credentials)
      
      const userData = {
        email: credentials.email,
        token: response.token,
        role
      }
      
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Navigate based on role
      navigate(role === 'resident' ? '/payment-management' : '/hostel-dashboard')
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.error || 'Invalid credentials'
      }
    }
  }

  const register = async (userData, role) => {
    try {
      const api = role === 'resident' ? userApi : ownerApi
      await api.register(userData)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.error || 'Registration failed'
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/')
  }

  if (loading) {
    return null
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      isAuthenticated: !!user,
      isResident: user?.role === 'resident',
      isOwner: user?.role === 'owner'
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)