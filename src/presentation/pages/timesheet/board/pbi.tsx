import { type IEpicService } from '@/application/interface/timesheet/epic'
import { type IPbiService } from '@/application/interface/timesheet/pbi'
import { type IPbiStatusService } from '@/application/interface/timesheet/pbiStatus'
import { type Pbi } from '@/domain/entity/timesheet/pbi'
import { useModal } from '@/presentation/hooks/useModal'
import { useToast } from '@/presentation/hooks/useToast'
import {
  useEffect,
  useState,
  type ChangeEvent,
  type MutableRefObject,
  type FormEvent,
} from 'react'

type Props = {
  _pbiService: IPbiService
  _pbiStatusService: IPbiStatusService
  _epicService: IEpicService
  deleteRef: MutableRefObject<HTMLDivElement>
  formRef: MutableRefObject<HTMLDivElement>
}

export const usePbi = ({
  _pbiService,
  _pbiStatusService,
  _epicService,
  deleteRef,
  formRef,
}: Props): any => {
  const [state, setState] = useState({
    toDelete: '',
    payload: {
      id: '',
      name: '',
      description: '',
      order: 0,
      status: 1,
      epicId: '',
      pbiStatusId: '',
    },
    columns: [],
    epics: [],
    reloadPbis: false,
  })

  const { closeModal, showModal } = useModal()
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
      payload: {
        ...old.payload,
        id: '',
        name: '',
        description: '',
        order: 0,
        status: 1,
        epicId: '',
        pbiStatusId: '',
      },
    }))
  }

  const handleDelete = (): void => {
    _pbiService
      .delete(state.toDelete)
      .then(res => {
        closeModal(deleteRef)
        closeModal(formRef)
        toast.success('Success', 'Pbi removed with success')
        setState(old => ({ ...old, toDelete: '', reloadPbis: !old.reloadPbis }))
      })
      .catch(e => {
        handleClearPayload()
        toast.danger('Fail to remove the PBI', e.message)
      })
  }

  const handleConfirmDelete = (id: string): void => {
    setState(old => ({ ...old, toDelete: id }))
    showModal(deleteRef)
  }

  const handleGetAllPbis = (columns: any): void => {
    _pbiService
      .getAll({
        page: 1,
        pageSize: 9999,
        orderBy: 'sort_order',
        desc: true,
      })
      .then(res => {
        columns.map(column => {
          column.pbis = res.itens.filter(pbi => pbi.pbiStatusId === column.id)
          return column
        })
        setState(old => ({ ...old, columns }))
      })
      .catch(e => {
        toast.danger('Fail on get PBIs', e.message)
      })
  }

  const handleRegisterWork = (id: string): void => {
    _pbiService
      .registerWork(id)
      .then(() => {
        toast.success('Sucess', 'You have registered your work successfully')
        setState(old => ({ ...old, reloadPbis: !old.reloadPbis }))
      })
      .catch(e => {
        toast.danger('Fail on register work', e.message)
      })
  }

  const handleChangeStatus = (pbi: Pbi): void => {
    _pbiService
      .save(pbi)
      .then(() => {
        setState(old => ({ ...old, reloadPbis: !old.reloadPbis }))
      })
      .catch(e => {
        toast.danger('Fail on sabe PBI', e.message)
      })
  }

  const handleNewRegister = (e: FormEvent): void => {
    e.preventDefault()
    _pbiService
      .save(state.payload)
      .then(res => {
        handleClearPayload()
        setState(old => ({ ...old, reloadPbis: !old.reloadPbis }))
        closeModal(formRef)
      })
      .catch(e => {
        console.error(e.message)
      })
  }

  const handleEdit = (id: string): void => {
    _pbiService
      .getById(id)
      .then(res => {
        setState(old => ({
          ...old,
          payload: {
            ...old.payload,
            id: res.id,
            name: res.name,
            description: res.description,
            order: res.order,
            status: res.status,
            epicId: res.epic.id,
            pbiStatusId: res.pbiStatusId,
          },
        }))
        showModal(formRef)
      })
      .catch(e => {
        handleClearPayload()
        console.error(e.message)
      })
  }

  useEffect(() => {
    _pbiStatusService
      .getAll({
        page: 1,
        pageSize: 999,
        orderBy: 'sort_order',
        status: 1,
      })
      .then(res => {
        handleGetAllPbis(res.itens)
      })
      .catch(e => {
        toast.danger('Fail on get columns', e.message)
      })
  }, [state.reloadPbis])

  useEffect(() => {
    _epicService
      .getAll({ page: 1, pageSize: 999 })
      .then(res => {
        const items = res.itens?.map(item => ({
          label: item.name,
          value: item.id,
        }))
        setState(old => ({ ...old, epics: items }))
      })
      .catch(e => {
        console.error(e.message)
      })
  }, [])

  return {
    state,
    handleChangePayload,
    handleClearPayload,
    handleDelete,
    handleConfirmDelete,
    handleRegisterWork,
    handleChangeStatus,
    handleNewRegister,
    handleEdit,
  }
}
