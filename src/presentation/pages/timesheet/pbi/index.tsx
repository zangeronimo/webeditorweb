import { type IEpicService } from '@/application/interface/timesheet/epic'
import { type IPbiService } from '@/application/interface/timesheet/pbi'
import { Confirm } from '@/presentation/components/confirm'
import { DataTable } from '@/presentation/components/datatable'
import { Pagination } from '@/presentation/components/datatable/pagination'
import { Button } from '@/presentation/components/form/button'
import { Input } from '@/presentation/components/form/input'
import { Group } from '@/presentation/components/group'
import { Modal } from '@/presentation/components/modal'
import { View } from '@/presentation/components/view'
import { ViewBox } from '@/presentation/components/viewBox'
import { useModal } from '@/presentation/hooks/useModal'
import { useEffect, useRef, useState } from 'react'
import { Form } from './form'
import { usePbi } from './pbi'
import { Select, type SelectData } from '@/presentation/components/form/select'
import { type IPbiStatusService } from '@/application/interface/timesheet/pbiStatus'

type Props = {
  _pbiService: IPbiService
  _epicService: IEpicService
  _pbiStatusService: IPbiStatusService
}

export const Pbis = ({
  _pbiService,
  _epicService,
  _pbiStatusService,
}: Props): JSX.Element => {
  const [epics, setEpics] = useState<SelectData[]>([])
  const [clientId, setClientId] = useState('')
  const { showModal, closeModal } = useModal()
  const deleteRef = useRef()
  const {
    state,
    handleSubmit,
    handleChangeFilter,
    handleChangePage,
    handleChangeOrder,
    handleClearFilter,
    handleChangePayload,
    handleClearPayload,
    handleDelete,
  } = usePbi({ _pbiService, deleteRef })

  useEffect(() => {
    _epicService
      .getAll({ page: 1, pageSize: 999 })
      .then(res => {
        const items = res.itens?.map(item => ({
          label: item.name,
          value: item.id,
        }))
        setEpics(items)
        if (res.itens.length > 0) setClientId(res.itens[0].project.clientId)
      })
      .catch(e => {
        console.error(e.message)
      })
  }, [])

  return (
    <View>
      <Modal
        title="Add new Pbi"
        onClose={handleClearPayload}
        overlayClose={false}
      >
        <Form
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _pbiService={_pbiService}
          _pbiStatusService={_pbiStatusService}
          epics={epics}
          clientId={clientId}
          data={{
            id: state.payload.id,
            name: state.payload.name,
            description: state.payload.description,
            status: state.payload.status,
            epicId: state.payload.epicId,
            pbiStatusId: state.payload.pbiStatusId,
          }}
        />
      </Modal>
      <Confirm
        reference={deleteRef}
        title="Confirm"
        onConfirm={handleDelete}
        onCancel={() => {
          closeModal(deleteRef)
        }}
      >
        <p>Are you sure to delete the epic?</p>
      </Confirm>
      <ViewBox title="Filter">
        <form onSubmit={handleSubmit}>
          <Group>
            <Input
              name="name"
              label="Name"
              value={state.filter.name}
              onChange={handleChangeFilter}
            />
            <Select
              name="epicId"
              label="Epics"
              value={state.filter.epicId}
              onChange={handleChangeFilter}
              data={[{ label: 'All', value: '' }, ...epics]}
            />
            <Select
              name="status"
              label="Status"
              value={state.filter.status}
              onChange={handleChangeFilter}
              data={[
                { label: 'All', value: '' },
                { label: 'Active', value: 1 },
                { label: 'Inactive', value: 0 },
              ]}
            />
          </Group>
          <Group align="right">
            <Button type="submit" label="Search" />
            <Button
              type="button"
              label="Clear filter"
              onClick={handleClearFilter}
            />
          </Group>
        </form>
      </ViewBox>
      <ViewBox title="Result">
        <Button
          label="Add new pbi"
          onClick={() => {
            showModal()
          }}
        />
        <DataTable
          header={state.header}
          data={state.pbis.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.pbis.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
