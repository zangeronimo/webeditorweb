import Styles from './styles.module.scss'

export type DataTableHeader = {
  label: string
  align?: 'left' | 'center' | 'right'
  order?: string
}

export type DataTableData = {
  values: Array<{
    value: any
    align?: 'left' | 'center' | 'right'
  }>
}
type Props = {
  header: DataTableHeader[]
  data: DataTableData[]
  onOrder?: (order: string) => void
}

export const DataTable = ({ header, data, onOrder }: Props): JSX.Element => {
  const handleOrder = (key: string): void => {
    onOrder(key)
  }

  return (
    <table className={Styles.container} cellSpacing="0" cellPadding="0">
      <thead>
        <tr className={Styles.header}>
          {header?.map((item, i) => {
            const align = item.align ?? 'center'
            const styles = `${Styles[align]}`
            return (
              <th key={i} className={styles}>
                {item.label}{' '}
                {!!onOrder && !!item?.order && (
                  <button
                    onClick={() => {
                      handleOrder(item.order)
                    }}
                  >
                    o
                  </button>
                )}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody className={Styles.body}>
        {data?.map((row, i) => (
          <tr key={i}>
            {row.values?.map((item, y) => {
              const align = item.align ?? 'left'
              const styles = `${Styles[align]}`
              return (
                <td key={y} className={styles}>
                  <>{item.value}</>
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
