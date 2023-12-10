import { type Project } from '@/domain/entity/timesheet/project'

export interface IProjectService {
  getAll: (filter: any) => Promise<{ itens: Project[] }>
  getById: (id: string) => Promise<Project>
  save: (payload: any) => Promise<Project>
  delete: (id: string) => Promise<Project>
}
