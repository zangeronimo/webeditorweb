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
            TimeSheet
            {state.opened === 'timesheet' && (
              <ul className={Styles.sub}>
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
                  <Link to="/timesheet/pbis" title="Pbis">
                    Pbis
                  </Link>
                </li>
                <li>
                  <Link to="/timesheet/tasks" title="Tasks">
                    Tasks
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
