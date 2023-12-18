import { type IRatingService } from '@/application/interface/culinary/rating'
import { type IRecipeService } from '@/application/interface/culinary/recipe'
import { Delete, Edit } from '@/presentation/components/form'
import { Group } from '@/presentation/components/group'
import { useModal } from '@/presentation/hooks/useModal'
import { useToast } from '@/presentation/hooks/useToast'
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MutableRefObject,
} from 'react'

type Props = {
  _ratingService: IRatingService
  _recipeService: IRecipeService
  deleteRef: MutableRefObject<HTMLDivElement>
}

export const useRating = ({
  _ratingService,
  _recipeService,
  deleteRef,
}: Props): any => {
  const [state, setState] = useState({
    toDelete: '',
    recipes: [],
    payload: {
      id: '',
      rate: 10,
      comment: '',
      name: '',
      active: 1,
      recipeId: '',
    },
    ratings: { data: [], total: 0 },
    header: [
      { label: 'name', align: 'left', order: 'name' },
      { label: 'rate', align: 'right', order: 'rate' },
      { label: 'active', align: 'right', order: 'active' },
      { label: 'tools', align: 'right' },
    ],
    filter: {
      page: 1,
      pageSize: 10,
      orderBy: '',
      desc: false,
      name: '',
      active: '',
      recipeId: '',
    },
    reloadData: false,
  })

  const { showModal, closeModal } = useModal()
  const { toast } = useToast()

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
        rate: 10,
        comment: '',
        name: '',
        active: 1,
        recipeId: '',
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
        active: '',
        recipeId: '',
        orderBy: '',
        desc: false,
      },
    }))
  }

  const handleEdit = (id: string): void => {
    _ratingService
      .getById(id)
      .then(res => {
        setState(old => ({
          ...old,
          payload: {
            ...old.payload,
            id: res.id,
            rate: res.rate,
            comment: res.comment,
            name: res.name,
            active: res.active,
            recipeId: res.recipeId,
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
    _ratingService
      .delete(state.toDelete)
      .then(res => {
        closeModal(deleteRef)
        alert(`Rating ${res.name} removed with success`)
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
    if (state.filter.active) {
      filter.active = state.filter.active
    }
    if (state.filter.recipeId) {
      filter.recipeId = state.filter.recipeId
    }

    _ratingService
      .getAll(filter)
      .then((res: any) => {
        const ratingsData = res.itens?.map(row => {
          return {
            values: [
              { value: row.name },
              { value: row.rate, align: 'right' },
              { align: 'right', value: row.active },
              {
                align: 'right',
                value: (
                  <Group align="right">
                    <Edit
                      onClick={() => {
                        handleEdit(row.id)
                      }}
                    />
                    <Delete
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
          ratings: { data: ratingsData, total: +res.total },
        }))
      })
      .catch(e => {
        console.error(e.message)
      })
  }, [state.reloadData])

  useEffect(() => {
    _recipeService
      .getAll({ page: 1, pageSize: 999, orderBy: 'name' })
      .then(res => {
        const recipes = res.itens.map(item => ({
          label: item.name,
          value: item.id,
        }))
        setState(old => ({ ...old, recipes }))
      })
      .catch(e => {
        toast.danger('Fail to get Recipes', e.message)
      })
  }, [])

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
