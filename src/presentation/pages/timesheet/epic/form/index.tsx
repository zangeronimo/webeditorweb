import { type IEpicService } from '@/application/interface/timesheet/epic'
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
  projectId: string
}

type Props = {
  projects: SelectData[]
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Data
  _epicService: IEpicService
}

export const Form = ({
  projects,
  handleClearPayload,
  handleChangePayload,
  data,
  _epicService,
}: Props): JSX.Element => {
  const [, setState] = useState({ reRender: false })
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _epicService
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
        name="projectId"
        label="Projects"
        value={data.projectId}
        onChange={handleChangePayload}
        data={[{ label: 'Select one', value: '' }, ...projects]}
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
