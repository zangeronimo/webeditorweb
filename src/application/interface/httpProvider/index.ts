export interface IHttpProvider {
  get: <T, V>(url: string, params?: V) => Promise<T>
  post: <T, V>(url: string, body: V, headers?: any) => Promise<T>
  put: <T, V>(url: string, body: V) => Promise<T>
  delete: <T>(url: string) => Promise<T>
}
