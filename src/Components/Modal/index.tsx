import { SetStateAction } from "react";
import { FiX } from "react-icons/fi";

import ReactModal from "react-modal";

import styles from "./styles.module.scss"

interface SignInModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>;
  youtubeVideo: string;
}

export function VideoModal({
  modalIsOpen,
  setModalIsOpen,
  youtubeVideo,
}: SignInModalProps) {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      overlayClassName={styles.reactModalOverlay}
      className={styles.reactModalContent}
    >
      <div className={styles.videoCard}>
        <FiX onClick={() => setModalIsOpen(false)} />
        <iframe
          src={`https://youtube.com/embed/${youtubeVideo}`}
          frameBorder="0"
        />
      </div>
    </ReactModal>
  );
}
