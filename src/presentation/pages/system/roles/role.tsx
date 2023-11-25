import { type IRoleGetAll } from '@/application/interface/roleGetAll'
import { type ChangeEvent, useEffect, useState, type FormEvent } from 'react'

type Props = {
  _getAll: IRoleGetAll
}

export const useRole = ({ _getAll }: Props): any => {
  const [state, setState] = useState({
    roles: { data: [], total: 0 },
    header: [
      { label: 'name', align: 'left', order: 'name' },
      { label: 'label', align: 'left', order: 'label' },
      { label: 'order', align: 'right', order: 'sort_order' },
    ],
    filter: {
      page: 1,
      pageSize: 10,
      orderBy: '',
      desc: true,
      name: '',
      label: '',
    },
    reloadData: false,
  })

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
        label: '',
        orderBy: '',
        desc: true,
      },
    }))
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
    if (state.filter.label) {
      filter.label = state.filter.label
    }

    _getAll
      .execute(filter)
      .then((res: any) => {
        const rolesData = res.itens.map(row => {
          return {
            values: [
              { value: row.name },
              { value: row.label },
              { align: 'right', value: row.order },
            ],
          }
        })
        setState(old => ({
          ...old,
          roles: { data: rolesData, total: +res.total },
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
  }
}
