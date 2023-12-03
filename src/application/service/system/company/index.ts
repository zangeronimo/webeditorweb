import { type IHttpProvider } from '@/application/interface/httpProvider'
import { type ICompanyService } from '@/application/interface/system/company'
import { Company } from '@/domain/entity/system/company'

export class CompanyService implements ICompanyService {
  constructor(readonly http: IHttpProvider) {}
  getAll = async (filter: any): Promise<{ itens: Company[] }> => {
    return await this.http
      .get('/company', { params: filter })
      .then(async (res: any) => {
        const companies: Company[] = res.itens?.map(
          item =>
            new Company(
              item.Id,
              item.Name,
              item.Modules?.map(module => module.Id),
            ),
        )
        return await Promise.resolve({ itens: companies, total: res.total })
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  getById = async (id: string): Promise<Company> => {
    return await this.http
      .get(`/company/${id}`)
      .then(async (res: any) => {
        return new Company(
          res.Id,
          res.Name,
          res.Modules?.map(module => module.Id),
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  save = async (payload: any): Promise<Company> => {
    let request
    if (payload.id) {
      request = async () =>
        await this.http.put(`/company/${payload.id}`, {
          id: payload.id,
          name: payload.name,
          modules: payload.modules?.map(id => ({ id })),
        })
    } else {
      request = async () =>
        await this.http.post('/company', {
          name: payload.name,
          modules: payload.modules?.map(id => ({ id })),
        })
    }
    return request()
      .then(async (res: Company) => res)
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }

  delete = async (id: string): Promise<Company> => {
    return await this.http
      .delete(`/company/${id}`)
      .then(async (res: any) => {
        return new Company(
          res.Id,
          res.Name,
          res.Modules?.map(module => module.Id),
        )
      })
      .catch(async e => await Promise.reject(new Error(e.response.data)))
  }
}
