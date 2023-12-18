import { type ILevelService } from '@/application/interface/culinary/level'
import { type Level } from '@/domain/entity/culinary/level'
import { Save, Input, Select } from '@/presentation/components/form'
import { useModal } from '@/presentation/hooks/useModal'
import { useState, type FormEvent } from 'react'

type Props = {
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Level
  _levelService: ILevelService
}

export const Form = ({
  handleClearPayload,
  handleChangePayload,
  data,
  _levelService,
}: Props): JSX.Element => {
  const [, setState] = useState({ reRender: false })
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _levelService
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
      {!!data.id && (
        <Input
          label="Slug"
          name="slug"
          value={data.slug}
          onChange={handleChangePayload}
        />
      )}
      <Input
        name="name"
        label="Name"
        value={data.name}
        onChange={handleChangePayload}
      />
      <Select
        label="Status"
        name="active"
        value={data.active}
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
