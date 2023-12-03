import { Password } from '@/domain/valueObject/password'

export class User {
  private readonly _roles: Set<string>
  private _password: Password

  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    roles: string[],
  ) {
    const setOfRoles = new Set<string>()
    roles?.map(role => setOfRoles.add(role))
    this._roles = setOfRoles
  }

  public addRole = (roleId: string): void => {
    this._roles.add(roleId)
  }

  public removeRole = (roleId: string): void => {
    this._roles.delete(roleId)
  }

  public hasRole = (roleId: string): boolean => {
    return this._roles.has(roleId)
  }

  public get roles(): string[] {
    return [...this._roles]
  }

  public set password(value: string) {
    this._password = new Password(value)
  }

  public get password(): string {
    return this._password?.value
  }
}
