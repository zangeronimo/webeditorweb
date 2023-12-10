import { PbiService } from '@/application/service/timesheet/pbi'
import { TaskService } from '@/application/service/timesheet/task'
import { api } from '@/infra/provider/axiosProvider'
import { Tasks } from '@/presentation/pages/timesheet/task'

export const TaskFactory = (): JSX.Element => {
  const pbiService = new PbiService(api)
  const taskService = new TaskService(api)
  return <Tasks _taskService={taskService} _pbiService={pbiService} />
}
