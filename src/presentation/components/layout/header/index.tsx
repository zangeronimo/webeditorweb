import { useAuth } from '@/presentation/hooks/useAuth'
import { Button } from '../../form/button'

import Styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const Header = (): JSX.Element => {
  const { logout } = useAuth()
  return (
    <div className={Styles.container}>
      <div>
        <Link to="/" title="Go to home">
          WEBEditor
        </Link>
      </div>
      <Button label="Sair" onClick={logout} />
    </div>
  )
}
