import { type IMakeLogin } from '@/application/interface/system/makeLogin'
import { useAuth } from '@/presentation/hooks/useAuth'
import { useToast } from '@/presentation/hooks/useToast'
import { type ChangeEvent, useState } from 'react'

interface Output {
  makeLogin: (_makeLogin: IMakeLogin) => Promise<void>
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  state: {
    username: string
    password: string
  }
}

export const useLogin = (): Output => {
  const [state, setState] = useState({ username: '', password: '' })
  const { login } = useAuth()
  const { toast } = useToast()

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e?.target)
      setState(old => ({ ...old, [e.target.name]: e.target.value }))
  }

  const makeLogin = async (_makeLogin: IMakeLogin): Promise<void> => {
    _makeLogin
      .execute(state.username, state.password)
      .then(res => {
        login(res)
      })
      .catch((e: Error) => {
        toast.danger('Invalid Login', e.message)
      })
  }
  return { makeLogin, onChange, state }
}
