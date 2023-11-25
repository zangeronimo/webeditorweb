import { type ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'

type Props = {
  children: ReactNode
}

export const AuthenticatedUrl = ({ children }: Props): JSX.Element => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated()) return <>{children}</>
  document.location.href = '/auth'
}
