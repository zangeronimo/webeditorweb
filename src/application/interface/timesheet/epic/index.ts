import { type Epic } from '@/domain/entity/timesheet/epic'

export interface IEpicService {
  getAll: (filter: any) => Promise<{ itens: Epic[] }>
  getById: (id: string) => Promise<Epic>
  save: (payload: any) => Promise<Epic>
  delete: (id: string) => Promise<void>
}
