import { type ITaskService } from '@/application/interface/timesheet/task'
import { Button } from '@/presentation/components/form/button'
import { Group } from '@/presentation/components/group'
import { useModal } from '@/presentation/hooks/useModal'
import {
  type ChangeEvent,
  useEffect,
  useState,
  type FormEvent,
  type MutableRefObject,
} from 'react'

type Props = {
  _taskService: ITaskService
  deleteRef: MutableRefObject<HTMLDivElement>
}

export const useTask = ({ _taskService, deleteRef }: Props): any => {
  const [state, setState] = useState({
    toDelete: '',
    payload: { id: '', name: '', description: '', status: 1, pbiId: '' },
    tasks: { data: [], total: 0 },
    header: [
      { label: 'name', align: 'left', order: 'name' },
      { label: 'pbi', align: 'left' },
      { label: 'time worked', align: 'right' },
      { label: 'status', align: 'right', order: 'status' },
      { label: 'tools', align: 'right' },
    ],
    filter: {
      page: 1,
      pageSize: 10,
      orderBy: '',
      desc: false,
      name: '',
      pbiId: '',
      status: '',
    },
    reloadData: false,
  })

  const { showModal, closeModal } = useModal()

  const handleChangePayload = (e: ChangeEvent<HTMLInputElement>): void => {
    setState(old => ({
      ...old,
      payload: { ...old.payload, [e.target.name]: e.target.value },
    }))
  }

  const handleClearPayload = (): void => {
    setState(old => ({
      ...old,
      reloadData: !old.reloadData,
      payload: {
        ...old.payload,
        id: '',
        name: '',
        description: '',
        status: 1,
        pbiId: '',
      },
    }))
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    setState(old => ({
      ...old,
      filter: { ...old.filter, page: 1 },
      reloadData: !old.reloadData,
    }))
  }

  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>): void => {
    setState(old => ({
      ...old,
      filter: { ...old.filter, [e.target.name]: e.target.value },
    }))
  }

  const handleChangePage = (page: number): void => {
    setState(old => ({
      ...old,
      reloadData: !old.reloadData,
      filter: { ...old.filter, page },
    }))
  }

  const handleChangeOrder = (key: string): void => {
    setState(old => ({
      ...old,
      reloadData: !old.reloadData,
      filter: { ...old.filter, orderBy: key, desc: !old.filter.desc },
    }))
  }

  const handleClearFilter = (): void => {
    setState(old => ({
      ...old,
      reloadData: !old.reloadData,
      filter: {
        ...old.filter,
        page: 1,
        name: '',
        pbiId: '',
        status: '',
        orderBy: '',
        desc: false,
      },
    }))
  }

  const handleRegisterWork = (id: string): void => {
    _taskService
      .registerWork(id)
      .then(() => {
        setState(old => ({ ...old, reloadData: !old.reloadData }))
      })
      .catch(e => {
        handleClearPayload()
        console.error(e.message)
      })
  }

  const handleEdit = (id: string): void => {
    _taskService
      .getById(id)
      .then(res => {
        setState(old => ({
          ...old,
          payload: {
            ...old.payload,
            id: res.id,
            name: res.name,
            description: res.description,
            status: res.status,
            pbiId: res.pbi.id,
          },
        }))
        showModal()
      })
      .catch(e => {
        handleClearPayload()
        console.error(e.message)
      })
  }

  const handleDelete = (): void => {
    _taskService
      .delete(state.toDelete)
      .then(res => {
        closeModal(deleteRef)
        alert(`Task ${res.name} removed with success`)
        setState(old => ({ ...old, toDelete: '', reloadData: !old.reloadData }))
      })
      .catch(e => {
        handleClearPayload()
        console.error(e.message)
      })
  }

  const handleConfirmDelete = (id: string): void => {
    setState(old => ({ ...old, toDelete: id }))
    showModal(deleteRef)
  }

  const formatSecondsToHours = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds - hours * 3600) / 60)
    const sec = seconds - hours * 3600 - minutes * 60
    return `${hours}:${minutes}:${sec}`
  }

  useEffect(() => {
    const filter = {
      page: state.filter.page,
      pageSize: state.filter.pageSize,
    } as any
    if (state.filter.orderBy) {
      filter.orderBy = state.filter.orderBy
      filter.desc = state.filter.desc
    }
    if (state.filter.name) {
      filter.name = state.filter.name
    }
    if (state.filter.pbiId) {
      filter.pbiId = state.filter.pbiId
    }
    if (state.filter.status) {
      filter.status = state.filter.status
    }

    _taskService
      .getAll(filter)
      .then((res: any) => {
        let working = ''
        const tasksData = res.itens?.map(row => {
          if (row.working) working = row.id
          return {
            values: [
              { value: row.name },
              { value: row.pbi.name },
              { value: formatSecondsToHours(row.totalInSeconds) },
              { align: 'right', value: row.status },
              {
                align: 'right',
                value: (
                  <Group align="right">
                    <Button
                      disabled={
                        (!!working && working !== row.id) || row.status === 0
                      }
                      label={row.working ? 'Stop' : 'Start'}
                      onClick={() => {
                        handleRegisterWork(row.id)
                      }}
                    />
                    <Button
                      label="Edit"
                      onClick={() => {
                        handleEdit(row.id)
                      }}
                    />
                    <Button
                      label="Delete"
                      onClick={() => {
                        handleConfirmDelete(row.id)
                      }}
                    />
                  </Group>
                ),
              },
            ],
          }
        })

        setState(old => ({
          ...old,
          tasks: { data: tasksData, total: +res.total },
        }))
      })
      .catch(e => {
        console.error(e.message)
      })
  }, [state.reloadData])
  return {
    state,
    handleSubmit,
    handleChangeFilter,
    handleChangePage,
    handleChangeOrder,
    handleClearFilter,
    handleChangePayload,
    handleClearPayload,
    handleDelete,
  }
}
