import { type Epic } from '../epic'

export class Pbi {
  constructor(
    readonly id: string,
    readonly sequence: number,
    readonly name: string,
    readonly description: string,
    readonly status: number,
    readonly epic: Epic,
  ) {}
}
