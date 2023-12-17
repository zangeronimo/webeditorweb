import { type IEpicService } from '@/application/interface/timesheet/epic'
import { type IProjectService } from '@/application/interface/timesheet/project'
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
import { useEpic } from './epic'
import { Form } from './form'

type Props = {
  _epicService: IEpicService
  _projectService: IProjectService
}

export const Epics = ({
  _epicService,
  _projectService,
}: Props): JSX.Element => {
  const [projects, setProjects] = useState<SelectData[]>([])
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
  } = useEpic({ _epicService, deleteRef })

  useEffect(() => {
    _projectService
      .getAll({ page: 1, pageSize: 999 })
      .then(res => {
        const items = res.itens?.map(item => ({
          label: item.name,
          value: item.id,
        }))
        setProjects(items)
      })
      .catch(e => {
        console.error(e.message)
      })
  }, [])

  return (
    <View>
      <Modal
        title="Add new Epic"
        onClose={handleClearPayload}
        overlayClose={false}
      >
        <Form
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _epicService={_epicService}
          projects={projects}
          data={{
            id: state.payload.id,
            name: state.payload.name,
            description: state.payload.description,
            status: state.payload.status,
            projectId: state.payload.projectId,
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
        <p>Are you sure to delete the project?</p>
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
              name="projectId"
              label="Projects"
              value={state.filter.projectId}
              onChange={handleChangeFilter}
              data={[{ label: 'All', value: '' }, ...projects]}
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
          label="Add new epic"
          onClick={() => {
            showModal()
          }}
        />
        <DataTable
          header={state.header}
          data={state.epics.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.epics.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
