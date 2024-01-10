import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type INewsletterService } from '@/application/interface/institutional/newsletter'
import { Newsletter } from '@/domain/entity/institutional/newsletter'

export class NewsletterService implements INewsletterService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: Newsletter[] }> => {
    return await this.http
      .get('/institutional/newsletter', { params: filter })
      .then(async (res: any) => {
        const newsletters: Newsletter[] = res.itens?.map(
          item =>
            new Newsletter(
              item.id,
              item.name,
              item.email,
              item.active,
              item.confirmedAt,
              item.confirmedIP,
            ),
        )
        return await Promise.resolve({ itens: newsletters, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<Newsletter> => {
    return await this.http
      .get(`/institutional/newsletter/${id}`)
      .then(async (res: any) => {
        return new Newsletter(
          res.id,
          res.name,
          res.email,
          res.active,
          res.confirmedAt,
          res.confirmedIP,
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  save = async (payload: any): Promise<Newsletter> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/institutional/newsletter/${payload.id}`, {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          active: payload.active,
        })
    } else {
      request = async () =>
        await this.http.post('/institutional/newsletter', {
          name: payload.name,
          email: payload.email,
          active: payload.active,
        })
    }
    return request()
      .then(
        async (res: Newsletter) =>
          new Newsletter(
            res.id,
            res.name,
            res.email,
            res.active,
            res.confirmedAt,
            res.confirmedIP,
          ),
      )
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<Newsletter> => {
    return await this.http
      .delete(`/institutional/newsletter/${id}`)
      .then(async (res: any) => {
        return new Newsletter(
          res.id,
          res.name,
          res.email,
          res.active,
          res.confirmedAt,
          res.confirmedIP,
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
