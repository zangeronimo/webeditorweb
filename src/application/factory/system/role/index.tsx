import { ModuleService } from '@/application/service/system/module'
import { RoleService } from '@/application/service/system/role'
import { api } from '@/infra/provider/axiosProvider'
import { Roles } from '@/presentation/pages/system/roles'

export const RoleFactory = (): JSX.Element => {
  const roleService = new RoleService(api)
  const moduleService = new ModuleService(api)
  return <Roles _roleService={roleService} _moduleService={moduleService} />
}
