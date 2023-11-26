import { type MutableRefObject, type ReactNode } from 'react'
import { Modal } from '../modal'
import { Group } from '../group'
import { Button } from '../form/button'

type Props = {
  title: string
  reference: MutableRefObject<HTMLDivElement>
  children: ReactNode
  onCancel: () => void
  onConfirm: () => void
}

export const Confirm = ({
  title,
  reference,
  onCancel,
  onConfirm,
  children,
}: Props): JSX.Element => {
  return (
    <Modal reference={reference} title={title}>
      {children}

      <Group>
        <Button label="Cancel" onClick={onCancel} />
        <Button label="Delete" onClick={onConfirm} />
      </Group>
    </Modal>
  )
}
