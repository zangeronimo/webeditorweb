import { type Newsletter } from '@/domain/entity/institutional/newsletter'

export interface INewsletterService {
  getAll: (filter: any) => Promise<{ itens: Newsletter[] }>
  getById: (id: string) => Promise<Newsletter>
  save: (payload: any) => Promise<Newsletter>
  delete: (id: string) => Promise<Newsletter>
}
