export class PbiStatus {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly order: number,
    readonly status: number,
    readonly clientId: string,
  ) {}
}
