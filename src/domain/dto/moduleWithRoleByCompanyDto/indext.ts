import { type RoleDto } from '../roleDto'

export class ModuleWithRoleByCompanyDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly roles: RoleDto,
  ) {}
}
