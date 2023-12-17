import { DataTable } from '@/presentation/components/datatable'
import { Pagination } from '@/presentation/components/datatable/pagination'
import { Button, Input } from '@/presentation/components/form'
import { Group } from '@/presentation/components/group'
import { View } from '@/presentation/components/view'
import { ViewBox } from '@/presentation/components/viewBox'
import { useModal } from '@/presentation/hooks/useModal'
import { useModule } from './module'
import { type IModuleService } from '@/application/interface/system/module'
import { Modal } from '@/presentation/components/modal'
import { Form } from './form'
import { Confirm } from '@/presentation/components/confirm'
import { useRef } from 'react'

type Props = {
  _moduleService: IModuleService
}

export const Modules = ({ _moduleService }: Props): JSX.Element => {
  const { showModal, closeModal } = useModal()
  const deleteRef = useRef()
  const {
    state,
    handleSubmit,
    handleChangeFilter,
    handleChangePage,
    handleChangeOrder,
    handleClearFilter,
    handleClearPayload,
    handleChangePayload,
    handleDelete,
  } = useModule({ _moduleService, deleteRef })

  return (
    <View>
      <Modal
        title="Add new Module"
        onClose={handleClearPayload}
        overlayClose={false}
      >
        <Form
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _moduleService={_moduleService}
          data={{
            id: state.payload.id,
            name: state.payload.name,
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
        <p>Are you sure to delete the module?</p>
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
          label="Add new module"
          onClick={() => {
            showModal()
          }}
        />
        <DataTable
          header={state.header}
          data={state.modules.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.modules.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
