import { type ReactNode } from 'react'
import { AuthProvider } from './useAuth'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './useModal'
import { ToastProvider } from './useToast'

type Props = {
  children: ReactNode
}

export const Hooks = ({ children }: Props): JSX.Element => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
