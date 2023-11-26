import { type Role } from '@/domain/entity/role'

export interface ISaveRole {
  execute: (payload: any) => Promise<Role>
}
