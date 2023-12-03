import { UserService } from '@/application/service/webeditor/user'
import { ModuleService } from '@/application/service/system/module'
import { Users } from '@/presentation/pages/webeditor/users'
import { api } from '@/infra/provider/axiosProvider'

export const UserFactory = (): JSX.Element => {
  const userService = new UserService(api)
  const moduleService = new ModuleService(api)
  return <Users _userService={userService} _moduleService={moduleService} />
}
