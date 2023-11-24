export interface IHttpProvider {
  get: <T, V>(url: string, params: V) => Promise<T>
  post: <T, V>(url: string, body: V) => Promise<T>
}
