import { ActiveLink } from '../ActiveLink'

import styles from './stylesSidebarNavItem.module.scss'

interface SidebarNavItemProps {
  url: string
  title: string
}

export function SidebarNavItem({ url, title }: SidebarNavItemProps) {
  return (
    <li className={styles.navigationItem}>
      <ActiveLink activeClass={styles.active} href={url}>
        <a>{title}</a>
      </ActiveLink>
    </li>
  )
}
