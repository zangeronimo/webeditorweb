export interface IRefreshToken {
  execute: () => Promise<string>
}
