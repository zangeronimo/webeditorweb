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
              openMenu('timesheet')
            }}
          >
            <h3>TimeSheet</h3>
            {state.opened === 'timesheet' && (
              <ul className={Styles.sub}>
                <li>
                  <Link to="/timesheet/board" title="Board">
                    Board
                  </Link>
                </li>
                <li>
                  <Link to="/timesheet/clients" title="Clients">
                    Clients
                  </Link>
                </li>
                <li>
                  <Link to="/timesheet/projects" title="Projects">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/timesheet/epics" title="Epics">
                    Epics
                  </Link>
                </li>
                <li>
                  <Link to="/timesheet/pbistatus" title="Pbi Status">
                    Pbi Status
                  </Link>
                </li>
              </ul>
            )}
          </span>
        </li>
        <li>
          <span
            onClick={() => {
              openMenu('culinary')
            }}
          >
            <h3>Culinary</h3>
            {state.opened === 'culinary' && (
              <ul className={Styles.sub}>
                <li>
                  <Link to="/culinary/levels" title="Levels">
                    Levels
                  </Link>
                </li>
                <li>
                  <Link to="/culinary/categories" title="Categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/culinary/recipes" title="Recipes">
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link to="/culinary/ratings" title="Ratings">
                    Ratings
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
            <h3>Institutional</h3>
            {state.opened === 'institutional' && (
              <ul className={Styles.sub}>
                <li>
                  <Link to="/institutional/newsletter" title="Newsletters">
                    Newsletters
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
            <h3>WEBEditor</h3>
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
            <h3>Administrator</h3>
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
