import { ReactNode } from 'react'

import styles from './stylesNavigation.module.scss'

interface NavigationProps {
  children: ReactNode
}

export function Navigation({ children }: NavigationProps) {
  return (
    <nav className={styles.navigationContainer}>
      <ul>{children}</ul>
    </nav>
  )
}
