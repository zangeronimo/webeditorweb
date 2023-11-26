import {
  createContext,
  useContext,
  type ReactNode,
  type MutableRefObject,
  useRef,
} from 'react'

type ModalContextData = {
  showModal: (ref?: MutableRefObject<HTMLDivElement>) => void
  closeModal: (ref?: MutableRefObject<HTMLDivElement>) => void
  basicRef: MutableRefObject<HTMLDivElement>
}

const ModalContext = createContext({} as ModalContextData)

type Props = {
  children: ReactNode
}

export const ModalProvider = ({ children }: Props): JSX.Element => {
  const basicRef = useRef()
  const showModal = (
    ref: MutableRefObject<HTMLDivElement> = basicRef,
  ): void => {
    if (ref.current) {
      document.body.setAttribute('modal', 'true')
      ref.current.setAttribute('show', 'true')
    }
  }
  const closeModal = (
    ref: MutableRefObject<HTMLDivElement> = basicRef,
  ): void => {
    document.body.removeAttribute('modal')
    if (ref.current) ref.current.removeAttribute('show')
  }
  return (
    <ModalContext.Provider value={{ showModal, closeModal, basicRef }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextData => {
  return useContext(ModalContext)
}
