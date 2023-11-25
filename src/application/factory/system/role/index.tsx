import { RoleGetAll } from '@/application/usecase/roleGetAll'
import { AxiosProvider } from '@/infra/provider/axiosProvider'
import { Roles } from '@/presentation/pages/system/roles'

export const RoleFactory = (): JSX.Element => {
  const httpProvider = new AxiosProvider(process.env.API_URL)
  const roleGetAll = new RoleGetAll(httpProvider)
  return <Roles _getAll={roleGetAll} />
}
