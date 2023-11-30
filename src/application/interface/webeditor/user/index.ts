import { type User } from '@/domain/entity/webeditor/user'

export interface IUserService {
  getAll: (filter: any) => Promise<{ itens: User[] }>
  getById: (id: string) => Promise<User>
  save: (payload: any) => Promise<User>
  delete: (id: string) => Promise<User>
}
