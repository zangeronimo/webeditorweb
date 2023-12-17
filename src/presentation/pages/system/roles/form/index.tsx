import { type IRoleService } from '@/application/interface/system/role'
import {
  Input,
  Save,
  Select,
  type SelectData,
} from '@/presentation/components/form'
import { useModal } from '@/presentation/hooks/useModal'
import { type FormEvent } from 'react'

type Data = {
  id?: string
  name: string
  label: string
  order: number
  moduleId: string
}

type Props = {
  modules: SelectData[]
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Data
  _roleService: IRoleService
}

export const Form = ({
  modules,
  handleClearPayload,
  handleChangePayload,
  data,
  _roleService,
}: Props): JSX.Element => {
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _roleService
      .save(data)
      .then(res => {
        handleClearPayload()
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
        name="label"
        label="Label"
        value={data.label}
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
        name="moduleId"
        label="Modules"
        value={data.moduleId}
        onChange={handleChangePayload}
        data={[{ label: 'Select one', value: '' }, ...modules]}
      />
      <Save />
    </form>
  )
}
