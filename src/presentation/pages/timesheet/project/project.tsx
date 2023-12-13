import { type IProjectService } from '@/application/interface/timesheet/project'
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
  _projectService: IProjectService
  deleteRef: MutableRefObject<HTMLDivElement>
}

export const useProject = ({ _projectService, deleteRef }: Props): any => {
  const [state, setState] = useState({
    toDelete: '',
    payload: { id: '', name: '', description: '', status: 1, clientId: '' },
    projects: { data: [], total: 0 },
    header: [
      { label: 'ID', align: 'left', order: 'sequence' },
      { label: 'name', align: 'left', order: 'name' },
      { label: 'client', align: 'left' },
      { label: 'status', align: 'right', order: 'status' },
      { label: 'tools', align: 'right' },
    ],
    filter: {
      page: 1,
      pageSize: 10,
      orderBy: '',
      desc: true,
      name: '',
      clientId: '',
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
        clientId: '',
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
        clientId: '',
        status: '',
        orderBy: '',
        desc: true,
      },
    }))
  }

  const handleEdit = (id: string): void => {
    _projectService
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
            clientId: res.client.id,
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
    _projectService
      .delete(state.toDelete)
      .then(() => {
        closeModal(deleteRef)
        alert('Project removed with success')
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
    if (state.filter.clientId) {
      filter.clientId = state.filter.clientId
    }
    if (state.filter.status) {
      filter.status = state.filter.status
    }

    _projectService
      .getAll(filter)
      .then((res: any) => {
        const projectsData = res.itens?.map(row => {
          return {
            values: [
              { value: row.sequence },
              { value: row.name },
              { value: row.client.name },
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
          projects: { data: projectsData, total: +res.total },
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
