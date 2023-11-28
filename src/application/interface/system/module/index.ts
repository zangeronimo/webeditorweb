import { type Module } from '@/domain/entity/module'

export interface IModuleService {
  getAll: (filter: any) => Promise<{ itens: Module[] }>
  getById: (id: string) => Promise<Module>
  save: (payload: any) => Promise<Module>
  delete: (id: string) => Promise<Module>
}
