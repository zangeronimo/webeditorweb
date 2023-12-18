import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type ICategoryService } from '@/application/interface/culinary/category'
import { Category } from '@/domain/entity/culinary/category'

export class CategoryService implements ICategoryService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: Category[] }> => {
    return await this.http
      .get('/culinary/category', { params: filter })
      .then(async (res: any) => {
        const categorys: Category[] = res.itens?.map(
          item =>
            new Category(
              item.id,
              item.slug,
              item.name,
              item.active,
              item.levelId,
            ),
        )
        return await Promise.resolve({ itens: categorys, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<Category> => {
    return await this.http
      .get(`/culinary/category/${id}`)
      .then(async (res: any) => {
        return new Category(res.id, res.slug, res.name, res.active, res.levelId)
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  save = async (payload: any): Promise<Category> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/culinary/category/${payload.id}`, {
          id: payload.id,
          slug: payload.slug,
          name: payload.name,
          active: payload.active,
          levelId: payload.levelId,
        })
    } else {
      request = async () =>
        await this.http.post('/culinary/category', {
          name: payload.name,
          active: payload.active,
          levelId: payload.levelId,
        })
    }
    return request()
      .then(
        async (res: Category) =>
          new Category(res.id, res.slug, res.name, res.active, res.levelId),
      )
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<Category> => {
    return await this.http
      .delete(`/culinary/category/${id}`)
      .then(async (res: any) => {
        return new Category(res.id, res.slug, res.name, res.active, res.levelId)
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
