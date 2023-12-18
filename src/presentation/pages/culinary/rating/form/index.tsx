import { type IRatingService } from '@/application/interface/culinary/rating'
import { type Rating } from '@/domain/entity/culinary/rating'
import {
  Input,
  Save,
  Select,
  type SelectData,
} from '@/presentation/components/form'
import { useModal } from '@/presentation/hooks/useModal'
import { useState, type FormEvent } from 'react'

type Props = {
  recipes: SelectData[]
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Rating
  _ratingService: IRatingService
}

export const Form = ({
  recipes,
  handleClearPayload,
  handleChangePayload,
  data,
  _ratingService,
}: Props): JSX.Element => {
  const [, setState] = useState({ reRender: false })
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _ratingService
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
        label="Recipes"
        name="recipeId"
        value={data.recipeId}
        onChange={handleChangePayload}
        data={[{ label: 'Select one', value: '' }, ...recipes]}
      />
      <Select
        label="Rate"
        name="rate"
        value={data.rate}
        onChange={handleChangePayload}
        data={[
          { label: '2', value: 2 },
          { label: '4', value: 4 },
          { label: '6', value: 6 },
          { label: '8', value: 8 },
          { label: '10', value: 10 },
        ]}
      />
      <Input
        name="name"
        label="Name"
        value={data.name}
        onChange={handleChangePayload}
      />
      <Input
        name="comment"
        label="Comment"
        value={data.comment}
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
