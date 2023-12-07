import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IModuleService } from '@/application/interface/system/module'
import { ModuleWithRoleByCompanyDto } from '@/domain/dto/moduleWithRoleByCompanyDto/indext'
import { RoleDto } from '@/domain/dto/roleDto'
import { Module } from '@/domain/entity/system/module'

export class ModuleService implements IModuleService {
  constructor(readonly http: IHttpProvider) {}

  getAllByCompany = async (): Promise<ModuleWithRoleByCompanyDto[]> => {
    return await this.http
      .get('/module/get-all-by-company')
      .then(async (res: any) => {
        const result = res?.map(
          module =>
            new ModuleWithRoleByCompanyDto(
              module.id,
              module.name,
              module.roles?.map(
                role =>
                  new RoleDto(
                    role.id,
                    role.name,
                    role.label,
                    role.order,
                    role.moduleId,
                  ),
              ),
            ),
        )
        return await Promise.resolve(result)
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getAll = async (filter: any): Promise<{ itens: Module[] }> => {
    return await this.http
      .get('/module', { params: filter })
      .then(async (res: any) => {
        const modules: Module[] = res.itens?.map(
          item => new Module(item.id, item.name),
        )
        return await Promise.resolve({ itens: modules, total: res.total })
      })
      .catch(async e => {
        return await Promise.reject(new Error(e.response.data))
      })
  }

  getById = async (id: string): Promise<Module> => {
    return await this.http
      .get(`/module/${id}`)
      .then(async (res: any) => {
        return new Module(res.id, res.name)
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
        return new Module(res.id, res.name)
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
