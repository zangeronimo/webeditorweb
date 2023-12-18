import { type Category } from '@/domain/entity/culinary/category'

export interface ICategoryService {
  getAll: (filter: any) => Promise<{ itens: Category[] }>
  getById: (id: string) => Promise<Category>
  save: (payload: any) => Promise<Category>
  delete: (id: string) => Promise<Category>
}
