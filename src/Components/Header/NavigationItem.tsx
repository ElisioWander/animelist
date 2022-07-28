import { ActiveLink } from '../ActiveLink'

import styles from './stylesNavigationItem.module.scss'

interface NavigationItemProps {
  url: string
  title: string
}

export function NavigationItem({ url, title }: NavigationItemProps) {
  return (
    <li className={styles.navigationItem}>
      <ActiveLink activeClass={styles.active} href={url}>
        <a>{title}</a>
      </ActiveLink>
    </li>
  )
}
