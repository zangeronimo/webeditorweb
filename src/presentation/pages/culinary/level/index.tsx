import { DataTable } from '@/presentation/components/datatable'
import { Pagination } from '@/presentation/components/datatable/pagination'
import { Button, Input, Select } from '@/presentation/components/form'
import { Group } from '@/presentation/components/group'
import { Modal } from '@/presentation/components/modal'
import { View } from '@/presentation/components/view'
import { ViewBox } from '@/presentation/components/viewBox'
import { useModal } from '@/presentation/hooks/useModal'
import { useRef } from 'react'
import { Form } from './form'
import { useLevel } from './level'
import { Confirm } from '@/presentation/components/confirm'
import { type ILevelService } from '@/application/interface/culinary/level'
import { Level } from '@/domain/entity/culinary/level'

type Props = {
  _levelService: ILevelService
}

export const Levels = ({ _levelService }: Props): JSX.Element => {
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
  } = useLevel({ _levelService, deleteRef })

  return (
    <View>
      <Modal
        title="Add new Level"
        onClose={handleClearPayload}
        overlayClose={false}
      >
        <Form
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _levelService={_levelService}
          data={
            new Level(
              state.payload.id,
              state.payload.slug,
              state.payload.name,
              state.payload.active,
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
        <p>Are you sure to delete the level?</p>
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
          label="Add new level"
          onClick={() => {
            showModal()
          }}
        />
        <DataTable
          header={state.header}
          data={state.levels.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.levels.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
