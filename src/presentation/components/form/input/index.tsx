import { type InputHTMLAttributes } from 'react'

import Styles from './styles.module.scss'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  error?: string
  hidden?: boolean
}

export const Input = ({
  label,
  name,
  error = '',
  hidden = false,
  ...rest
}: Props): JSX.Element => {
  if (hidden) return <input id={name} name={name} hidden {...rest} />
  return (
    <div className={Styles.container}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...rest} />
      {!!error && <p>{error}</p>}
    </div>
  )
}
