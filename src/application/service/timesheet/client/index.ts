import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IClientService } from '@/application/interface/timesheet/client'
import { Client } from '@/domain/entity/timesheet/client'

export class ClientService implements IClientService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: Client[] }> => {
    return await this.http
      .get('/timesheet/client', { params: filter })
      .then(async (res: any) => {
        const clients: Client[] = res.itens?.map(
          item => new Client(item.id, item.name, item.status),
        )
        return await Promise.resolve({ itens: clients, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<Client> => {
    return await this.http
      .get(`/timesheet/client/${id}`)
      .then(async (res: any) => {
        return new Client(res.id, res.name, res.status)
      })
      .catch(async e => {
        return await Promise.reject(new Error(e.response.data))
      })
  }

  save = async (payload: any): Promise<Client> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/timesheet/client/${payload.id}`, {
          id: payload.id,
          name: payload.name,
          status: payload.status,
        })
    } else {
      request = async () =>
        await this.http.post('/timesheet/client', {
          name: payload.name,
          status: payload.status,
        })
    }
    return request()
      .then(async (res: Client) => new Client(res.id, res.name, res.status))
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<Client> => {
    return await this.http
      .delete(`/timesheet/client/${id}`)
      .then(async (res: any) => {
        return new Client(res.id, res.name, res.status)
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
