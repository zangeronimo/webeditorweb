import { MakeLogin } from '@/application/service/system/makeLogin'
import { api } from '@/infra/provider/axiosProvider'
import { Login } from '@/presentation/pages/system/login'

export const LoginFactory = (): JSX.Element => {
  const makeLogin = new MakeLogin(api)
  return <Login _makeLogin={makeLogin} />
}
