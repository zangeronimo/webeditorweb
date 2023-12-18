import { type IRatingService } from '@/application/interface/culinary/rating'
import { type IRecipeService } from '@/application/interface/culinary/recipe'
import { Rating } from '@/domain/entity/culinary/rating'
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
import { useRating } from './rating'
import { Form } from './form'

type Props = {
  _ratingService: IRatingService
  _recipeService: IRecipeService
}

export const Ratings = ({
  _ratingService,
  _recipeService,
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
  } = useRating({ _ratingService, _recipeService, deleteRef })

  return (
    <View>
      <Modal
        title="Add new Rating"
        onClose={handleClearPayload}
        overlayClose={false}
      >
        <Form
          recipes={state.recipes}
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _ratingService={_ratingService}
          data={
            new Rating(
              state.payload.id,
              state.payload.rate,
              state.payload.comment,
              state.payload.active,
              state.payload.recipeId,
              state.payload.name,
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
        <p>Are you sure to delete the rating?</p>
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
              label="Recipes"
              name="recipeId"
              value={state.filter.recipeId}
              onChange={handleChangeFilter}
              data={[{ label: 'All', value: '' }, ...state.recipes]}
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
          label="Add new rating"
          onClick={() => {
            showModal()
          }}
        />
        <DataTable
          header={state.header}
          data={state.ratings.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.ratings.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
