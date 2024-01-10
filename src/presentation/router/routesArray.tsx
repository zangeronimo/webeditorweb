import { CompanyFactory } from '@/application/factory/system/company'
import { ModuleFactory } from '@/application/factory/system/module'
import { RoleFactory } from '@/application/factory/system/role'
import { BoardFactory } from '@/application/factory/timesheet/board'
import { ClientFactory } from '@/application/factory/timesheet/client'
import { EpicFactory } from '@/application/factory/timesheet/epic'
import { PbiStatusFactory } from '@/application/factory/timesheet/pbiStatus'
import { ProjectFactory } from '@/application/factory/timesheet/project'
import { UserFactory } from '@/application/factory/webeditor/user'
import { Dashboard } from '../pages/system/dashboard'
import { type RoutePathDefinition } from './matchRouterDefinitions'
import { LevelFactory } from '@/application/factory/culinary/level'
import { CategoryFactory } from '@/application/factory/culinary/category'
import { RecipeFactory } from '@/application/factory/culinary/recipe'
import { RatingFactory } from '@/application/factory/culinary/rating'
import { NewsletterFactory } from '@/application/factory/institutional/newsletter'

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
    title: 'Board',
    path: '/timesheet/board',
    element: <BoardFactory />,
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
    title: 'PBI Status',
    path: '/timesheet/pbistatus',
    element: <PbiStatusFactory />,
    private: true,
  },
  {
    title: 'Culinary Levels',
    path: '/culinary/levels',
    element: <LevelFactory />,
    private: true,
  },
  {
    title: 'Culinary Categories',
    path: '/culinary/categories',
    element: <CategoryFactory />,
    private: true,
  },
  {
    title: 'Culinary Recipes',
    path: '/culinary/recipes',
    element: <RecipeFactory />,
    private: true,
  },
  {
    title: 'Culinary Rating',
    path: '/culinary/ratings',
    element: <RatingFactory />,
    private: true,
  },
  {
    title: 'Institutional Newsletter',
    path: '/institutional/newsletter',
    element: <NewsletterFactory />,
    private: true,
  },
]
