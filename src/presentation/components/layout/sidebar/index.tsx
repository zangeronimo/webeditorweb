import { Link } from 'react-router-dom'
import Styles from './styles.module.scss'
import { useState } from 'react'

export const Sidebar = (): JSX.Element => {
  const [state, setState] = useState({
    opened: '',
  })
  const openMenu = (key: string): void => {
    const opened = state.opened === key ? '' : key
    setState(old => ({ ...old, opened }))
  }

  return (
    <div className={Styles.container}>
      <ul>
        <li>
          <Link to="/" title="Dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <span
            onClick={() => {
              openMenu('recipe')
            }}
          >
            Recipes
            {state.opened === 'recipe' && (
              <ul className={Styles.sub}>
                <li>
                  <Link to="/recipe/rate" title="Rates">
                    Rates
                  </Link>
                </li>
                <li>
                  <Link to="/recipe/category" title="Categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/recipe/level" title="Levels">
                    Levels
                  </Link>
                </li>
                <li>
                  <Link to="/recipe/recipe" title="Recipes">
                    Recipes
                  </Link>
                </li>
              </ul>
            )}
          </span>
        </li>
        <li>
          <span
            onClick={() => {
              openMenu('marketing')
            }}
          >
            Marketing
            {state.opened === 'marketing' && (
              <ul className={Styles.sub}>
                <li>
                  <Link to="/marketing/category" title="Categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/marketing/product" title="Products">
                    Products
                  </Link>
                </li>
              </ul>
            )}
          </span>
        </li>
        <li>
          <span
            onClick={() => {
              openMenu('institutional')
            }}
          >
            Institutional
            {state.opened === 'institutional' && (
              <ul className={Styles.sub}>
                <li>
                  <Link to="/institutional/page" title="Pages">
                    Pages
                  </Link>
                </li>
              </ul>
            )}
          </span>
        </li>
        <li>
          <span
            onClick={() => {
              openMenu('webeditor')
            }}
          >
            WEBEditor
            {state.opened === 'webeditor' && (
              <ul className={Styles.sub}>
                <li>
                  <Link to="/webeditor/user" title="Users">
                    Users
                  </Link>
                </li>
              </ul>
            )}
          </span>
        </li>
        <li>
          <span
            onClick={() => {
              openMenu('administrator')
            }}
          >
            Administrator
            {state.opened === 'administrator' && (
              <ul className={Styles.sub}>
                <li>
                  <Link to="/administrator/company" title="Companies">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/administrator/module" title="Modules">
                    Modules
                  </Link>
                </li>
                <li>
                  <Link to="/administrator/role" title="Roles">
                    Roles
                  </Link>
                </li>
              </ul>
            )}
          </span>
        </li>
      </ul>
    </div>
  )
}
