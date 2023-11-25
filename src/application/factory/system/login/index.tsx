import { MakeLogin } from '@/application/usecase/makeLogin'
import { AxiosProvider } from '@/infra/provider/axiosProvider'
import { Login } from '@/presentation/pages/system/login'

export const LoginFactory = (): JSX.Element => {
  const httpProvider = new AxiosProvider(process.env.API_URL)
  const makeLogin = new MakeLogin(httpProvider)
  return <Login _makeLogin={makeLogin} />
}
