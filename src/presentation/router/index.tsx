import { LoginFactory } from '@/application/factory/system/login'
import { Route, Routes, type RouteObject } from 'react-router-dom'
import { PageNotFound } from '../pages/system/_404'
import { AuthenticatedUrl } from './authenticatedUrl'
import { type RoutePathDefinition } from './matchRouterDefinitions'
import { routesArray } from './routesArray'
import { validateRoutes } from './validateRoutes'

export const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/auth" element={<LoginFactory />} />
      {routesArray?.map(route => {
        if (!route.children) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={validateRoutes({ route })}
            />
          )
        } else {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={validateRoutes({ route })}
            >
              {route.children.map(
                (child: RouteObject & RoutePathDefinition) => (
                  <Route
                    key={child.path}
                    path={child.path}
                    element={validateRoutes({ route: child })}
                  />
                ),
              )}
            </Route>
          )
        }
      })}
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
