import { LoginFactory } from '@/application/factory/system/login'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/system/dashboard'
import { AuthenticatedUrl } from './authenticatedUrl'
import { PageNotFound } from '../pages/system/_404'
import { RoleFactory } from '@/application/factory/system/role'
import { ModuleFactory } from '@/application/factory/system/module'
import { CompanyFactory } from '@/application/factory/system/company'
import { UserFactory } from '@/application/factory/webeditor/user'

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
]

export const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/auth" element={<LoginFactory />} />
      {routes.map(route => (
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
