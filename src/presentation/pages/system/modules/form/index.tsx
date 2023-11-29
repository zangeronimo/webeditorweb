import { type IModuleService } from '@/application/interface/system/module'
import { Button } from '@/presentation/components/form/button'
import { Input } from '@/presentation/components/form/input'
import { useModal } from '@/presentation/hooks/useModal'
import { type FormEvent } from 'react'

type Data = {
  id?: string
  name: string
}

type Props = {
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Data
  _moduleService: IModuleService
}

export const Form = ({
  handleClearPayload,
  handleChangePayload,
  data,
  _moduleService,
}: Props): JSX.Element => {
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _moduleService
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
      <Button type="submit" label="Save" />
    </form>
  )
}
