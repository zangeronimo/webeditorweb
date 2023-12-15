import { type Client } from '../client'

export class Project {
  constructor(
    readonly id: string,
    readonly sequence: number,
    readonly name: string,
    readonly description: string,
    readonly status: number,
    readonly clientId: string,
    readonly client: Client,
  ) {}
}
