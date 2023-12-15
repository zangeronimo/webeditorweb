import { type IPbiStatusService } from '@/application/interface/timesheet/pbiStatus'
import { ViewBox } from '@/presentation/components/viewBox'
import { useToast } from '@/presentation/hooks/useToast'
import { useEffect, useState } from 'react'

import Styles from './styles.module.scss'

type Props = {
  _pbiStatusService: IPbiStatusService
}

export const Board = ({ _pbiStatusService }: Props): JSX.Element => {
  const [state, setState] = useState({
    columns: [],
    clientId: '64dc4e11-cd5e-4292-ac67-1af45a5ea377',
  })
  const { toast } = useToast()

  useEffect(() => {
    _pbiStatusService
      .getAll({
        page: 1,
        pageSize: 999,
        clientId: state.clientId,
        orderBy: 'sort_order',
        status: 1,
      })
      .then(res => {
        setState(old => ({ ...old, columns: res.itens }))
      })
      .catch(e => {
        toast.danger('Fail on get columns', e.message)
      })
  }, [state.clientId])

  return (
    <div>
      <ViewBox title="Board">
        <div className={Styles.container}>
          {state.columns.map(item => (
            <div className={Styles.column} key={item.id}>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </ViewBox>
    </div>
  )
}
