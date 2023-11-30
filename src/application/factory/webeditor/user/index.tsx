import { AxiosProvider } from '@/infra/provider/axiosProvider'
import { UserService } from '@/application/service/webeditor/user'
import { RoleService } from '@/application/service/system/role'
import { Users } from '@/presentation/pages/webeditor/users'

export const UserFactory = (): JSX.Element => {
  const httpProvider = new AxiosProvider(process.env.API_URL)
  const userService = new UserService(httpProvider)
  const roleService = new RoleService(httpProvider)
  return <Users _userService={userService} _roleService={roleService} />
}
