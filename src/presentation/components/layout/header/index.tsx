import { useAuth } from '@/presentation/hooks/useAuth'
import { Button } from '../../form/button'

import Styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { Logo } from '../logo'
import { Breadcrumbs } from './breadcrumb'
import { routesArray } from '@/presentation/router/routesArray'

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
      <Button label="Sair" onClick={logout} />
    </div>
  )
}
