import { type IClientService } from '@/application/interface/timesheet/client'
import { type IProjectService } from '@/application/interface/timesheet/project'
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
import { useProject } from './project'
import { Select, type SelectData } from '@/presentation/components/form/select'

type Props = {
  _projectService: IProjectService
  _clientService: IClientService
}

export const Projects = ({
  _projectService,
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
  } = useProject({ _projectService, deleteRef })

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
        title="Add new Project"
        onClose={handleClearPayload}
        overlayClose={false}
      >
        <Form
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _projectService={_projectService}
          clients={clients}
          data={{
            id: state.payload.id,
            name: state.payload.name,
            description: state.payload.description,
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
          label="Add new project"
          onClick={() => {
            showModal()
          }}
        />
        <DataTable
          header={state.header}
          data={state.projects.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.projects.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
