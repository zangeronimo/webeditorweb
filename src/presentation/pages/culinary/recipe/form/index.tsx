import { type IRecipeService } from '@/application/interface/culinary/recipe'
import { type Recipe } from '@/domain/entity/culinary/recipe'
import { Editor } from '@/presentation/components/editor'
import {
  Input,
  Save,
  Select,
  type SelectData,
} from '@/presentation/components/form'
import { useModal } from '@/presentation/hooks/useModal'
import { useState, type FormEvent } from 'react'

type Props = {
  categories: SelectData[]
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Recipe
  _recipeService: IRecipeService
}

export const Form = ({
  categories,
  handleClearPayload,
  handleChangePayload,
  data,
  _recipeService,
}: Props): JSX.Element => {
  const [, setState] = useState({ reRender: false })
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _recipeService
      .save(data)
      .then(() => {
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
        label="Categories"
        name="categoryId"
        value={data.categoryId}
        onChange={handleChangePayload}
        data={[{ label: 'Select one', value: '' }, ...categories]}
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
      <Editor
        data={data.ingredients}
        onChange={data => {
          handleChangePayload({
            target: { name: 'ingredients', value: data },
          } as any)
        }}
      />
      <Editor
        data={data.preparation}
        onChange={data => {
          handleChangePayload({
            target: { name: 'preparation', value: data },
          } as any)
        }}
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
