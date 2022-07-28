import { FiX } from 'react-icons/fi'
import { useModal } from '../../Context/ModalContext'
import ReactModal from 'react-modal'

import styles from './styles.module.scss'

interface SignInModalProps {
  youtubeVideo: string
}

export function VideoModal({ youtubeVideo }: SignInModalProps) {
  const { openModal, handleCloseModal } = useModal()

  return (
    <ReactModal
      isOpen={openModal}
      onRequestClose={handleCloseModal}
      overlayClassName={styles.reactModalOverlay}
      className={styles.reactModalContent}
    >
      <div className={styles.videoCard}>
        <FiX onClick={handleCloseModal} />
        <iframe
          src={`https://youtube.com/embed/${youtubeVideo}`}
          frameBorder="0"
        />
      </div>
    </ReactModal>
  )
}
