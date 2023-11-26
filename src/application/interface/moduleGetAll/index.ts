import { type Module } from '@/domain/entity/module'

export interface IModuleGetAll {
  execute: (filter: any) => Promise<{ itens: Module[] }>
}
