import { type IHttpProvider } from '@/application/interface/httpProvider'
import axios, { type AxiosInstance } from 'axios'

export class AxiosProvider implements IHttpProvider {
  private readonly api: AxiosInstance
  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
    })
  }

  get = async <T, V>(url: string, params: V): Promise<T> => {
    const result = await this.api.get<T>(url, { params })
    return result.data
  }

  post = async <T, V>(url: string, body: V): Promise<T> => {
    const result = await this.api.post<T>(url, body)
    return result.data
  }
}
