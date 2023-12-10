import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IProjectService } from '@/application/interface/timesheet/project'
import { Client } from '@/domain/entity/timesheet/client'
import { Project } from '@/domain/entity/timesheet/project'

export class ProjectService implements IProjectService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: Project[] }> => {
    return await this.http
      .get('/timesheet/project', { params: filter })
      .then(async (res: any) => {
        const projects: Project[] = res.itens?.map(
          item =>
            new Project(
              item.id,
              item.name,
              item.descritpion,
              item.status,
              new Client(item.client.id, item.client.name, item.client.status),
            ),
        )
        return await Promise.resolve({ itens: projects, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<Project> => {
    return await this.http
      .get(`/timesheet/project/${id}`)
      .then(async (res: any) => {
        return new Project(
          res.id,
          res.name,
          res.description,
          res.status,
          new Client(res.client.id, res.client.name, res.client.status),
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  save = async (payload: any): Promise<Project> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/timesheet/project/${payload.id}`, {
          id: payload.id,
          name: payload.name,
          description: payload.description,
          status: payload.status,
          clientId: payload.clientId,
        })
    } else {
      request = async () =>
        await this.http.post('/timesheet/project', {
          name: payload.name,
          description: payload.description,
          status: payload.status,
          clientId: payload.clientId,
        })
    }
    return request()
      .then(
        async (res: Project) =>
          new Project(
            res.id,
            res.name,
            res.description,
            res.status,
            new Client(res.client.id, res.client.name, res.client.status),
          ),
      )
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<Project> => {
    return await this.http
      .delete(`/timesheet/project/${id}`)
      .then(async (res: any) => {
        return new Project(
          res.id,
          res.name,
          res.description,
          res.status,
          new Client(res.client.id, res.client.name, res.client.status),
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
