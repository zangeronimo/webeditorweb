import { ClientService } from '@/application/service/timesheet/client'
import { api } from '@/infra/provider/axiosProvider'
import { Clients } from '@/presentation/pages/timesheet/client'

export const ClientFactory = (): JSX.Element => {
  const clientService = new ClientService(api)
  return <Clients _clientService={clientService} />
}
