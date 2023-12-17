import { type MutableRefObject, type ReactNode } from 'react'
import { Modal } from '../modal'
import { Group } from '../group'
import { Button } from '../form/button'

type Props = {
  title: string
  lblCancel?: string
  lblConfirm?: string
  reference: MutableRefObject<HTMLDivElement>
  children: ReactNode
  onCancel: () => void
  onConfirm: () => void
}

export const Confirm = ({
  title,
  lblCancel = 'Cancel',
  lblConfirm = 'Confirm',
  reference,
  onCancel,
  onConfirm,
  children,
}: Props): JSX.Element => {
  return (
    <Modal reference={reference} title={title}>
      {children}

      <Group>
        <Button label={lblCancel} onClick={onCancel} />
        <Button label={lblConfirm} onClick={onConfirm} />
      </Group>
    </Modal>
  )
}
