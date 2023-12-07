import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IRefreshToken } from '@/application/interface/system/refreshToken'

export class RefreshToken implements IRefreshToken {
  constructor(readonly http: IHttpProvider) {}
  execute = async (): Promise<string> => {
    return await this.http
      .post<{ token: string }, { grant_type: string }>(
        '/auth',
        {
          grant_type: 'refresh_token',
        },
        {
          withCredentials: true,
        },
      )
      .then(async res => await Promise.resolve(res.token))
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
