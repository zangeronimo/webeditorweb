import { type Role } from '@/domain/entity/role'

export interface IRoleGetAll {
  execute: (filter: any) => Promise<{ itens: Role[] }>
}
