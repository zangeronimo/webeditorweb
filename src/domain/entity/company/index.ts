export class Company {
  private readonly _modules: Set<string>

  constructor(
    readonly id: string,
    readonly name: string,
    modules: string[],
  ) {
    const setOfModules = new Set<string>()
    modules.map(module => setOfModules.add(module))
    this._modules = setOfModules
  }

  public addModule = (moduleId: string): void => {
    this._modules.add(moduleId)
  }

  public removeModule = (moduleId: string): void => {
    this._modules.delete(moduleId)
  }

  public hasModule = (moduleId: string): boolean => {
    return this._modules.has(moduleId)
  }

  public get modules(): string[] {
    return [...this._modules]
  }
}
