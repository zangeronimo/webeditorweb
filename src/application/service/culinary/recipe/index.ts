import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type IRecipeService } from '@/application/interface/culinary/recipe'
import { Recipe } from '@/domain/entity/culinary/recipe'

export class RecipeService implements IRecipeService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: Recipe[] }> => {
    return await this.http
      .get('/culinary/recipe', { params: filter })
      .then(async (res: any) => {
        const recipes: Recipe[] = res.itens?.map(
          item =>
            new Recipe(
              item.id,
              item.slug,
              item.name,
              item.ingredients,
              item.preparation,
              item.active,
              item.categoryId,
            ),
        )
        return await Promise.resolve({ itens: recipes, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<Recipe> => {
    return await this.http
      .get(`/culinary/recipe/${id}`)
      .then(async (res: any) => {
        return new Recipe(
          res.id,
          res.slug,
          res.name,
          res.ingredients,
          res.preparation,
          res.active,
          res.categoryId,
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  save = async (payload: any): Promise<Recipe> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/culinary/recipe/${payload.id}`, {
          id: payload.id,
          slug: payload.slug,
          name: payload.name,
          ingredients: payload.ingredients,
          preparation: payload.preparation,
          active: payload.active,
          categoryId: payload.categoryId,
        })
    } else {
      request = async () =>
        await this.http.post('/culinary/recipe', {
          name: payload.name,
          ingredients: payload.ingredients,
          preparation: payload.preparation,
          active: payload.active,
          categoryId: payload.categoryId,
        })
    }
    return request()
      .then(
        async (res: Recipe) =>
          new Recipe(
            res.id,
            res.slug,
            res.name,
            res.ingredients,
            res.preparation,
            res.active,
            res.categoryId,
          ),
      )
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<Recipe> => {
    return await this.http
      .delete(`/culinary/recipe/${id}`)
      .then(async (res: any) => {
        return new Recipe(
          res.id,
          res.slug,
          res.name,
          res.ingredients,
          res.preparation,
          res.active,
          res.categoryId,
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
