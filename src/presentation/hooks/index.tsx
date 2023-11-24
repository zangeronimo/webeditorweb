import { type ReactNode } from 'react'
import { AuthProvider } from './useAuth'
import { BrowserRouter } from 'react-router-dom'

type Props = {
  children: ReactNode
}

export const Hooks = ({ children }: Props): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  )
}
