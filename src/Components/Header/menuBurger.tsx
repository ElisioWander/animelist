import { useSidebar } from '../../Context/SidebarContext'

import styles from './stylesMenuBurger.module.scss'

export function MenuBurger() {
  const { handleOpenSidebar, isSidebarOpen } = useSidebar()

  return (
    <div
      className={`${styles.menuBurgerContainer} ${
        isSidebarOpen ? styles.active : styles.menuBurgerContainer
      }`}
      onClick={handleOpenSidebar}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}
