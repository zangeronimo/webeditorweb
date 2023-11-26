import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IModuleGetAll } from '@/application/interface/moduleGetAll'
import { Module } from '@/domain/entity/module'

export class ModuleGetAll implements IModuleGetAll {
  constructor(readonly http: IHttpProvider) {}
  execute = async (filter: any): Promise<{ itens: Module[] }> => {
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
}
