import { type IEpicService } from '@/application/interface/timesheet/epic'
import { type IPbiService } from '@/application/interface/timesheet/pbi'
import { type IPbiStatusService } from '@/application/interface/timesheet/pbiStatus'
import { Confirm } from '@/presentation/components/confirm'
import { Button } from '@/presentation/components/form'
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
  _epicService: IEpicService
}

export const Board = ({
  _pbiService,
  _pbiStatusService,
  _epicService,
}: Props): JSX.Element => {
  const { closeModal, showModal } = useModal()
  const deleteRef = useRef()
  const formRef = useRef()
  const {
    state,
    handleChangePayload,
    handleClearPayload,
    handleDelete,
    handleConfirmDelete,
    handleChangeStatus,
    handleRegisterWork,
    handleNewRegister,
    handleEdit,
  } = usePbi({
    _pbiService,
    _pbiStatusService,
    _epicService,
    deleteRef,
    formRef,
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
        confirmPattern="danger"
        onConfirm={handleDelete}
        onCancel={() => {
          closeModal(deleteRef)
        }}
      >
        <p>Are you sure to delete the epic?</p>
      </Confirm>
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
    </View>
  )
}
