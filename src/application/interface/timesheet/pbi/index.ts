import { type Pbi } from '@/domain/entity/timesheet/pbi'

export interface IPbiService {
  getAll: (filter: any) => Promise<{ itens: Pbi[] }>
  getById: (id: string) => Promise<Pbi>
  registerWork: (id: string) => Promise<void>
  save: (payload: any) => Promise<Pbi>
  delete: (id: string) => Promise<void>
}
