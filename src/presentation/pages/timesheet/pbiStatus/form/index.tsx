import { type IPbiStatusService } from '@/application/interface/timesheet/pbiStatus'
import {
  Input,
  Save,
  Select,
  type SelectData,
} from '@/presentation/components/form'
import { useModal } from '@/presentation/hooks/useModal'
import { useState, type FormEvent } from 'react'

type Data = {
  id?: string
  name: string
  order: string
  status: number
  clientId: string
}

type Props = {
  clients: SelectData[]
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Data
  _pbiStatusService: IPbiStatusService
}

export const Form = ({
  clients,
  handleClearPayload,
  handleChangePayload,
  data,
  _pbiStatusService,
}: Props): JSX.Element => {
  const [, setState] = useState({ reRender: false })
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _pbiStatusService
      .save(data)
      .then(res => {
        handleClearPayload()
        setState(old => ({ reRender: !old.reRender }))
        closeModal()
      })
      .catch(e => {
        console.error(e.message)
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
        disabled={!!data.id}
        name="clientId"
        label="Clients"
        value={data.clientId}
        onChange={handleChangePayload}
        data={[{ label: 'Select one', value: '' }, ...clients]}
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
