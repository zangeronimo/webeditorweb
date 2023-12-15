import { ClientService } from '@/application/service/timesheet/client'
import { PbiStatusService } from '@/application/service/timesheet/pbiStatus'
import { api } from '@/infra/provider/axiosProvider'
import { PbiStatus } from '@/presentation/pages/timesheet/pbiStatus'

export const PbiStatusFactory = (): JSX.Element => {
  const clientService = new ClientService(api)
  const pbiStatusService = new PbiStatusService(api)
  return (
    <PbiStatus
      _pbiStatusService={pbiStatusService}
      _clientService={clientService}
    />
  )
}
