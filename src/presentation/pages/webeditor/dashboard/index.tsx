import { Button } from '@/presentation/components/form/button'
import { useAuth } from '@/presentation/hooks/useAuth'

export const Dashboard = (): JSX.Element => {
  const { logout } = useAuth()
  return (
    <div>
      <h1>Welcome</h1>
      <Button label="Sair" onClick={logout} />
    </div>
  )
}
