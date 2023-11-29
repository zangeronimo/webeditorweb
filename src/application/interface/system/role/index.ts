import { type Role } from '@/domain/entity/system/role'

export interface IRoleService {
  getAll: (filter: any) => Promise<{ itens: Role[] }>
  getById: (id: string) => Promise<Role>
  save: (payload: any) => Promise<Role>
  delete: (id: string) => Promise<Role>
}
