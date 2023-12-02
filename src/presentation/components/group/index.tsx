import { type HTMLAttributes, type ReactNode } from 'react'

import Styles from './styles.module.scss'

type Props = HTMLAttributes<HTMLDivElement> & {
  align?: 'left' | 'center' | 'right'
  direction?: 'row' | 'column'
  children: ReactNode
}

export const Group = ({
  align = 'left',
  direction = 'row',
  children,
}: Props): JSX.Element => {
  return (
    <div
      className={Styles.containter}
      data-align={align}
      data-direction={direction}
    >
      {children}
    </div>
  )
}
