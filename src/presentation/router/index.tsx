import { LoginFactory } from '@/application/factory/system/login'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/system/dashboard'
import { AuthenticatedUrl } from './authenticatedUrl'
import { PageNotFound } from '../pages/system/_404'
import { RoleFactory } from '@/application/factory/system/role'
import { ModuleFactory } from '@/application/factory/system/module'
import { CompanyFactory } from '@/application/factory/system/company'
import { UserFactory } from '@/application/factory/webeditor/user'
import { ClientFactory } from '@/application/factory/timesheet/client'
import { ProjectFactory } from '@/application/factory/timesheet/project'
import { EpicFactory } from '@/application/factory/timesheet/epic'
import { PbiFactory } from '@/application/factory/timesheet/pbi'
import { TaskFactory } from '@/application/factory/timesheet/task'

const routes = [
  { path: '/', element: <Dashboard />, private: true },
  { path: '/webeditor/user', element: <UserFactory />, private: true },
  { path: '/administrator/role', element: <RoleFactory />, private: true },
  { path: '/administrator/module', element: <ModuleFactory />, private: true },
  {
    path: '/administrator/company',
    element: <CompanyFactory />,
    private: true,
  },
  {
    path: '/timesheet/clients',
    element: <ClientFactory />,
    private: true,
  },
  {
    path: '/timesheet/projects',
    element: <ProjectFactory />,
    private: true,
  },
  {
    path: '/timesheet/epics',
    element: <EpicFactory />,
    private: true,
  },
  {
    path: '/timesheet/pbis',
    element: <PbiFactory />,
    private: true,
  },
  {
    path: '/timesheet/tasks',
    element: <TaskFactory />,
    private: true,
  },
]

export const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/auth" element={<LoginFactory />} />
      {routes?.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.private ? (
              <AuthenticatedUrl>{route.element}</AuthenticatedUrl>
            ) : (
              route.element
            )
          }
        />
      ))}
      <Route
        path="*"
        element={
          <AuthenticatedUrl>
            <PageNotFound />
          </AuthenticatedUrl>
        }
      />
    </Routes>
  )
}
