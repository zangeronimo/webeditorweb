import { type Rating } from '@/domain/entity/culinary/rating'

export interface IRatingService {
  getAll: (filter: any) => Promise<{ itens: Rating[] }>
  getById: (id: string) => Promise<Rating>
  save: (payload: any) => Promise<Rating>
  delete: (id: string) => Promise<Rating>
}
