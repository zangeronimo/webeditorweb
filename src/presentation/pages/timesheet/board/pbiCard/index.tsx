import { type Pbi } from '@/domain/entity/timesheet/pbi'
import { Button } from '@/presentation/components/form/button'
import { Select, type SelectData } from '@/presentation/components/form/select'
import { Group } from '@/presentation/components/group'

import Styles from './styles.module.scss'

type Props = {
  pbiStatus: SelectData[]
  pbi: Pbi
  onChangeStatus: (pbi: Pbi) => void
  onEdit: (pbiId: string) => void
  onRegisterWork: (pbiId: string) => void
}

export const PbiCard = ({
  pbi,
  pbiStatus,
  onChangeStatus,
  onEdit,
  onRegisterWork,
}: Props): JSX.Element => {
  return (
    <div className={Styles.container}>
      <p
        style={{ cursor: 'pointer' }}
        onClick={() => {
          onEdit(pbi.id)
        }}
      >{`${pbi.sequence} - ${pbi.name}`}</p>
      <Select
        name="pbiStatus"
        label="Status"
        data={pbiStatus}
        value={pbi.pbiStatusId}
        onChange={e => {
          onChangeStatus({ ...pbi, pbiStatusId: e.currentTarget.value })
        }}
      />
      <Group direction="column" align="center">
        <h4>Register work</h4>
        <Group>
          <Button
            disabled={pbi.status === 0}
            label={pbi.working ? 'Stop' : 'Start'}
            onClick={() => {
              onRegisterWork(pbi.id)
            }}
          />

          <p>{pbi.totalInSeconds.formatToHours()}</p>
        </Group>
      </Group>
    </div>
  )
}
