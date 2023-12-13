import { useEffect, useState } from 'react'
import { Layout } from './components/layout'
import { useAuth } from './hooks/useAuth'
import { Router } from './router'

export const App = (): JSX.Element => {
  const [state, setState] = useState({ isReady: false })
  const { isAuthenticated, refreshToken, logout } = useAuth()

  useEffect(() => {
    if (isAuthenticated()) {
      refreshToken()
        .then(() => {
          setState(old => ({ ...old, isReady: true }))
        })
        .catch(() => {
          logout()
        })
    } else {
      setState(old => ({ ...old, isReady: true }))
      logout()
    }
  }, [])

  if (!state.isReady) return <>Authentication verifying...</>

  if (!isAuthenticated()) return <Router />
  return (
    <Layout>
      <Router />
    </Layout>
  )
}
