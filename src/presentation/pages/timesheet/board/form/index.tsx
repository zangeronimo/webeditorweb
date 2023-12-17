import { type IPbiStatusService } from '@/application/interface/timesheet/pbiStatus'
import { Editor } from '@/presentation/components/editor'
import {
  Delete,
  Input,
  Save,
  Select,
  type SelectData,
} from '@/presentation/components/form'
import { Group } from '@/presentation/components/group'
import { useEffect, useState, type FormEvent } from 'react'

type Data = {
  id?: string
  name: string
  description: string
  order: number
  status: number
  epicId: string
  pbiStatusId: string
}

type Props = {
  epics: SelectData[]
  clientId: string
  handleNewRegister: () => void
  handleChangePayload: (e: FormEvent) => void
  onDelete: (pbiId: string) => void
  data: Data
  _pbiStatusService: IPbiStatusService
}

export const Form = ({
  epics,
  clientId,
  handleNewRegister,
  handleChangePayload,
  data,
  _pbiStatusService,
  onDelete,
}: Props): JSX.Element => {
  const [state, setState] = useState({
    pbiStatus: [],
  })
  useEffect((): void => {
    _pbiStatusService
      .getAll({ page: 1, pageSize: 999, orderBy: 'sort_order', clientId })
      .then(res => {
        const items = res.itens?.map(item => ({
          label: item.name,
          value: item.id,
        }))
        setState(old => ({ ...old, pbiStatus: items }))
      })
      .catch(e => {
        console.error(e.message)
      })
  }, [clientId])

  return (
    <form onSubmit={handleNewRegister}>
      <Input label="id" name="id" defaultValue={data.id} hidden />
      <Input
        name="name"
        label="Name"
        value={data.name}
        onChange={handleChangePayload}
      />
      <Editor
        data={data.description}
        onChange={data => {
          handleChangePayload({
            target: { name: 'description', value: data },
          } as any)
        }}
      />
      <Select
        disabled={!!data.id}
        name="epicId"
        label="Epics"
        value={data.epicId}
        onChange={handleChangePayload}
        data={[{ label: 'Select one', value: '' }, ...epics]}
      />
      <Group>
        <Select
          name="pbiStatusId"
          label="Development Status"
          value={data.pbiStatusId}
          onChange={handleChangePayload}
          data={[{ label: 'Select one', value: '' }, ...state.pbiStatus]}
        />
        <Input
          type="number"
          name="order"
          label="Priority"
          value={data.order}
          onChange={handleChangePayload}
        />
        <Select
          label="Blocked"
          name="status"
          value={data.status}
          onChange={handleChangePayload}
          data={[
            { label: 'No', value: 1 },
            { label: 'Yes', value: 0 },
          ]}
        />
      </Group>
      <Group align="space-between">
        {data.id ? (
          <Delete
            onClick={() => {
              onDelete(data.id)
            }}
          />
        ) : (
          <>&nbsp;</>
        )}
        <Save />
      </Group>
    </form>
  )
}
