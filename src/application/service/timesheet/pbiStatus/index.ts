import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IPbiStatusService } from '@/application/interface/timesheet/pbiStatus'
import { PbiStatus } from '@/domain/entity/timesheet/pbiStatus'

export class PbiStatusService implements IPbiStatusService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: PbiStatus[] }> => {
    return await this.http
      .get('/timesheet/pbistatus', { params: filter })
      .then(async (res: any) => {
        const pbiStatus: PbiStatus[] = res.itens?.map(
          item =>
            new PbiStatus(
              item.id,
              item.name,
              item.order,
              item.status,
              item.clientId,
            ),
        )
        return await Promise.resolve({ itens: pbiStatus, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<PbiStatus> => {
    return await this.http
      .get(`/timesheet/pbistatus/${id}`)
      .then(async (res: any) => {
        return new PbiStatus(
          res.id,
          res.name,
          res.order,
          res.status,
          res.clientId,
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  save = async (payload: any): Promise<PbiStatus> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/timesheet/pbistatus/${payload.id}`, {
          id: payload.id,
          name: payload.name,
          order: payload.order,
          status: payload.status,
          clientId: payload.clientId,
        })
    } else {
      request = async () =>
        await this.http.post('/timesheet/pbistatus', {
          name: payload.name,
          order: payload.order,
          status: payload.status,
          clientId: payload.clientId,
        })
    }
    return request()
      .then(
        async (res: PbiStatus) =>
          new PbiStatus(res.id, res.name, res.order, res.status, res.clientId),
      )
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<void> => {
    await this.http.delete(`/timesheet/pbistatus/${id}`).catch(async e => {
      await Promise.reject(new Error(e.response.data))
    })
  }
}
