import { type HTMLAttributes, type ReactNode } from 'react'

import Styles from './styles.module.scss'

type Props = HTMLAttributes<HTMLDivElement> & {
  title: string
  children: ReactNode
}

export const ViewBox = ({ title, children, ...rest }: Props): JSX.Element => {
  return (
    <div {...rest} className={Styles.container}>
      <div className={Styles.title}>{title}</div>
      {children}
    </div>
  )
}
