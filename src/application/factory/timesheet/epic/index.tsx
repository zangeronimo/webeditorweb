import { ProjectService } from '@/application/service/timesheet/project'
import { EpicService } from '@/application/service/timesheet/epic'
import { api } from '@/infra/provider/axiosProvider'
import { Epics } from '@/presentation/pages/timesheet/epic'

export const EpicFactory = (): JSX.Element => {
  const projectService = new ProjectService(api)
  const epicService = new EpicService(api)
  return <Epics _epicService={epicService} _projectService={projectService} />
}
