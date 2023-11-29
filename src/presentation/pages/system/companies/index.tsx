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
import { useCompany } from './company'
import { Confirm } from '@/presentation/components/confirm'
import { type IModuleService } from '@/application/interface/system/module'
import { type ICompanyService } from '@/application/interface/system/company'
import { type Module } from '@/domain/entity/module'
import { Company } from '@/domain/entity/company'

type Props = {
  _moduleService: IModuleService
  _companyService: ICompanyService
}

export const Companies = ({
  _companyService,
  _moduleService,
}: Props): JSX.Element => {
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
  } = useCompany({ _companyService, deleteRef })

  useEffect(() => {
    _moduleService
      .getAll({ page: 1, pageSize: 999 })
      .then(res => {
        setModules(res.itens)
      })
      .catch(e => {
        console.error(e)
      })
  }, [])

  return (
    <View>
      <Modal title="Add new Company" onClose={handleClearPayload}>
        <Form
          modules={modules}
          handleClearPayload={handleClearPayload}
          handleChangePayload={handleChangePayload}
          _companyService={_companyService}
          data={
            new Company(
              state.payload.id,
              state.payload.name,
              state.payload.modules,
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
        <p>Are you sure to delete the company?</p>
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
          label="Add new company"
          onClick={() => {
            showModal()
          }}
        />
        <DataTable
          header={state.header}
          data={state.companies.data}
          onOrder={(key: string) => {
            handleChangeOrder(key)
          }}
        />
        <Pagination
          total={state.companies.total}
          perPage={state.filter.pageSize}
          currentPage={state.filter.page}
          onPageChange={(page: number) => handleChangePage(page)}
        />
      </ViewBox>
    </View>
  )
}
