import { type IPbiService } from '@/application/interface/timesheet/pbi'
import { type ITaskService } from '@/application/interface/timesheet/task'
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
import { useTask } from './task'
import { Select, type SelectData } from '@/presentation/components/form/select'

type Props = {
  _taskService: ITaskService
  _pbiService: IPbiService
}

export const Tasks = ({ _taskService, _pbiService }: Props): JSX.Element => {
  const [pbis, setPbis] = useState<SelectData[]>([])
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
  } = useTask({ _taskService, deleteRef })

  useEffect(() => {
    _pbiService
      .getAll({ page: 1, pageSize: 999 })
      .then(res => {
        const items = res.itens?.map(item => ({
          label: item.name,
          value: item.id,
        }))
        setPbis(items)
      })
      .catch(e => {
        console.error(e.message)
      })
  }, [])

  return (
    <View>
      <Modal title="Add new Task" onClose={handleClearPayload}>
        <Form
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _taskService={_taskService}
          pbis={pbis}
          data={{
            id: state.payload.id,
            name: state.payload.name,
            description: state.payload.description,
            status: state.payload.status,
            pbiId: state.payload.pbiId,
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
        <p>Are you sure to delete the pbi?</p>
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
              name="pbiId"
              label="Pbis"
              value={state.filter.pbiId}
              onChange={handleChangeFilter}
              data={[{ label: 'All', value: '' }, ...pbis]}
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
          label="Add new task"
          onClick={() => {
            showModal()
          }}
        />
        <DataTable
          header={state.header}
          data={state.tasks.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.tasks.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
