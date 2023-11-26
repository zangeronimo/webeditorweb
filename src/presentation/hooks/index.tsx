import { type ReactNode } from 'react'
import { AuthProvider } from './useAuth'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './useModal'

type Props = {
  children: ReactNode
}

export const Hooks = ({ children }: Props): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
