import { type Client } from '../client'

export class Project {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly status: number,
    readonly client: Client,
  ) {}
}
