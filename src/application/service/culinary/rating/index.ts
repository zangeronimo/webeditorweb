import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IRatingService } from '@/application/interface/culinary/rating'
import { Rating } from '@/domain/entity/culinary/rating'

export class RatingService implements IRatingService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: Rating[] }> => {
    return await this.http
      .get('/culinary/rating', { params: filter })
      .then(async (res: any) => {
        const ratings: Rating[] = res.itens?.map(
          item =>
            new Rating(
              item.id,
              item.rate,
              item.comment,
              item.active,
              item.recipeId,
              item.name,
            ),
        )
        return await Promise.resolve({ itens: ratings, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<Rating> => {
    return await this.http
      .get(`/culinary/rating/${id}`)
      .then(async (res: any) => {
        return new Rating(
          res.id,
          res.rate,
          res.comment,
          res.active,
          res.recipeId,
          res.name,
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  save = async (payload: any): Promise<Rating> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/culinary/rating/${payload.id}`, {
          id: payload.id,
          rate: payload.rate,
          comment: payload.comment,
          active: payload.active,
          recipeId: payload.recipeId,
          name: payload.name,
        })
    } else {
      request = async () =>
        await this.http.post('/culinary/rating', {
          rate: payload.rate,
          comment: payload.comment,
          active: payload.active,
          recipeId: payload.recipeId,
          name: payload.name,
        })
    }
    return request()
      .then(
        async (res: Rating) =>
          new Rating(
            res.id,
            res.rate,
            res.comment,
            res.active,
            res.recipeId,
            res.name,
          ),
      )
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<Rating> => {
    return await this.http
      .delete(`/culinary/rating/${id}`)
      .then(async (res: any) => {
        return new Rating(
          res.id,
          res.rate,
          res.comment,
          res.active,
          res.recipeId,
          res.name,
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
