import { type ReactNode } from 'react'

import Styles from './styles.module.scss'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { Footer } from './footer'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className={Styles.container}>
      <header className={Styles.header}>
        <Header />
      </header>
      <nav className={Styles.sidebar}>
        <Sidebar />
      </nav>
      <div className={Styles.content}>{children}</div>
      <footer className={Styles.footer}>
        <Footer />
      </footer>
    </div>
  )
}
