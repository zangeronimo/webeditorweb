import { EpicService } from '@/application/service/timesheet/epic'
import { PbiService } from '@/application/service/timesheet/pbi'
import { api } from '@/infra/provider/axiosProvider'
import { Pbis } from '@/presentation/pages/timesheet/pbi'

export const PbiFactory = (): JSX.Element => {
  const epicService = new EpicService(api)
  const pbiService = new PbiService(api)
  return <Pbis _pbiService={pbiService} _epicService={epicService} />
}
