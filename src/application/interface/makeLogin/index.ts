export interface IMakeLogin {
  execute: (username: string, password: string) => Promise<string>
}
