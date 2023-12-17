import { useAuth } from '@/presentation/hooks/useAuth'
import { routesArray } from '@/presentation/router/routesArray'
import { Link } from 'react-router-dom'
import { Button } from '../../form'
import { Logo } from '../logo'
import { Breadcrumbs } from './breadcrumb'

import Styles from './styles.module.scss'

export const Header = (): JSX.Element => {
  const { logout } = useAuth()
  return (
    <div className={Styles.container}>
      <div className={Styles.left}>
        <Link to="/" title="Go to home">
          <Logo />
        </Link>
        <div className={Styles.breadcrumb}>
          <Breadcrumbs routes={routesArray} />
        </div>
      </div>
      <Button label="Sair" pattern="danger" onClick={logout} />
    </div>
  )
}
