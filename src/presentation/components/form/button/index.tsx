import { type ButtonHTMLAttributes } from 'react'

import Styles from './styles.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  callback?: () => void
}

export const Button = ({
  label,
  callback = () => null,
  ...rest
}: Props): JSX.Element => {
  return (
    <button onClick={callback} {...rest} className={Styles.container}>
      {label}
    </button>
  )
}
