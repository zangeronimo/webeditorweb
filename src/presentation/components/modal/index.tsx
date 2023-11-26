import { type HTMLAttributes, type MutableRefObject } from 'react'

import Styles from './styles.module.scss'
import { useModal } from '@/presentation/hooks/useModal'

export type Props = HTMLAttributes<HTMLDivElement> & {
  reference?: MutableRefObject<HTMLDivElement>
  overlayClose?: boolean
  title: string
  onClose?: () => void
}

export const Modal = ({
  reference,
  overlayClose = true,
  title = '',
  onClose = () => null,
  children,
}: Props): JSX.Element => {
  const { closeModal, basicRef } = useModal()
  const handleClose = (): void => {
    onClose()
    closeModal(reference ?? basicRef)
  }
  return (
    <div ref={reference ?? basicRef} className={Styles.container}>
      <div
        className={Styles.overlay}
        onClick={() => {
          overlayClose && handleClose()
        }}
      ></div>
      <div className={Styles.modal} tabIndex={-1}>
        <div className={Styles.header}>
          <h5 className={Styles.title}>{title}</h5>
          <button type="button" aria-label="Close" onClick={handleClose}>
            x
          </button>
        </div>
        <div className={Styles.content}>{children}</div>
      </div>
    </div>
  )
}
