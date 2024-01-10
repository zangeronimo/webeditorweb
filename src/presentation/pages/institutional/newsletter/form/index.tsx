import { type INewsletterService } from '@/application/interface/institutional/newsletter'
import { type Newsletter } from '@/domain/entity/institutional/newsletter'
import { Save, Input, Select } from '@/presentation/components/form'
import { useModal } from '@/presentation/hooks/useModal'
import { useState, type FormEvent } from 'react'

type Props = {
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Newsletter
  _newsletterService: INewsletterService
}

export const Form = ({
  handleClearPayload,
  handleChangePayload,
  data,
  _newsletterService,
}: Props): JSX.Element => {
  const [, setState] = useState({ reRender: false })
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _newsletterService
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
      <Input
        name="email"
        label="EMail"
        value={data.email}
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
