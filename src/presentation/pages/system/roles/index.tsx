import { DataTable } from '@/presentation/components/datatable'
import { Pagination } from '@/presentation/components/datatable/pagination'
import { Button } from '@/presentation/components/form/button'
import { Input } from '@/presentation/components/form/input'
import { Select, type SelectData } from '@/presentation/components/form/select'
import { Group } from '@/presentation/components/group'
import { Modal } from '@/presentation/components/modal'
import { View } from '@/presentation/components/view'
import { ViewBox } from '@/presentation/components/viewBox'
import { useModal } from '@/presentation/hooks/useModal'
import { useEffect, useRef, useState } from 'react'
import { Form } from './form'
import { useRole } from './role'
import { Confirm } from '@/presentation/components/confirm'
import { type IRoleService } from '@/application/interface/system/role'
import { type IModuleService } from '@/application/interface/system/module'

type Props = {
  _moduleService: IModuleService
  _roleService: IRoleService
}

export const Roles = ({ _roleService, _moduleService }: Props): JSX.Element => {
  const [modules, setModules] = useState<SelectData[]>([])
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
  } = useRole({ _roleService, deleteRef })

  useEffect(() => {
    _moduleService
      .getAll({ page: 1, pageSize: 999 })
      .then(res => {
        const items = res.itens.map(item => ({
          label: item.name,
          value: item.id,
        }))
        setModules(items)
      })
      .catch(e => {
        console.error(e)
      })
  }, [])

  return (
    <View>
      <Modal title="Add new Role" onClose={handleClearPayload}>
        <Form
          modules={modules}
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _roleService={_roleService}
          data={{
            id: state.payload.id,
            name: state.payload.name,
            label: state.payload.label,
            order: state.payload.order,
            moduleId: state.payload.moduleId,
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
        <p>Are you sure to delete the role?</p>
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
            <Input
              name="label"
              label="Label"
              value={state.filter.label}
              onChange={handleChangeFilter}
            />
            <Select
              name="moduleId"
              label="Modules"
              value={state.filter.moduleId}
              onChange={handleChangeFilter}
              data={[{ label: 'All', value: '' }, ...modules]}
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
          label="Add new role"
          onClick={() => {
            showModal()
          }}
        />
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
