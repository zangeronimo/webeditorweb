import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IMakeLogin } from '@/application/interface/system/makeLogin'

export class MakeLogin implements IMakeLogin {
  constructor(readonly http: IHttpProvider) {}
  execute = async (username: string, password: string): Promise<string> => {
    return await this.http
      .post<
        { token: string },
        { username: string; password: string; grant_type: string }
      >(
        '/auth',
        {
          username,
          password,
          grant_type: 'password',
        },
        {
          withCredentials: true,
        },
      )
      .then(async res => {
        return await Promise.resolve(res.token)
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
