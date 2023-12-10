import { type Project } from '../project'

export class Epic {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly status: number,
    readonly project: Project,
  ) {}
}
