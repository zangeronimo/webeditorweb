import { type Seconds } from '@/domain/valueObject/seconds'
import { type Epic } from '../epic'

export class Pbi {
  constructor(
    readonly id: string,
    readonly sequence: number,
    readonly name: string,
    readonly description: string,
    readonly order: number,
    readonly status: number,
    readonly epicId: string,
    readonly pbiStatusId: string,
    readonly epic: Epic,
    readonly totalInSeconds: Seconds,
    readonly working: boolean,
  ) {}
}
