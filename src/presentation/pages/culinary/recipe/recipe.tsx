import { type IRecipeService } from '@/application/interface/culinary/recipe'
import { type ICategoryService } from '@/application/interface/culinary/category'
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
  _recipeService: IRecipeService
  _categoryService: ICategoryService
  deleteRef: MutableRefObject<HTMLDivElement>
}

export const useRecipe = ({
  _recipeService,
  _categoryService,
  deleteRef,
}: Props): any => {
  const [state, setState] = useState({
    toDelete: '',
    categories: [],
    payload: {
      id: '',
      slug: '',
      name: '',
      ingredients: '',
      preparation: '',
      active: 1,
      categoryId: '',
    },
    recipes: { data: [], total: 0 },
    header: [
      { label: 'slug', align: 'left', order: 'slug' },
      { label: 'name', align: 'left', order: 'name' },
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
      categoryId: '',
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
        slug: '',
        name: '',
        ingredients: '',
        preparation: '',
        active: 1,
        categoryId: '',
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
        categoryId: '',
        orderBy: '',
        desc: false,
      },
    }))
  }

  const handleEdit = (id: string): void => {
    _recipeService
      .getById(id)
      .then(res => {
        setState(old => ({
          ...old,
          payload: {
            ...old.payload,
            id: res.id,
            slug: res.slug,
            name: res.name,
            ingredients: res.ingredients,
            preparation: res.preparation,
            active: res.active,
            categoryId: res.categoryId,
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
    _recipeService
      .delete(state.toDelete)
      .then(res => {
        closeModal(deleteRef)
        alert(`Recipe ${res.name} removed with success`)
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
    if (state.filter.categoryId) {
      filter.categoryId = state.filter.categoryId
    }

    _recipeService
      .getAll(filter)
      .then((res: any) => {
        const recipesData = res.itens?.map(row => {
          return {
            values: [
              { value: row.slug },
              { value: row.name },
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
          recipes: { data: recipesData, total: +res.total },
        }))
      })
      .catch(e => {
        console.error(e.message)
      })
  }, [state.reloadData])

  useEffect(() => {
    _categoryService
      .getAll({ page: 1, pageSize: 999, orderBy: 'name' })
      .then(res => {
        const categories = res.itens.map(item => ({
          label: item.name,
          value: item.id,
        }))
        setState(old => ({ ...old, categories }))
      })
      .catch(e => {
        toast.danger('Fail to get Categories', e.message)
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
