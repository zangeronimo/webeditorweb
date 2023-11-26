import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IRoleGetAll } from '@/application/interface/roleGetAll'
import { Module } from '@/domain/entity/module'
import { Role } from '@/domain/entity/role'

export class RoleGetAll implements IRoleGetAll {
  constructor(readonly http: IHttpProvider) {}
  execute = async (filter: any): Promise<{ itens: Role[] }> => {
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
}
