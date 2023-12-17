import { type ButtonHTMLAttributes } from 'react'

import Styles from './styles.module.scss'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  pattern?: 'success' | 'danger' | 'warning' | 'info' | 'normal' | 'link'
  callback?: () => void
}

export const Button = ({
  label,
  pattern = 'normal',
  callback = () => null,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <button
      onClick={callback}
      {...rest}
      className={Styles.container}
      data-pattern={pattern}
    >
      {label}
    </button>
  )
}
