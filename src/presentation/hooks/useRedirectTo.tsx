import { type ReactNode, createContext, useState, useContext } from 'react'
import {
  useLocation,
  type NavigateOptions,
  useNavigate,
} from 'react-router-dom'

type NavigateToProps = {
  url: string
  when?: boolean
  options?: NavigateOptions
}

type ContextData = {
  redirect: () => void
  navigateTo: (data: NavigateToProps) => void
  when: boolean
}

const RedirectToContext = createContext<ContextData>({} as ContextData)

type Props = {
  children: ReactNode
}

const RedirectToProvider = ({ children }: Props): JSX.Element => {
  const [redirectPath, setRedirectPath] = useState('/')
  const [when, setWhen] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()

  const navigateTo = ({ url, when = true, options }: NavigateToProps): void => {
    setRedirectPath(location.pathname)
    setWhen(when)
    const timeout = setTimeout(() => {
      setWhen(true)
      navigate(url, options)
      clearTimeout(timeout)
    }, 300)
  }

  const redirect = (): void => {
    navigate(redirectPath)
  }

  return (
    <RedirectToContext.Provider value={{ navigateTo, redirect, when }}>
      {children}
    </RedirectToContext.Provider>
  )
}

const useRedirectTo = (): ContextData => {
  const context = useContext(RedirectToContext)

  if (!context) {
    throw new Error('useREdirectTo must be used withn an RedirectToProvider')
  }

  return context
}

export { RedirectToProvider, useRedirectTo }
