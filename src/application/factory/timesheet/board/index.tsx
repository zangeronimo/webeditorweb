import { ClientService } from '@/application/service/timesheet/client'
import { EpicService } from '@/application/service/timesheet/epic'
import { PbiService } from '@/application/service/timesheet/pbi'
import { PbiStatusService } from '@/application/service/timesheet/pbiStatus'
import { api } from '@/infra/provider/axiosProvider'
import { Board } from '@/presentation/pages/timesheet/board'

export const BoardFactory = (): JSX.Element => {
  const pbiService = new PbiService(api)
  const pbiStatusService = new PbiStatusService(api)
  const clientService = new ClientService(api)
  const epicService = new EpicService(api)
  return (
    <Board
      _pbiService={pbiService}
      _pbiStatusService={pbiStatusService}
      _clientService={clientService}
      _epicService={epicService}
    />
  )
}
