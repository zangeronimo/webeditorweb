import { type IPbiService } from '@/application/interface/timesheet/pbi'
import { type IPbiStatusService } from '@/application/interface/timesheet/pbiStatus'
import { Editor } from '@/presentation/components/editor'
import {
  Input,
  Save,
  Select,
  type SelectData,
} from '@/presentation/components/form'
import { useModal } from '@/presentation/hooks/useModal'
import { useEffect, useState, type FormEvent } from 'react'

type Data = {
  id?: string
  name: string
  description: string
  status: number
  epicId: string
  pbiStatusId: string
}

type Props = {
  epics: SelectData[]
  clientId: string
  handleClearPayload: () => void
  handleChangePayload: (e: FormEvent) => void
  data: Data
  _pbiService: IPbiService
  _pbiStatusService: IPbiStatusService
}

export const Form = ({
  epics,
  clientId,
  handleClearPayload,
  handleChangePayload,
  data,
  _pbiService,
  _pbiStatusService,
}: Props): JSX.Element => {
  const [state, setState] = useState({
    reRender: false,
    pbiStatus: [],
    epicsSelectData: [],
  })
  const { closeModal } = useModal()

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _pbiService
      .save(data)
      .then(res => {
        handleClearPayload()
        setState(old => ({ ...old, reRender: !old.reRender }))
        closeModal()
      })
      .catch(e => {
        console.error(e.message)
      })
  }

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
      <Select
        label="Status"
        name="status"
        value={data.status}
        onChange={handleChangePayload}
        data={[
          { label: 'Active', value: 1 },
          { label: 'Inactive', value: 0 },
        ]}
      />
      <Select
        name="pbiStatusId"
        label="Development Status"
        value={data.pbiStatusId}
        onChange={handleChangePayload}
        data={[{ label: 'Select one', value: '' }, ...state.pbiStatus]}
      />
      <Save />
    </form>
  )
}
