import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IUserService } from '@/application/interface/webeditor/user'
import { User } from '@/domain/entity/webeditor/user'

export class UserService implements IUserService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: User[] }> => {
    return await this.http
      .get('/user', { params: filter })
      .then(async (res: any) => {
        const users: User[] = res.itens?.map(
          item =>
            new User(
              item.Id,
              item.Name,
              item.Email,
              item.Roles?.map(role => role.Id),
            ),
        )
        return await Promise.resolve({ itens: users, total: res.total })
      })
      .catch(async e => {
        return await Promise.reject(new Error(e.response.data))
      })
  }

  getById = async (id: string): Promise<User> => {
    return await this.http
      .get(`/user/${id}`)
      .then(async (res: any) => {
        return new User(
          res.Id,
          res.Name,
          res.Email,
          res.Roles?.map(role => role.Id),
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  save = async (payload: any): Promise<User> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/user/${payload.id}`, {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          password: payload.password,
          roles: payload.roles?.map(id => ({ id })),
        })
    } else {
      request = async () =>
        await this.http.post('/user', {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          roles: payload.roles?.map(id => ({ id })),
        })
    }
    return request()
      .then(async (res: User) => res)
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<User> => {
    return await this.http
      .delete(`/user/${id}`)
      .then(async (res: any) => {
        return new User(
          res.Id,
          res.Name,
          res.Email,
          res.Roles?.map(role => role.Id),
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
