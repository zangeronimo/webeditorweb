import { type ButtonHTMLAttributes } from 'react'

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
    <button onClick={callback} {...rest}>
      {label}
    </button>
  )
}
