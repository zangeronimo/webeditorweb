import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IPbiService } from '@/application/interface/timesheet/pbi'
import { Epic } from '@/domain/entity/timesheet/epic'
import { Pbi } from '@/domain/entity/timesheet/pbi'
import { Seconds } from '@/domain/valueObject/seconds'

export class PbiService implements IPbiService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: Pbi[] }> => {
    return await this.http
      .get('/timesheet/pbi', { params: filter })
      .then(async (res: any) => {
        const pbis: Pbi[] = res.itens?.map(
          item =>
            new Pbi(
              item.id,
              item.sequence,
              item.name,
              item.description,
              item.order,
              item.status,
              item.epicId,
              item.pbiStatusId,
              new Epic(
                item.epic.id,
                item.epic.sequence,
                item.epic.name,
                item.epic.description,
                item.epic.status,
                item.epic.projectId,
                item.epic.project,
              ),
              new Seconds(item.totalInSeconds),
              item.working,
            ),
        )
        return await Promise.resolve({ itens: pbis, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<Pbi> => {
    return await this.http
      .get(`/timesheet/pbi/${id}`)
      .then(async (res: any) => {
        return new Pbi(
          res.id,
          res.sequence,
          res.name,
          res.description,
          res.order,
          res.status,
          res.epicId,
          res.pbiStatusId,
          new Epic(
            res.epic.id,
            res.epic.sequence,
            res.epic.name,
            res.epic.description,
            res.epic.status,
            res.epic.projectId,
            res.epic.project,
          ),
          new Seconds(res.totalInSeconds),
          res.working,
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  registerWork = async (id: string): Promise<void> => {
    await this.http
      .patch(`/timesheet/pbi/register-work/${id}`)
      .catch(async e => {
        await Promise.reject(new Error(e.response.data))
      })
  }

  save = async (payload: any): Promise<Pbi> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/timesheet/pbi/${payload.id}`, {
          id: payload.id,
          name: payload.name,
          description: payload.description,
          order: payload.order,
          status: payload.status,
          pbiStatusId: payload.pbiStatusId,
          epicId: payload.epicId,
        })
    } else {
      request = async () =>
        await this.http.post('/timesheet/pbi', {
          name: payload.name,
          description: payload.description,
          order: payload.order,
          status: payload.status,
          pbiStatusId: payload.pbiStatusId,
          epicId: payload.epicId,
        })
    }
    return request()
      .then(
        async (res: Pbi) =>
          new Pbi(
            res.id,
            res.sequence,
            res.name,
            res.description,
            res.order,
            res.status,
            res.epicId,
            res.pbiStatusId,
            new Epic(
              res.epic.id,
              res.epic.sequence,
              res.epic.name,
              res.epic.description,
              res.epic.status,
              res.epic.projectId,
              res.epic.project,
            ),
            res.totalInSeconds,
            res.working,
          ),
      )
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<void> => {
    await this.http.delete(`/timesheet/pbi/${id}`).catch(async e => {
      await Promise.reject(new Error(e.response.data))
    })
  }
}
