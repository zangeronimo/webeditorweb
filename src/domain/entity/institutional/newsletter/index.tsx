export class Newsletter {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly active: number,
    readonly confirmedAt?: Date,
    readonly confirmedIP?: string,
  ) {}
}
