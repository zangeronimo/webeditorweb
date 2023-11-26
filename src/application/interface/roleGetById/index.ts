import { type Role } from '@/domain/entity/role'

export interface IRoleGetById {
  execute: (id: string) => Promise<Role>
}
