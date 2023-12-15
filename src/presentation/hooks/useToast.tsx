import { type ReactNode, createContext, useState, useContext } from 'react'
import { ToastContainer, type ToastMessage } from '../components/toastContainer'
import { v4 as uuid } from 'uuid'

type ContextData = {
  toast: {
    addToast: (message: Omit<ToastMessage, 'id'>) => void
    success: (title: string, message: string) => void
    danger: (title: string, message: string) => void
    warning: (title: string, message: string) => void
    info: (title: string, message: string) => void
  }
  removeToast: (id: string) => void
}

const ToastContext = createContext<ContextData>({} as ContextData)

type Props = {
  children: ReactNode
}

const ToastProvider = ({ children }: Props): JSX.Element => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const addToast = ({
    type,
    title,
    description,
  }: Omit<ToastMessage, 'id'>): void => {
    const id = uuid()

    const toast = {
      id,
      type,
      title,
      description,
    }

    setMessages(old => [...old, toast])
  }

  const success = (title, message): void => {
    addToast({ type: 'success', title, description: message })
  }

  const danger = (title, message): void => {
    addToast({ type: 'danger', title, description: message })
  }

  const warning = (title, message): void => {
    addToast({ type: 'warning', title, description: message })
  }

  const info = (title, message): void => {
    addToast({ type: 'info', title, description: message })
  }

  const removeToast = (id: string): void => {
    setMessages(old => old.filter(message => message.id !== id))
  }

  return (
    <ToastContext.Provider
      value={{
        toast: { addToast, success, danger, warning, info },
        removeToast,
      }}
    >
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

const useToast = (): ContextData => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used withn a ToastProvider')
  }

  return context
}

export { ToastProvider, useToast }
