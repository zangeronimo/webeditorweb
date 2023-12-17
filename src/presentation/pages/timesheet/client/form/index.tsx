import { type IClientService } from '@/application/interface/timesheet/client'
import { type Client } from '@/domain/entity/timesheet/client'
import { Save, Input, Select } from '@/presentation/components/form'
import { useModal } from '@/presentation/hooks/useModal'
import { useState, type FormEvent } from 'react'

type Props = {
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Client
  _clientService: IClientService
}

export const Form = ({
  handleClearPayload,
  handleChangePayload,
  data,
  _clientService,
}: Props): JSX.Element => {
  const [, setState] = useState({ reRender: false })
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _clientService
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
