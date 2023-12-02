export class RoleDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly label: string,
    readonly order: number,
    readonly moduleId: string,
  ) {}
}
