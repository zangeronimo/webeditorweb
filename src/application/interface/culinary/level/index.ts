import { type Level } from '@/domain/entity/culinary/level'

export interface ILevelService {
  getAll: (filter: any) => Promise<{ itens: Level[] }>
  getById: (id: string) => Promise<Level>
  save: (payload: any) => Promise<Level>
  delete: (id: string) => Promise<Level>
}
