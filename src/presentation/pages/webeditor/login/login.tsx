import { type IMakeLogin } from '@/application/interface/makeLogin'
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

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e?.target?.name && e?.target?.value)
      setState(old => ({ ...old, [e.target.name]: e.target.value }))
  }

  const makeLogin = async (_makeLogin: IMakeLogin): Promise<void> => {
    _makeLogin
      .execute(state.username, state.password)
      .then(res => {
        console.log(res)
      })
      .catch((e: Error) => {
        console.error(e.message)
      })
  }
  return { makeLogin, onChange, state }
}
