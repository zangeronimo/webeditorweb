import { type ModuleWithRoleByCompanyDto } from '@/domain/dto/moduleWithRoleByCompanyDto/indext'
import { type Module } from '@/domain/entity/system/module'

export interface IModuleService {
  getAllByCompany: () => Promise<ModuleWithRoleByCompanyDto[]>
  getAll: (filter: any) => Promise<{ itens: Module[] }>
  getById: (id: string) => Promise<Module>
  save: (payload: any) => Promise<Module>
  delete: (id: string) => Promise<Module>
}
