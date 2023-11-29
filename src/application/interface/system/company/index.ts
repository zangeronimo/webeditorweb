import { type Company } from '@/domain/entity/company'

export interface ICompanyService {
  getAll: (filter: any) => Promise<{ itens: Company[] }>
  getById: (id: string) => Promise<Company>
  save: (payload: any) => Promise<Company>
  delete: (id: string) => Promise<Company>
}
