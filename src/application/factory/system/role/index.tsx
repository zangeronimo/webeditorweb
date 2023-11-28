import { ModuleGetAll } from '@/application/service/moduleGetAll'
import { RoleService } from '@/application/service/system/roleService'
import { AxiosProvider } from '@/infra/provider/axiosProvider'
import { Roles } from '@/presentation/pages/system/roles'

export const RoleFactory = (): JSX.Element => {
  const httpProvider = new AxiosProvider(process.env.API_URL)
  const roleService = new RoleService(httpProvider)
  const moduleGetAll = new ModuleGetAll(httpProvider)
  return <Roles _roleService={roleService} _moduleGetAll={moduleGetAll} />
}
