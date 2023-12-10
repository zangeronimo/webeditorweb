import { type Pbi } from '../pbi'

export class Task {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly status: number,
    readonly pbi: Pbi,
    readonly totalInHours: number,
    readonly working: boolean,
  ) {}
}
