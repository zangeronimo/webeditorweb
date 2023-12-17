import { type IMakeLogin } from '@/application/interface/system/makeLogin'
import { Button, Input } from '@/presentation/components/form'
import { View } from '@/presentation/components/view'
import { useAuth } from '@/presentation/hooks/useAuth'
import { useEffect, type FormEvent } from 'react'
import { useLogin } from './login'

import Styles from './styles.module.scss'
import { Logo } from '@/presentation/components/layout/logo'
import { ViewBox } from '@/presentation/components/viewBox'

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
      <Logo size="large" />
      <form autoComplete="off" onSubmit={handleLogin}>
        <View className={Styles.form}>
          <ViewBox title="">
            <Input
              label="E-mail:"
              name="username"
              value={state.username}
              onChange={e => {
                onChange(e)
              }}
            />
            <Input
              label="Senha:"
              type="password"
              name="password"
              value={state.password}
              autoComplete="new-password"
              onChange={e => {
                onChange(e)
              }}
            />
            <Button type="submit" label="Entrar" />
          </ViewBox>
        </View>
      </form>
    </View>
  )
}
