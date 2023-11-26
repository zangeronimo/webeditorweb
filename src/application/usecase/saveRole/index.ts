import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type ISaveRole } from '@/application/interface/saveRole'
import { type Role } from '@/domain/entity/role'

export class SaveRole implements ISaveRole {
  constructor(readonly http: IHttpProvider) {}
  execute = async (payload: any): Promise<Role> => {
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
}
