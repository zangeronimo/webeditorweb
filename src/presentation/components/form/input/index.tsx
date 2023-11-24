import { type InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = ({ ...rest }: Props): JSX.Element => {
  return <input {...rest} />
}
