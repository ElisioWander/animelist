import { useSidebar } from '../../Context/SidebarContext'
import { SidebarNav } from './SidebarNav'
import { SidebarNavItem } from './SidebarNavItem'
import ReactModal from 'react-modal'

import styles from './styles.module.scss'

export function Sidebar() {
  const { handleOpenSidebar, isSidebarOpen } = useSidebar()

  return (
    <ReactModal
      isOpen={isSidebarOpen}
      onRequestClose={handleOpenSidebar}
      overlayClassName={styles.reactModalOverlay}
      className={styles.reactModalContent}
      ariaHideApp={false}
    >
      <SidebarNav>
        <SidebarNavItem url="/" title="Home" />
        <SidebarNavItem url="/posts" title="Blog" />
        <SidebarNavItem url="/posts/anime-list" title="Animes" />
      </SidebarNav>
    </ReactModal>
  )
}
