import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type ILevelService } from '@/application/interface/culinary/level'
import { Level } from '@/domain/entity/culinary/level'

export class LevelService implements ILevelService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: Level[] }> => {
    return await this.http
      .get('/culinary/level', { params: filter })
      .then(async (res: any) => {
        const levels: Level[] = res.itens?.map(
          item => new Level(item.id, item.slug, item.name, item.active),
        )
        return await Promise.resolve({ itens: levels, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<Level> => {
    return await this.http
      .get(`/culinary/level/${id}`)
      .then(async (res: any) => {
        return new Level(res.id, res.slug, res.name, res.active)
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  save = async (payload: any): Promise<Level> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/culinary/level/${payload.id}`, {
          id: payload.id,
          slug: payload.slug,
          name: payload.name,
          active: payload.active,
        })
    } else {
      request = async () =>
        await this.http.post('/culinary/level', {
          name: payload.name,
          active: payload.active,
        })
    }
    return request()
      .then(
        async (res: Level) => new Level(res.id, res.slug, res.name, res.active),
      )
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<Level> => {
    return await this.http
      .delete(`/culinary/level/${id}`)
      .then(async (res: any) => {
        return new Level(res.id, res.slug, res.name, res.active)
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
