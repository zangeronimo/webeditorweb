import { ModuleService } from '@/application/service/system/module'
import { api } from '@/infra/provider/axiosProvider'
import { Modules } from '@/presentation/pages/system/modules'

export const ModuleFactory = (): JSX.Element => {
  const moduleService = new ModuleService(api)
  return <Modules _moduleService={moduleService} />
}
