import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IRoleDelete } from '@/application/interface/roleDelete'
import { Module } from '@/domain/entity/module'
import { Role } from '@/domain/entity/role'

export class RoleDelete implements IRoleDelete {
  constructor(readonly http: IHttpProvider) {}
  execute = async (id: string): Promise<Role> => {
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
