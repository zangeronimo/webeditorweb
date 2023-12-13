import Styles from './styles.module.scss'

type Props = {
  size?: 'normal' | 'large'
}

export const Logo = ({ size = 'normal' }: Props): JSX.Element => {
  return (
    <p className={Styles.container} data-size={size}>
      WEB<span>Editor</span>
    </p>
  )
}
