import { Logo } from '../Logo/index'
import { UserInfo } from '../UserInfo'
import { Navigation } from './Navigation'
import { NavigationItem } from './NavigationItem'
import { MenuBurger } from './menuBurger'

import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Logo />

        <Navigation>
          <NavigationItem url="/" title="Home" />
          <NavigationItem url="/posts" title="Blog" />
          <NavigationItem url="/posts/anime-list" title="Animes" />
        </Navigation>

        <UserInfo />

        <MenuBurger />
      </div>
    </header>
  )
}
