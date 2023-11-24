import { decodeJwt } from 'jose'
import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthContextData = {
  login: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const STORAGE_NAME = 'WEBEditor:token'

const AuthContext = createContext({} as AuthContextData)

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate()

  const logout = (): void => {
    localStorage.removeItem(STORAGE_NAME)
    navigate('/auth')
  }

  const login = (token: string): void => {
    if (token) {
      const payload: any = decodeJwt(token)
      localStorage.setItem(
        STORAGE_NAME,
        JSON.stringify({ token, user: { id: payload.sub } }),
      )
    }
    document.location.href = '/'
  }

  const isAuthenticated = useMemo(() => {
    const tokenData = localStorage.getItem(STORAGE_NAME)
    if (!tokenData) return false
    const { token, user } = JSON.parse(tokenData)
    return !!token && !!user?.id
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  return useContext(AuthContext)
}
