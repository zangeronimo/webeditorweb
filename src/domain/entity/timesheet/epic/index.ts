import { type Project } from '../project'

export class Epic {
  constructor(
    readonly id: string,
    readonly sequence: number,
    readonly name: string,
    readonly description: string,
    readonly status: number,
    readonly projectId: string,
    readonly project: Project,
  ) {}
}
