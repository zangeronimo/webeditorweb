import { ModuleGetAll } from '@/application/service/moduleGetAll'
import { AxiosProvider } from '@/infra/provider/axiosProvider'
import { Modules } from '@/presentation/pages/system/modules'

export const ModuleFactory = (): JSX.Element => {
  const httpProvider = new AxiosProvider(process.env.API_URL)
  const moduleGetAll = new ModuleGetAll(httpProvider)
  return <Modules _getAll={moduleGetAll} />
}
