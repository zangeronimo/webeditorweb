import { type HTMLAttributes, type ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export const View = ({ children, ...rest }: Props): JSX.Element => {
  return <div {...rest}>{children}</div>
}
