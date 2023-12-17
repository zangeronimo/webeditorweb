import { type IPbiStatusService } from '@/application/interface/timesheet/pbiStatus'
import { Input, Save, Select } from '@/presentation/components/form'
import { useModal } from '@/presentation/hooks/useModal'
import { useToast } from '@/presentation/hooks/useToast'
import { useState, type FormEvent } from 'react'

type Data = {
  id?: string
  name: string
  order: string
  status: number
}

type Props = {
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Data
  _pbiStatusService: IPbiStatusService
}

export const Form = ({
  handleClearPayload,
  handleChangePayload,
  data,
  _pbiStatusService,
}: Props): JSX.Element => {
  const [, setState] = useState({ reRender: false })
  const { closeModal } = useModal()
  const { toast } = useToast()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _pbiStatusService
      .save(data)
      .then(() => {
        handleClearPayload()
        setState(old => ({ reRender: !old.reRender }))
        closeModal()
      })
      .catch(e => {
        toast.danger('Fail on save', e.message)
      })
  }

  return (
    <form onSubmit={handleNewRegister}>
      <Input label="id" name="id" defaultValue={data.id} hidden />
      <Input
        name="name"
        label="Name"
        value={data.name}
        onChange={handleChangePayload}
      />
      <Input
        name="order"
        label="Order"
        value={data.order}
        onChange={handleChangePayload}
      />
      <Select
        label="Status"
        name="status"
        value={data.status}
        onChange={handleChangePayload}
        data={[
          { label: 'Active', value: 1 },
          { label: 'Inactive', value: 0 },
        ]}
      />
      <Save />
    </form>
  )
}
