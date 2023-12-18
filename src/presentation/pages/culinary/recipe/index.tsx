import { type IRecipeService } from '@/application/interface/culinary/recipe'
import { type ICategoryService } from '@/application/interface/culinary/category'
import { Recipe } from '@/domain/entity/culinary/recipe'
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
import { useRecipe } from './recipe'
import { Form } from './form'

type Props = {
  _recipeService: IRecipeService
  _categoryService: ICategoryService
}

export const Recipes = ({
  _recipeService,
  _categoryService,
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
  } = useRecipe({ _recipeService, _categoryService, deleteRef })

  return (
    <View>
      <Modal
        title="Add new Recipe"
        onClose={handleClearPayload}
        overlayClose={false}
      >
        <Form
          categories={state.categories}
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _recipeService={_recipeService}
          data={
            new Recipe(
              state.payload.id,
              state.payload.slug,
              state.payload.name,
              state.payload.ingredients,
              state.payload.preparation,
              state.payload.active,
              state.payload.categoryId,
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
        <p>Are you sure to delete the recipe?</p>
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
              label="Categories"
              name="categoryId"
              value={state.filter.categoryId}
              onChange={handleChangeFilter}
              data={[{ label: 'All', value: '' }, ...state.categories]}
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
          label="Add new recipe"
          onClick={() => {
            showModal()
          }}
        />
        <DataTable
          header={state.header}
          data={state.recipes.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.recipes.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
