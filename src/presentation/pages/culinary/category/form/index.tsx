import { type ICategoryService } from '@/application/interface/culinary/category'
import { type Category } from '@/domain/entity/culinary/category'
import {
  Input,
  Save,
  Select,
  type SelectData,
} from '@/presentation/components/form'
import { useModal } from '@/presentation/hooks/useModal'
import { useState, type FormEvent } from 'react'

type Props = {
  levels: SelectData[]
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Category
  _categoryService: ICategoryService
}

export const Form = ({
  levels,
  handleClearPayload,
  handleChangePayload,
  data,
  _categoryService,
}: Props): JSX.Element => {
  const [, setState] = useState({ reRender: false })
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _categoryService
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
      <Select
        label="Levels"
        name="levelId"
        value={data.levelId}
        onChange={handleChangePayload}
        data={[{ label: 'Select one', value: '' }, ...levels]}
      />
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
