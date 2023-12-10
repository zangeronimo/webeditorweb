import { type IClientService } from '@/application/interface/timesheet/client'
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
  _clientService: IClientService
  deleteRef: MutableRefObject<HTMLDivElement>
}

export const useClient = ({ _clientService, deleteRef }: Props): any => {
  const [state, setState] = useState({
    toDelete: '',
    payload: { id: '', name: '', status: 1 },
    clients: { data: [], total: 0 },
    header: [
      { label: 'name', align: 'left', order: 'name' },
      { label: 'status', align: 'right', order: 'status' },
      { label: 'tools', align: 'right' },
    ],
    filter: {
      page: 1,
      pageSize: 10,
      orderBy: '',
      desc: false,
      name: '',
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
        status: 1,
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
        orderBy: '',
        desc: false,
      },
    }))
  }

  const handleEdit = (id: string): void => {
    _clientService
      .getById(id)
      .then(res => {
        setState(old => ({
          ...old,
          payload: {
            ...old.payload,
            id: res.id,
            name: res.name,
            status: res.status,
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
    _clientService
      .delete(state.toDelete)
      .then(res => {
        closeModal(deleteRef)
        alert(`Client ${res.name} removed with success`)
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

    _clientService
      .getAll(filter)
      .then((res: any) => {
        const clientsData = res.itens?.map(row => {
          return {
            values: [
              { value: row.name },
              { align: 'right', value: row.status },
              {
                align: 'right',
                value: (
                  <Group align="right">
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
          clients: { data: clientsData, total: +res.total },
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
