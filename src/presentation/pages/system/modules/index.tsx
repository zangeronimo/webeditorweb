import { type IModuleGetAll } from '@/application/interface/moduleGetAll'
import { DataTable } from '@/presentation/components/datatable'
import { Pagination } from '@/presentation/components/datatable/pagination'
import { Button } from '@/presentation/components/form/button'
import { Input } from '@/presentation/components/form/input'
import { Group } from '@/presentation/components/group'
import { View } from '@/presentation/components/view'
import { ViewBox } from '@/presentation/components/viewBox'
import { useModal } from '@/presentation/hooks/useModal'
import { useModule } from './module'

type Props = {
  _getAll: IModuleGetAll
}

export const Modules = ({ _getAll }: Props): JSX.Element => {
  const { showModal } = useModal()
  const {
    state,
    handleSubmit,
    handleChangeFilter,
    handleChangePage,
    handleChangeOrder,
    handleClearFilter,
  } = useModule({ _getAll })

  return (
    <View>
      {/* <Modal title="Add new Role" onClose={handleClearPayload}>
        <Form
          modules={modules}
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _save={_save}
          data={{
            id: state.payload.id,
            name: state.payload.name,
            label: state.payload.label,
            order: state.payload.order,
            moduleId: state.payload.moduleId,
          }}
        />
      </Modal> */}
      {/* <Confirm
        reference={deleteRef}
        title="Confirm"
        onConfirm={handleDelete}
        onCancel={() => {
          closeModal(deleteRef)
        }}
      >
        <p>Are you sure to delete the module?</p>
      </Confirm> */}
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
