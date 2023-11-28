import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IRoleService } from '@/application/interface/system/role'
import { Module } from '@/domain/entity/module'
import { Role } from '@/domain/entity/role'

export class RoleService implements IRoleService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: Role[] }> => {
    return await this.http
      .get('/role', filter)
      .then(async (res: any) => {
        const roles: Role[] = res.itens.map(
          item =>
            new Role(
              item.Id,
              item.Name,
              item.Label,
              item.Order,
              new Module(item.Module.Id, item.Module.Name),
            ),
        )
        return await Promise.resolve({ itens: roles, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<Role> => {
    return await this.http
      .get(`/role/${id}`)
      .then(async (res: any) => {
        return new Role(
          res.Id,
          res.Name,
          res.Label,
          res.Order,
          new Module(res.Module.Id, res.Module.Name),
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  save = async (payload: any): Promise<Role> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/role/${payload.id}`, {
          id: payload.id,
          name: payload.name,
          label: payload.label,
          order: payload.order,
          moduleId: payload.moduleId,
        })
    } else {
      request = async () =>
        await this.http.post('/role', {
          name: payload.name,
          label: payload.label,
          order: payload.order,
          moduleId: payload.moduleId,
        })
    }
    return request()
      .then(async (res: Role) => res)
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<Role> => {
    return await this.http
      .delete(`/role/${id}`)
      .then(async (res: any) => {
        return new Role(
          res.Id,
          res.Name,
          res.Label,
          res.Order,
          new Module(res.Module.Id, res.Module.Name),
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
