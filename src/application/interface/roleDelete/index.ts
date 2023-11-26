import { type Role } from '@/domain/entity/role'

export interface IRoleDelete {
  execute: (id: string) => Promise<Role>
}
