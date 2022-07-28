import { ReactNode } from 'react'

import styles from './stylesSidebarNav.module.scss'

interface SidebarNavProps {
  children: ReactNode
}

export function SidebarNav({ children }: SidebarNavProps) {
  return (
    <nav className={styles.sidebarContainer}>
      <ul>{children}</ul>
    </nav>
  )
}
