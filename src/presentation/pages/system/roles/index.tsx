import { type IRoleGetAll } from '@/application/interface/roleGetAll'
import { DataTable } from '@/presentation/components/datatable'
import { Button } from '@/presentation/components/form/button'
import { Input } from '@/presentation/components/form/input'
import { View } from '@/presentation/components/view'
import { ViewBox } from '@/presentation/components/viewBox'
import { useRole } from './role'
import { Pagination } from '@/presentation/components/datatable/pagination'

type Props = {
  _getAll: IRoleGetAll
}

export const Roles = ({ _getAll }: Props): JSX.Element => {
  const {
    state,
    handleSubmit,
    handleChangeFilter,
    handleChangePage,
    handleChangeOrder,
    handleClearFilter,
  } = useRole({ _getAll })

  return (
    <View>
      <ViewBox title="Filter">
        <form onSubmit={handleSubmit}>
          <Input name="name" label="Name" onChange={handleChangeFilter} />
          <Input name="label" label="Label" onChange={handleChangeFilter} />
          <Button type="submit" label="Search" />
          <Button
            type="button"
            label="Clear filter"
            onClick={handleClearFilter}
          />
        </form>
      </ViewBox>
      <ViewBox title="Result">
        <DataTable
          header={state.header}
          data={state.roles.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.roles.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
