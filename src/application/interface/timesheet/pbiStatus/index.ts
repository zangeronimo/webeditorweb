import { type PbiStatus } from '@/domain/entity/timesheet/pbiStatus'

export interface IPbiStatusService {
  getAll: (filter: any) => Promise<{ itens: PbiStatus[] }>
  getById: (id: string) => Promise<PbiStatus>
  save: (payload: any) => Promise<PbiStatus>
  delete: (id: string) => Promise<void>
}
