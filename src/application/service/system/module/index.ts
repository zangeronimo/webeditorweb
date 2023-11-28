import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IModuleService } from '@/application/interface/system/module'
import { Module } from '@/domain/entity/module'

export class ModuleService implements IModuleService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: Module[] }> => {
    return await this.http
      .get('/module', filter)
      .then(async (res: any) => {
        const modules: Module[] = res.itens.map(
          item => new Module(item.Id, item.Name),
        )
        return await Promise.resolve({ itens: modules, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<Module> => {
    return await this.http
      .get(`/module/${id}`)
      .then(async (res: any) => {
        return new Module(res.Id, res.Name)
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  save = async (payload: any): Promise<Module> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/module/${payload.id}`, {
          id: payload.id,
          name: payload.name,
        })
    } else {
      request = async () =>
        await this.http.post('/module', {
          name: payload.name,
        })
    }
    return request()
      .then(async (res: Module) => res)
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<Module> => {
    return await this.http
      .delete(`/module/${id}`)
      .then(async (res: any) => {
        return new Module(res.Id, res.Name)
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
