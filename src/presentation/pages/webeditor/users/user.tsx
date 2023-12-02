import { type IUserService } from '@/application/interface/webeditor/user'
import { User } from '@/domain/entity/webeditor/user'
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
  _userService: IUserService
  deleteRef: MutableRefObject<HTMLDivElement>
}

export const useUser = ({ _userService, deleteRef }: Props): any => {
  const [state, setState] = useState({
    toDelete: '',
    payload: new User('', '', '', []),
    users: { data: [], total: 0 },
    header: [
      { label: 'name', align: 'left', order: 'name' },
      { label: 'email', align: 'left', order: 'email' },
      { label: 'tools', align: 'right' },
    ],
    filter: {
      page: 1,
      pageSize: 10,
      orderBy: '',
      desc: false,
      name: '',
      email: '',
    },
    reloadData: false,
  })

  const { showModal, closeModal } = useModal()

  const handleChangePayload = (e: ChangeEvent<HTMLInputElement>): void => {
    const user = state.payload
    user[e.target.name] = e.target.value
    setState(old => ({
      ...old,
      payload: user,
    }))
  }

  const handleClearPayload = (): void => {
    setState(old => ({
      ...old,
      reloadData: !old.reloadData,
      payload: new User('', '', '', []),
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
        email: '',
        orderBy: '',
        desc: false,
      },
    }))
  }

  const handleEdit = (id: string): void => {
    _userService
      .getById(id)
      .then(res => {
        const user = new User(res.id, res.name, res.email, res.roles)
        setState(old => ({
          ...old,
          payload: user,
        }))
        showModal()
      })
      .catch(e => {
        handleClearPayload()
        console.error(e.message)
      })
  }

  const handleDelete = (): void => {
    _userService
      .delete(state.toDelete)
      .then(res => {
        closeModal(deleteRef)
        alert(`User ${res.name} removed with success`)
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
    if (state.filter.email) {
      filter.email = state.filter.email
    }

    _userService
      .getAll(filter)
      .then((res: any) => {
        const usersData = res.itens.map(row => {
          return {
            values: [
              { value: row.name },
              { value: row.email },
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
          users: { data: usersData, total: +res.total },
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
