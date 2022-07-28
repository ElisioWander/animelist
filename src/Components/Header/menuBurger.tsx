import { useModal } from '../../Context/ModalContext'
import styles from './stylesMenuBurger.module.scss'

export function MenuBurger() {
  const { handleOpenModal, openModal } = useModal()

  return (
    <div
      className={`${styles.menuBurgerContainer} ${
        openModal ? styles.active : styles.menuBurgerContainer
      }`}
      onClick={handleOpenModal}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}
