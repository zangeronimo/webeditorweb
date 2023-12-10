import { type Task } from '@/domain/entity/timesheet/task'

export interface ITaskService {
  getAll: (filter: any) => Promise<{ itens: Task[] }>
  getById: (id: string) => Promise<Task>
  save: (payload: any) => Promise<Task>
  delete: (id: string) => Promise<Task>
}
