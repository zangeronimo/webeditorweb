import { useEffect, useState } from 'react'
import { Layout } from './components/layout'
import { useAuth } from './hooks/useAuth'
import { Router } from './router'
import { useNavigate } from 'react-router-dom'

export const App = (): JSX.Element => {
  const [state, setState] = useState({ isReady: false })
  const { isAuthenticated, refreshToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    refreshToken()
      .then(() => {
        setState(old => ({ ...old, isReady: true }))
      })
      .catch(() => {
        navigate('/auth')
      })
  }, [])

  if (!state.isReady) return <>Authentication verifying...</>

  if (!isAuthenticated()) return <Router />
  return (
    <Layout>
      <Router />
    </Layout>
  )
}
