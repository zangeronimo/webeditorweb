import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IMakeLogin } from '@/application/interface/system/makeLogin'

export class MakeLogin implements IMakeLogin {
  constructor(readonly http: IHttpProvider) {}
  execute = async (username: string, password: string): Promise<string> => {
    return await this.http
      .post<{ Token: string }, { username: string; password: string }>(
        '/auth',
        {
          username,
          password,
        },
      )
      .then(async res => await Promise.resolve(res.Token))
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
