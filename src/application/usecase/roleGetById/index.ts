import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IRoleGetById } from '@/application/interface/roleGetById'
import { Module } from '@/domain/entity/module'
import { Role } from '@/domain/entity/role'

export class RoleGetById implements IRoleGetById {
  constructor(readonly http: IHttpProvider) {}
  execute = async (id: string): Promise<Role> => {
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
}
