import { ClientService } from '@/application/service/timesheet/client'
import { PbiStatusService } from '@/application/service/timesheet/pbiStatus'
import { api } from '@/infra/provider/axiosProvider'
import { Board } from '@/presentation/pages/timesheet/board'

export const BoardFactory = (): JSX.Element => {
  const pbiStatusService = new PbiStatusService(api)
  const clientService = new ClientService(api)
  return (
    <Board
      _pbiStatusService={pbiStatusService}
      _clientService={clientService}
    />
  )
}
