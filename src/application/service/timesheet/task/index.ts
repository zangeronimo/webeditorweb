import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type ITaskService } from '@/application/interface/timesheet/task'
import { Pbi } from '@/domain/entity/timesheet/pbi'
import { Task } from '@/domain/entity/timesheet/task'
import { Seconds } from '@/domain/valueObject/seconds'

export class TaskService implements ITaskService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: Task[] }> => {
    return await this.http
      .get('/timesheet/task', { params: filter })
      .then(async (res: any) => {
        const tasks: Task[] = res.itens?.map(
          item =>
            new Task(
              item.id,
              item.name,
              item.descritpion,
              item.status,
              new Pbi(
                item.pbi.id,
                item.pbi.sequence,
                item.pbi.name,
                item.pbi.description,
                item.pbi.status,
                item.pbi.epic,
              ),
              new Seconds(item.totalInSeconds),
              item.working,
            ),
        )
        return await Promise.resolve({ itens: tasks, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<Task> => {
    return await this.http
      .get(`/timesheet/task/${id}`)
      .then(async (res: any) => {
        return new Task(
          res.id,
          res.name,
          res.description,
          res.status,
          new Pbi(
            res.pbi.id,
            res.pbi.sequence,
            res.pbi.name,
            res.pbi.description,
            res.pbi.status,
            res.pbi.epic,
          ),
          new Seconds(res.totalInSeconds),
          res.working,
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  registerWork = async (id: string): Promise<void> => {
    await this.http
      .patch(`/timesheet/task/register-work/${id}`)
      .catch(async e => {
        await Promise.reject(new Error(e.response.data))
      })
  }

  save = async (payload: any): Promise<Task> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/timesheet/task/${payload.id}`, {
          id: payload.id,
          name: payload.name,
          description: payload.description,
          status: payload.status,
          pbiId: payload.pbiId,
        })
    } else {
      request = async () =>
        await this.http.post('/timesheet/task', {
          name: payload.name,
          description: payload.description,
          status: payload.status,
          pbiId: payload.pbiId,
        })
    }
    return request()
      .then(
        async (res: Task) =>
          new Task(
            res.id,
            res.name,
            res.description,
            res.status,
            new Pbi(
              res.pbi.id,
              res.pbi.sequence,
              res.pbi.name,
              res.pbi.description,
              res.pbi.status,
              res.pbi.epic,
            ),
            new Seconds(0),
            false,
          ),
      )
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<Task> => {
    return await this.http
      .delete(`/timesheet/task/${id}`)
      .then(async (res: any) => {
        return new Task(
          res.id,
          res.name,
          res.description,
          res.status,
          new Pbi(
            res.pbi.id,
            res.pbi.sequence,
            res.pbi.name,
            res.pbi.description,
            res.pbi.status,
            res.pbi.epic,
          ),
          new Seconds(0),
          false,
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
