import { ModuleService } from '@/application/service/system/module'
import { AxiosProvider } from '@/infra/provider/axiosProvider'
import { Modules } from '@/presentation/pages/system/modules'

export const ModuleFactory = (): JSX.Element => {
  const httpProvider = new AxiosProvider(process.env.API_URL)
  const moduleService = new ModuleService(httpProvider)
  return <Modules _moduleService={moduleService} />
}
