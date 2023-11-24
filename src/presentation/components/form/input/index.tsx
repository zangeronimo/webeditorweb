import { type InputHTMLAttributes } from 'react'

import Styles from './styles.module.scss'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  error?: string
}

export const Input = ({
  label,
  name,
  error = '',
  ...rest
}: Props): JSX.Element => {
  return (
    <div className={Styles.container}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...rest} />
      <p>{error}</p>
    </div>
  )
}
