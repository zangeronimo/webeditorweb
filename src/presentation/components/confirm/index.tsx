import { type MutableRefObject, type ReactNode } from 'react'
import { Button, Cancel, type ButtonProps } from '../form'
import { Group } from '../group'
import { Modal } from '../modal'

type Props = {
  title: string
  lblCancel?: string
  lblConfirm?: string
  confirmPattern?: ButtonProps['pattern']
  reference: MutableRefObject<HTMLDivElement>
  children: ReactNode
  onCancel: () => void
  onConfirm: () => void
}

export const Confirm = ({
  title,
  lblCancel = 'Cancel',
  lblConfirm = 'Confirm',
  confirmPattern = 'success',
  reference,
  onCancel,
  onConfirm,
  children,
}: Props): JSX.Element => {
  return (
    <Modal reference={reference} title={title}>
      {children}

      <Group>
        <Cancel label={lblCancel} onClick={onCancel} />
        <Button
          label={lblConfirm}
          pattern={confirmPattern}
          onClick={onConfirm}
        />
      </Group>
    </Modal>
  )
}
