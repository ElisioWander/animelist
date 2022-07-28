import ReactModal from 'react-modal'
import { useModal } from '../../Context/ModalContext'
import { SidebarNav } from './SidebarNav'
import { SidebarNavItem } from './SidebarNavItem'

import styles from './styles.module.scss'

export function Sidebar() {
  const { handleCloseModal, openModal } = useModal()

  return (
    <ReactModal
      isOpen={openModal}
      onRequestClose={handleCloseModal}
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