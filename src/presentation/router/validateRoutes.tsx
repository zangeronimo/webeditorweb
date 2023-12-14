import { type ReactNode } from 'react'
import { AuthenticatedUrl } from './authenticatedUrl'
import { type RoutePathDefinition } from './matchRouterDefinitions'

type Props = {
  route: RoutePathDefinition
}

export const validateRoutes = ({ route }: Props): ReactNode => {
  return route.private ? (
    <AuthenticatedUrl>{route.element}</AuthenticatedUrl>
  ) : (
    route.element
  )
}
