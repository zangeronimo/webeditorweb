import { AxiosProvider } from '@/infra/provider/axiosProvider'
import { UserService } from '@/application/service/webeditor/user'
import { ModuleService } from '@/application/service/system/module'
import { Users } from '@/presentation/pages/webeditor/users'

export const UserFactory = (): JSX.Element => {
  const httpProvider = new AxiosProvider(process.env.API_URL)
  const userService = new UserService(httpProvider)
  const moduleService = new ModuleService(httpProvider)
  return <Users _userService={userService} _moduleService={moduleService} />
}
