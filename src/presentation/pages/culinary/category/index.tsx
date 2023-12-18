import { type ICategoryService } from '@/application/interface/culinary/category'
import { type ILevelService } from '@/application/interface/culinary/level'
import { Category } from '@/domain/entity/culinary/category'
import { Confirm } from '@/presentation/components/confirm'
import { DataTable } from '@/presentation/components/datatable'
import { Pagination } from '@/presentation/components/datatable/pagination'
import { Button, Input, Select } from '@/presentation/components/form'
import { Group } from '@/presentation/components/group'
import { Modal } from '@/presentation/components/modal'
import { View } from '@/presentation/components/view'
import { ViewBox } from '@/presentation/components/viewBox'
import { useModal } from '@/presentation/hooks/useModal'
import { useRef } from 'react'
import { useCategory } from './category'
import { Form } from './form'

type Props = {
  _categoryService: ICategoryService
  _levelService: ILevelService
}

export const Categories = ({
  _categoryService,
  _levelService,
}: Props): JSX.Element => {
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
  } = useCategory({ _categoryService, _levelService, deleteRef })

  return (
    <View>
      <Modal
        title="Add new Category"
        onClose={handleClearPayload}
        overlayClose={false}
      >
        <Form
          levels={state.levels}
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _categoryService={_categoryService}
          data={
            new Category(
              state.payload.id,
              state.payload.slug,
              state.payload.name,
              state.payload.active,
              state.payload.levelId,
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
        <p>Are you sure to delete the category?</p>
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
              label="Levels"
              name="levelId"
              value={state.filter.levelId}
              onChange={handleChangeFilter}
              data={[{ label: 'All', value: '' }, ...state.levels]}
            />
            <Select
              label="Status"
              name="active"
              value={state.filter.active}
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
          label="Add new category"
          onClick={() => {
            showModal()
          }}
        />
        <DataTable
          header={state.header}
          data={state.categories.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.categories.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
