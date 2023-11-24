import { type IMakeLogin } from '@/application/interface/makeLogin'
import { Button } from '@/presentation/components/form/button'
import { Input } from '@/presentation/components/form/input'
import { type FormEvent } from 'react'
import { useLogin } from './login'

import Styles from './styles.module.scss'
import { View } from '@/presentation/components/view'

interface Props {
  _makeLogin: IMakeLogin
}

export const Login = ({ _makeLogin }: Props): JSX.Element => {
  const { makeLogin, onChange, state } = useLogin()

  const handleLogin = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    await makeLogin(_makeLogin)
  }

  return (
    <View className={Styles.container}>
      <form onSubmit={handleLogin}>
        <View className={Styles.form}>
          <Input
            name="username"
            defaultValue={state.username}
            onChange={e => {
              onChange(e)
            }}
          />
          <Input
            type="password"
            name="password"
            defaultValue={state.password}
            onChange={e => {
              onChange(e)
            }}
          />
          <Button type="submit" label="Entrar" />
        </View>
      </form>
    </View>
  )
}
