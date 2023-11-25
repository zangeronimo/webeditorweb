import { Layout } from './components/layout'
import { useAuth } from './hooks/useAuth'
import { Router } from './router'

export const App = (): JSX.Element => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated()) return <Router />
  return (
    <Layout>
      <Router />
    </Layout>
  )
}
