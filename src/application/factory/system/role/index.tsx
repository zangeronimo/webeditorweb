import { ModuleService } from '@/application/service/system/module'
import { RoleService } from '@/application/service/system/role'
import { AxiosProvider } from '@/infra/provider/axiosProvider'
import { Roles } from '@/presentation/pages/system/roles'

export const RoleFactory = (): JSX.Element => {
  const httpProvider = new AxiosProvider(process.env.API_URL)
  const roleService = new RoleService(httpProvider)
  const moduleService = new ModuleService(httpProvider)
  return <Roles _roleService={roleService} _moduleService={moduleService} />
}
