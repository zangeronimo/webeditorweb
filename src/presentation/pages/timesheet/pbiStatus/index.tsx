import { type IClientService } from '@/application/interface/timesheet/client'
import { type IPbiStatusService } from '@/application/interface/timesheet/pbiStatus'
import { Confirm } from '@/presentation/components/confirm'
import { DataTable } from '@/presentation/components/datatable'
import { Pagination } from '@/presentation/components/datatable/pagination'
import {
  Button,
  Input,
  Select,
  type SelectData,
} from '@/presentation/components/form'
import { Group } from '@/presentation/components/group'
import { Modal } from '@/presentation/components/modal'
import { View } from '@/presentation/components/view'
import { ViewBox } from '@/presentation/components/viewBox'
import { useModal } from '@/presentation/hooks/useModal'
import { useEffect, useRef, useState } from 'react'
import { Form } from './form'
import { usePbiStatus } from './pbiStatus'

type Props = {
  _pbiStatusService: IPbiStatusService
  _clientService: IClientService
}

export const PbiStatus = ({
  _pbiStatusService,
  _clientService,
}: Props): JSX.Element => {
  const [clients, setClients] = useState<SelectData[]>([])
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
  } = usePbiStatus({ _pbiStatusService, deleteRef })

  useEffect(() => {
    _clientService
      .getAll({ page: 1, pageSize: 999 })
      .then(res => {
        const items = res.itens?.map(item => ({
          label: item.name,
          value: item.id,
        }))
        setClients(items)
      })
      .catch(e => {
        console.error(e.message)
      })
  }, [])

  return (
    <View>
      <Modal
        title="Add new PbiStatus"
        onClose={handleClearPayload}
        overlayClose={false}
      >
        <Form
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _pbiStatusService={_pbiStatusService}
          clients={clients}
          data={{
            id: state.payload.id,
            name: state.payload.name,
            order: state.payload.order,
            status: state.payload.status,
            clientId: state.payload.clientId,
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
        <p>Are you sure to delete the client?</p>
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
              name="clientId"
              label="Clients"
              value={state.filter.clientId}
              onChange={handleChangeFilter}
              data={[{ label: 'All', value: '' }, ...clients]}
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
          label="Add new pbiStatus"
          onClick={() => {
            showModal()
          }}
        />
        <DataTable
          header={state.header}
          data={state.pbiStatus.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.pbiStatus.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
