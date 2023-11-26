import { type HTMLAttributes, type ReactNode } from 'react'

import Styles from './styles.module.scss'

type Props = HTMLAttributes<HTMLDivElement> & {
  align?: 'left' | 'center' | 'right'
  children: ReactNode
}

export const Group = ({ align = 'left', children }: Props): JSX.Element => {
  return (
    <div className={Styles.containter} data-align={align}>
      {children}
    </div>
  )
}
