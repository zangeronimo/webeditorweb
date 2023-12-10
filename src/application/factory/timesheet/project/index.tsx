import { ClientService } from '@/application/service/timesheet/client'
import { ProjectService } from '@/application/service/timesheet/project'
import { api } from '@/infra/provider/axiosProvider'
import { Projects } from '@/presentation/pages/timesheet/project'

export const ProjectFactory = (): JSX.Element => {
  const clientService = new ClientService(api)
  const projectService = new ProjectService(api)
  return (
    <Projects _projectService={projectService} _clientService={clientService} />
  )
}
