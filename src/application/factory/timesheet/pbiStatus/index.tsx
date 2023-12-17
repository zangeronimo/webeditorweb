import { PbiStatusService } from '@/application/service/timesheet/pbiStatus'
import { api } from '@/infra/provider/axiosProvider'
import { PbiStatus } from '@/presentation/pages/timesheet/pbiStatus'

export const PbiStatusFactory = (): JSX.Element => {
  const pbiStatusService = new PbiStatusService(api)
  return <PbiStatus _pbiStatusService={pbiStatusService} />
}
