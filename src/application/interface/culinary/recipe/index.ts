import { type Recipe } from '@/domain/entity/culinary/recipe'

export interface IRecipeService {
  getAll: (filter: any) => Promise<{ itens: Recipe[] }>
  getById: (id: string) => Promise<Recipe>
  save: (payload: any) => Promise<Recipe>
  delete: (id: string) => Promise<Recipe>
}
