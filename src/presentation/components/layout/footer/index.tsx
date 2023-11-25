import Styles from './styles.module.scss'

export const Footer = (): JSX.Element => {
  return (
    <div className={Styles.container}>
      <p>
        Powered by&nbsp;
        <a href="https://www.linkedin.com/in/zangeronimo/" target="_blakn">
          zangeronimo
        </a>
      </p>
    </div>
  )
}
