import { ModuleGetAll } from '@/application/usecase/moduleGetAll'
import { RoleDelete } from '@/application/usecase/roleDelete'
import { RoleGetAll } from '@/application/usecase/roleGetAll'
import { RoleGetById } from '@/application/usecase/roleGetById'
import { SaveRole } from '@/application/usecase/saveRole'
import { AxiosProvider } from '@/infra/provider/axiosProvider'
import { Roles } from '@/presentation/pages/system/roles'

export const RoleFactory = (): JSX.Element => {
  const httpProvider = new AxiosProvider(process.env.API_URL)
  const roleGetAll = new RoleGetAll(httpProvider)
  const roleGetById = new RoleGetById(httpProvider)
  const saveRole = new SaveRole(httpProvider)
  const roleDelete = new RoleDelete(httpProvider)
  const moduleGetAll = new ModuleGetAll(httpProvider)
  return (
    <Roles
      _getAll={roleGetAll}
      _save={saveRole}
      _moduleGetAll={moduleGetAll}
      _getById={roleGetById}
      _delete={roleDelete}
    />
  )
}
