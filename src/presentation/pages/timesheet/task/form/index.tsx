import { type ITaskService } from '@/application/interface/timesheet/task'
import { Editor } from '@/presentation/components/editor'
import { Button } from '@/presentation/components/form/button'
import { Input } from '@/presentation/components/form/input'
import { Select, type SelectData } from '@/presentation/components/form/select'
import { useModal } from '@/presentation/hooks/useModal'
import { useState, type FormEvent } from 'react'

type Data = {
  id?: string
  name: string
  description: string
  status: number
  pbiId: string
}

type Props = {
  pbis: SelectData[]
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Data
  _taskService: ITaskService
}

export const Form = ({
  pbis,
  handleClearPayload,
  handleChangePayload,
  data,
  _taskService,
}: Props): JSX.Element => {
  const [, setState] = useState({ reRender: false })
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _taskService
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
        name="pbiId"
        label="Pbis"
        value={data.pbiId}
        onChange={handleChangePayload}
        data={[{ label: 'Select one', value: '' }, ...pbis]}
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
      <Button type="submit" label="Save" />
    </form>
  )
}
