import { type IMakeLogin } from '@/application/interface/makeLogin'
import { Button } from '@/presentation/components/form/button'
import { Input } from '@/presentation/components/form/input'
import { View } from '@/presentation/components/view'
import { useAuth } from '@/presentation/hooks/useAuth'
import { useEffect, type FormEvent } from 'react'
import { useLogin } from './login'

import Styles from './styles.module.scss'

interface Props {
  _makeLogin: IMakeLogin
}

export const Login = ({ _makeLogin }: Props): JSX.Element => {
  const { makeLogin, onChange, state } = useLogin()
  const { logout } = useAuth()

  const handleLogin = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    await makeLogin(_makeLogin)
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <View className={Styles.container}>
      <form onSubmit={handleLogin}>
        <View className={Styles.form}>
          <p>WEBEditor - Login</p>
          <Input
            label="E-mail:"
            name="username"
            defaultValue={state.username}
            onChange={e => {
              onChange(e)
            }}
          />
          <Input
            label="Senha:"
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
