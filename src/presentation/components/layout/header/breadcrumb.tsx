import {
  MatchRouterDefinitions,
  type ActiveRoutePath,
  type RoutePathDefinition,
} from '@/presentation/router/matchRouterDefinitions'
import { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
  routes: RoutePathDefinition[]
}

export const Breadcrumbs = ({ routes }: Props): JSX.Element => {
  const [activeRoutes, setActiveRoutes] = useState<ActiveRoutePath[]>([])
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setActiveRoutes(MatchRouterDefinitions(routes))
  }, [routes, location.pathname])

  return (
    <ul>
      <li>Sistema</li>
      {activeRoutes.map((active, index, { length }) => (
        <Fragment key={index}>
          {index !== length - 1 && !active?.definition?.noLink ? (
            <li
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(active.match.pathname)
              }}
            >
              {active.title}
            </li>
          ) : (
            <li>{active.title}</li>
          )}
        </Fragment>
      ))}
    </ul>
  )
}
