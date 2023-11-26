import { type SelectHTMLAttributes } from 'react'

import Styles from './styles.module.scss'

export interface SelectData {
  label: string
  value: string | number
}

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  name: string
  data: SelectData[]
  error?: string
}

export const Select = ({
  label,
  name,
  data,
  error = '',
  ...rest
}: Props): JSX.Element => {
  return (
    <div className={Styles.container}>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} {...rest}>
        {data.map((item, i) => (
          <option key={i} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <p>{error}</p>
    </div>
  )
}
