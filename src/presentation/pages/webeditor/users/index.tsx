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
import { useUser } from './user'
import { Confirm } from '@/presentation/components/confirm'
import { type IUserService } from '@/application/interface/webeditor/user'
import { type IModuleService } from '@/application/interface/system/module'
import { type Module } from '@/domain/entity/system/module'

type Props = {
  _userService: IUserService
  _moduleService: IModuleService
}

export const Users = ({ _userService, _moduleService }: Props): JSX.Element => {
  const [modules, setModules] = useState<Module[]>([])
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
  } = useUser({ _userService, deleteRef })

  useEffect(() => {
    _moduleService
      .getAllByCompany()
      .then(res => {
        setModules(res)
      })
      .catch(e => {
        console.error(e.message)
      })
  }, [])

  return (
    <View>
      <Modal
        title="Add new User"
        onClose={handleClearPayload}
        overlayClose={false}
      >
        <Form
          modules={modules}
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _userService={_userService}
          data={state.payload}
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
        <Group>
          <p>Are you sure to delete the user?</p>
        </Group>
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
              name="email"
              label="Email"
              value={state.filter.email}
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
          label="Add new user"
          onClick={() => {
            showModal()
          }}
        />
        <DataTable
          header={state.header}
          data={state.users.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.users.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
