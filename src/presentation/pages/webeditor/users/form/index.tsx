import { type IUserService } from '@/application/interface/webeditor/user'
import { type User } from '@/domain/entity/webeditor/user'
import { Button } from '@/presentation/components/form/button'
import { Input } from '@/presentation/components/form/input'
import { Group } from '@/presentation/components/group'
import { useModal } from '@/presentation/hooks/useModal'
import { useState, type FormEvent } from 'react'

type Props = {
  modules: any[]
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: User
  _userService: IUserService
}

export const Form = ({
  modules,
  handleClearPayload,
  handleChangePayload,
  data,
  _userService,
}: Props): JSX.Element => {
  const [, setState] = useState({ reRender: false })
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _userService
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

  const handleCheckboxChange = (roleId: string): void => {
    data.hasRole(roleId) ? data.removeRole(roleId) : data.addRole(roleId)
    setState(old => ({ reRender: !old.reRender }))
  }

  return (
    <form onSubmit={handleNewRegister} autoComplete="off">
      <Input label="id" name="id" defaultValue={data.id} hidden />
      <Input
        name="name"
        label="Name"
        value={data.name}
        onChange={handleChangePayload}
      />
      <Input
        type="email"
        name="email"
        label="Email"
        value={data.email}
        onChange={handleChangePayload}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        value={data.password}
        autoComplete="new-password"
        onChange={handleChangePayload}
      />
      <h2>Roles</h2>
      <Group direction="column">
        {modules?.map(module => (
          <div key={module.id}>
            {module.name}
            <Group>
              {module.roles?.map(role => (
                <div key={role.id}>
                  <input
                    type="checkbox"
                    name="modules"
                    value={role.id}
                    checked={data.hasRole(role.id)}
                    onChange={e => {
                      handleCheckboxChange(e.currentTarget.value)
                    }}
                  />
                  {role.label}
                </div>
              ))}
            </Group>
          </div>
        ))}
      </Group>
      <Button type="submit" label="Save" />
    </form>
  )
}
