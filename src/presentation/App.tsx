import { useEffect } from 'react'
import { Layout } from './components/layout'
import { useAuth } from './hooks/useAuth'
import { Router } from './router'
import { useNavigate } from 'react-router-dom'

export const App = (): JSX.Element => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/auth')
  }, [])

  if (!isAuthenticated()) return <Router />
  return (
    <Layout>
      <Router />
    </Layout>
  )
}
