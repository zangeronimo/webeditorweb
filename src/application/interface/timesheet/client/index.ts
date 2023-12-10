import { type Client } from '@/domain/entity/timesheet/client'

export interface IClientService {
  getAll: (filter: any) => Promise<{ itens: Client[] }>
  getById: (id: string) => Promise<Client>
  save: (payload: any) => Promise<Client>
  delete: (id: string) => Promise<Client>
}
