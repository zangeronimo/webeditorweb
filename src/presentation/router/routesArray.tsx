import { CompanyFactory } from '@/application/factory/system/company'
import { ModuleFactory } from '@/application/factory/system/module'
import { RoleFactory } from '@/application/factory/system/role'
import { ClientFactory } from '@/application/factory/timesheet/client'
import { EpicFactory } from '@/application/factory/timesheet/epic'
import { PbiFactory } from '@/application/factory/timesheet/pbi'
import { ProjectFactory } from '@/application/factory/timesheet/project'
import { TaskFactory } from '@/application/factory/timesheet/task'
import { UserFactory } from '@/application/factory/webeditor/user'
import { Dashboard } from '../pages/system/dashboard'
import { type RoutePathDefinition } from './matchRouterDefinitions'

export const routesArray: RoutePathDefinition[] = [
  { title: 'Dashboard', path: '/', element: <Dashboard />, private: true },
  {
    title: 'User',
    path: '/webeditor/user',
    element: <UserFactory />,
    private: true,
  },
  {
    title: 'Role',
    path: '/administrator/role',
    element: <RoleFactory />,
    private: true,
  },
  {
    title: 'Module',
    path: '/administrator/module',
    element: <ModuleFactory />,
    private: true,
  },
  {
    title: 'Company',
    path: '/administrator/company',
    element: <CompanyFactory />,
    private: true,
  },
  {
    title: 'Clients',
    path: '/timesheet/clients',
    element: <ClientFactory />,
    private: true,
  },
  {
    title: 'Projects',
    path: '/timesheet/projects',
    element: <ProjectFactory />,
    private: true,
  },
  {
    title: 'Epics',
    path: '/timesheet/epics',
    element: <EpicFactory />,
    private: true,
  },
  {
    title: 'PBIs',
    path: '/timesheet/pbis',
    element: <PbiFactory />,
    private: true,
  },
  {
    title: 'Tasks',
    path: '/timesheet/tasks',
    element: <TaskFactory />,
    private: true,
  },
]
