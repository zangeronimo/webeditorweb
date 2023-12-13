import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IEpicService } from '@/application/interface/timesheet/epic'
import { Project } from '@/domain/entity/timesheet/project'
import { Epic } from '@/domain/entity/timesheet/epic'

export class EpicService implements IEpicService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: Epic[] }> => {
    return await this.http
      .get('/timesheet/epic', { params: filter })
      .then(async (res: any) => {
        const epics: Epic[] = res.itens?.map(
          item =>
            new Epic(
              item.id,
              item.sequence,
              item.name,
              item.descritpion,
              item.status,
              new Project(
                item.project.id,
                item.project.sequence,
                item.project.name,
                item.project.description,
                item.project.status,
                item.project.client,
              ),
            ),
        )
        return await Promise.resolve({ itens: epics, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<Epic> => {
    return await this.http
      .get(`/timesheet/epic/${id}`)
      .then(async (res: any) => {
        return new Epic(
          res.id,
          res.sequence,
          res.name,
          res.description,
          res.status,
          new Project(
            res.project.id,
            res.project.sequence,
            res.project.name,
            res.project.description,
            res.project.status,
            res.project.client,
          ),
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  save = async (payload: any): Promise<Epic> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/timesheet/epic/${payload.id}`, {
          id: payload.id,
          name: payload.name,
          description: payload.description,
          status: payload.status,
          projectId: payload.projectId,
        })
    } else {
      request = async () =>
        await this.http.post('/timesheet/epic', {
          name: payload.name,
          description: payload.description,
          status: payload.status,
          projectId: payload.projectId,
        })
    }
    return request()
      .then(
        async (res: Epic) =>
          new Epic(
            res.id,
            res.sequence,
            res.name,
            res.description,
            res.status,
            new Project(
              res.project.id,
              res.project.sequence,
              res.project.name,
              res.project.description,
              res.project.status,
              res.project.client,
            ),
          ),
      )
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<void> => {
    await this.http
      .delete(`/timesheet/epic/${id}`)
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
