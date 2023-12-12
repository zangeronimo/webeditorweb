import { useAuth } from '@/presentation/hooks/useAuth'
import { Button } from '../../form/button'

import Styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { Logo } from '../logo'

export const Header = (): JSX.Element => {
  const { logout } = useAuth()
  return (
    <div className={Styles.container}>
      <div>
        <Link to="/" title="Go to home">
          <Logo />
        </Link>
      </div>
      <Button label="Sair" onClick={logout} />
    </div>
  )
}
