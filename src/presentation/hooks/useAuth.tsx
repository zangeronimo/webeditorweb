import { RefreshToken } from '@/application/service/system/refreshToken'
import { api } from '@/infra/provider/axiosProvider'
import { type AxiosError } from 'axios'
import { decodeJwt } from 'jose'
import { createContext, useContext, type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthContextData = {
  login: (token: string) => void
  logout: () => void
  isAuthenticated: () => boolean
  refreshToken: () => Promise<any>
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

  const refresh = async (): Promise<any> => {
    const refreshToken = new RefreshToken(api)
    return await refreshToken
      .execute()
      .then(async token => {
        if (token) {
          const payload: any = decodeJwt(token)
          localStorage.setItem(
            STORAGE_NAME,
            JSON.stringify({ token, user: { id: payload.sub } }),
          )
          api.defaults.headers.Authorization = `Bearer ${token}`
          return token
        }
      })
      .catch(async e => {
        logout()
      })
  }

  const login = (token: string): void => {
    if (token) {
      const payload: any = decodeJwt(token)
      localStorage.setItem(
        STORAGE_NAME,
        JSON.stringify({ token, user: { id: payload.sub } }),
      )
    }
    navigate('/')
  }

  const isAuthenticated = (): boolean => {
    const tokenData = localStorage.getItem(STORAGE_NAME)
    if (!tokenData) return false
    const { token, user } = JSON.parse(tokenData)
    return !!token && !!user?.id
  }

  useEffect(() => {
    api.interceptors.response.use(
      async res => {
        return res?.data
      },
      async (error: AxiosError) => {
        const errorCode = error?.response?.request?.status
        // eslint-disable-next-line sonarjs/no-small-switch
        switch (errorCode) {
          case 401:
            // eslint-disable-next-line no-case-declarations
            const token = await refresh()
            if (!token) {
              document.location.href = '/auth'
            }
            error.config.headers.Authorization = `Bearer ${token}`

            return await api(error.config)
          default:
            return await Promise.reject(error)
        }
      },
    )
  }, [])

  return (
    <AuthContext.Provider
      value={{ login, logout, isAuthenticated, refreshToken: refresh }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  return useContext(AuthContext)
}
