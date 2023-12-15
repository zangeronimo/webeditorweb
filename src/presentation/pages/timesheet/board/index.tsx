import { type IClientService } from '@/application/interface/timesheet/client'
import { type IPbiStatusService } from '@/application/interface/timesheet/pbiStatus'
import { Select } from '@/presentation/components/form/select'
import { Group } from '@/presentation/components/group'
import { View } from '@/presentation/components/view'
import { ViewBox } from '@/presentation/components/viewBox'
import { useToast } from '@/presentation/hooks/useToast'
import { useEffect, useState } from 'react'

import Styles from './styles.module.scss'

type Props = {
  _pbiStatusService: IPbiStatusService
  _clientService: IClientService
}

export const Board = ({
  _pbiStatusService,
  _clientService,
}: Props): JSX.Element => {
  const [state, setState] = useState({
    columns: [],
    clients: [],
    clientId: '',
  })
  const { toast } = useToast()

  useEffect(() => {
    _clientService
      .getAll({ page: 1, pageSize: 999, orderBy: 'name', status: 1 })
      .then(res => {
        const clientsData = res.itens.map(client => ({
          value: client.id,
          label: client.name,
        }))
        setState(old => ({ ...old, clients: clientsData }))
      })
      .catch(e => {
        toast.danger('Fail on get clients', e.message)
      })
  }, [])

  useEffect(() => {
    if (!state.clientId) return
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
    <View>
      <ViewBox title="Filter">
        <Group>
          <Select
            name="clientId"
            label="Clients"
            value={state.clientId}
            onChange={e => {
              setState(old => ({ ...old, clientId: e.target.value }))
            }}
            data={[{ label: 'Select one', value: '' }, ...state.clients]}
          />
        </Group>
      </ViewBox>
      <ViewBox title="Board">
        <div className={Styles.container}>
          {state.columns.map(item => (
            <div className={Styles.column} key={item.id}>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </ViewBox>
    </View>
  )
}
