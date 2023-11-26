import { type Module } from '../module'

export class Role {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly label: string,
    readonly order: number,
    readonly module: Module,
  ) {}
}
