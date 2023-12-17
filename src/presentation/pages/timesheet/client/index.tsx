import { DataTable } from '@/presentation/components/datatable'
import { Pagination } from '@/presentation/components/datatable/pagination'
import { Button, Input } from '@/presentation/components/form'
import { Group } from '@/presentation/components/group'
import { Modal } from '@/presentation/components/modal'
import { View } from '@/presentation/components/view'
import { ViewBox } from '@/presentation/components/viewBox'
import { useModal } from '@/presentation/hooks/useModal'
import { useRef } from 'react'
import { Form } from './form'
import { useClient } from './client'
import { Confirm } from '@/presentation/components/confirm'
import { type IClientService } from '@/application/interface/timesheet/client'
import { Client } from '@/domain/entity/timesheet/client'

type Props = {
  _clientService: IClientService
}

export const Clients = ({ _clientService }: Props): JSX.Element => {
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
  } = useClient({ _clientService, deleteRef })

  return (
    <View>
      <Modal
        title="Add new Client"
        onClose={handleClearPayload}
        overlayClose={false}
      >
        <Form
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _clientService={_clientService}
          data={
            new Client(
              state.payload.id,
              state.payload.name,
              state.payload.status,
            )
          }
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
          label="Add new client"
          onClick={() => {
            showModal()
          }}
        />
        <DataTable
          header={state.header}
          data={state.clients.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.clients.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
