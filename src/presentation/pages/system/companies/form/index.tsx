import { type ICompanyService } from '@/application/interface/system/company'
import { type Company } from '@/domain/entity/system/company'
import { type Module } from '@/domain/entity/system/module'
import { Button } from '@/presentation/components/form/button'
import { Input } from '@/presentation/components/form/input'
import { Group } from '@/presentation/components/group'
import { useModal } from '@/presentation/hooks/useModal'
import { useState, type FormEvent } from 'react'

type Props = {
  modules: Module[]
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Company
  _companyService: ICompanyService
}

export const Form = ({
  modules,
  handleClearPayload,
  handleChangePayload,
  data,
  _companyService,
}: Props): JSX.Element => {
  const [, setState] = useState({ reRender: false })
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _companyService
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

  const handleCheckboxChange = (moduleId: string): void => {
    data.hasModule(moduleId)
      ? data.removeModule(moduleId)
      : data.addModule(moduleId)
    setState(old => ({ reRender: !old.reRender }))
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
      <h2>Modules</h2>
      <Group>
        {modules.map(module => (
          <div key={module.id}>
            <input
              type="checkbox"
              name="modules"
              value={module.id}
              checked={data.hasModule(module.id)}
              onChange={e => {
                handleCheckboxChange(e.currentTarget.value)
              }}
            />
            {module.name}
          </div>
        ))}
      </Group>
      <Button type="submit" label="Save" />
    </form>
  )
}
