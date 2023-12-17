import { type IProjectService } from '@/application/interface/timesheet/project'
import { Editor } from '@/presentation/components/editor'
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
  description: string
  status: number
  clientId: string
}

type Props = {
  clients: SelectData[]
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Data
  _projectService: IProjectService
}

export const Form = ({
  clients,
  handleClearPayload,
  handleChangePayload,
  data,
  _projectService,
}: Props): JSX.Element => {
  const [, setState] = useState({ reRender: false })
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _projectService
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
      <Editor
        data={data.description}
        onChange={data => {
          handleChangePayload({
            target: { name: 'description', value: data },
          } as any)
        }}
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
