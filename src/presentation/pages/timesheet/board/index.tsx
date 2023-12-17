import { type IClientService } from '@/application/interface/timesheet/client'
import { type IEpicService } from '@/application/interface/timesheet/epic'
import { type IPbiService } from '@/application/interface/timesheet/pbi'
import { type IPbiStatusService } from '@/application/interface/timesheet/pbiStatus'
import { Confirm } from '@/presentation/components/confirm'
import { Button } from '@/presentation/components/form/button'
import { Select } from '@/presentation/components/form/select'
import { Group } from '@/presentation/components/group'
import { Modal } from '@/presentation/components/modal'
import { View } from '@/presentation/components/view'
import { ViewBox } from '@/presentation/components/viewBox'
import { useModal } from '@/presentation/hooks/useModal'
import { useRef } from 'react'
import { Form } from './form'
import { usePbi } from './pbi'
import { PbiCard } from './pbiCard'

import Styles from './styles.module.scss'

type Props = {
  _pbiService: IPbiService
  _pbiStatusService: IPbiStatusService
  _clientService: IClientService
  _epicService: IEpicService
}

export const Board = ({
  _pbiService,
  _pbiStatusService,
  _clientService,
  _epicService,
}: Props): JSX.Element => {
  const { closeModal, showModal } = useModal()
  const deleteRef = useRef()
  const formRef = useRef()
  const clientRef = useRef()
  const {
    state,
    handleChangePayload,
    handleClearPayload,
    handleDelete,
    handleConfirmDelete,
    handleChangeStatus,
    handleRegisterWork,
    handleSetClient,
    handlePersistClient,
    handleNewRegister,
    handleEdit,
  } = usePbi({
    _pbiService,
    _pbiStatusService,
    _epicService,
    _clientService,
    deleteRef,
    formRef,
    clientRef,
  })

  return (
    <View>
      <Modal
        reference={formRef}
        title="Add new Pbi"
        onClose={handleClearPayload}
        overlayClose={false}
      >
        <Form
          onDelete={handleConfirmDelete}
          handleNewRegister={handleNewRegister}
          handleChangePayload={handleChangePayload}
          _pbiStatusService={_pbiStatusService}
          epics={state.epics}
          clientId={state.clientId}
          data={{
            id: state.payload.id,
            name: state.payload.name,
            description: state.payload.description,
            order: state.payload.order,
            status: state.payload.status,
            epicId: state.payload.epicId,
            pbiStatusId: state.payload.pbiStatusId,
          }}
        />
      </Modal>
      <Confirm
        reference={deleteRef}
        title="Confirm"
        lblConfirm="Delete"
        onConfirm={handleDelete}
        onCancel={() => {
          closeModal(deleteRef)
        }}
      >
        <p>Are you sure to delete the epic?</p>
      </Confirm>
      <Confirm
        reference={clientRef}
        title="Confirm"
        lblConfirm="Save client"
        onConfirm={handlePersistClient}
        onCancel={() => {
          closeModal(clientRef)
        }}
      >
        <p>Do you want to save this client?</p>
      </Confirm>
      <ViewBox title="Filter">
        <Group>
          <Select
            name="clientId"
            label="Clients"
            value={state.clientId}
            onChange={e => {
              handleSetClient(e.currentTarget.value)
            }}
            data={[{ label: 'Select one', value: '' }, ...state.clients]}
          />
        </Group>
      </ViewBox>
      {!!state.clientId && (
        <ViewBox title="Board">
          <Button
            label="Add new pbi"
            onClick={() => {
              showModal(formRef)
            }}
          />
          <div className={Styles.container}>
            {state.columns.map(item => (
              <div className={Styles.column} key={item.id}>
                <p>{item.name}</p>
                {item.pbis?.map(pbi => (
                  <PbiCard
                    onEdit={handleEdit}
                    key={pbi.id}
                    onChangeStatus={handleChangeStatus}
                    onRegisterWork={handleRegisterWork}
                    pbi={pbi}
                    pbiStatus={state.columns.map(item => ({
                      label: item.name,
                      value: item.id,
                    }))}
                  />
                ))}
              </div>
            ))}
          </div>
        </ViewBox>
      )}
    </View>
  )
}
