import { type PathMatch, matchPath, type RouteObject } from 'react-router-dom'

const skipPaths = ['/', '*']

export type RoutePathDefinition = RouteObject & {
  title: string
  nav?: boolean
  children?: RoutePathDefinition[]
  path: string
  private?: boolean
  noLink?: boolean
}

export type ActiveRoutePath = {
  title: string
  match: PathMatch<string>
  definition: RoutePathDefinition
}

export const MatchRouterDefinitions = (
  definitions: RoutePathDefinition[],
): ActiveRoutePath[] => {
  const crumbs: ActiveRoutePath[] = []

  definitions.forEach(definition => {
    const match = matchPath(
      { path: definition.path, end: false },
      location.pathname,
    )
    if (match && !skipPaths.includes(definition.path)) {
      crumbs.push({ title: definition.title, match, definition })
      if (definition.children) {
        const nestedMatches = MatchRouterDefinitions(definition.children)
        if (nestedMatches) {
          crumbs.push(...nestedMatches)
        }
      }
    }
  })

  return crumbs
}
