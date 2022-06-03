import { SetStateAction } from "react";
import { SignInButton } from "../SignInButton";
import { FiX } from "react-icons/fi";
import { FcGoogle } from 'react-icons/fc'

import ReactModal from "react-modal";

import styles from "./modal-styles.module.scss"

interface ModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>
}

export function Modal({ modalIsOpen, setModalIsOpen }: ModalProps) {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      overlayClassName={styles.reactModalOverlay}
      className={styles.reactModalContent}
    >
      <div className={styles.signInContent}>
        <FiX fontSize={24} onClick={() => setModalIsOpen(false)} />

        <span>
          Faça login para <br /> acessar o conteúdo
        </span>
        <div className={styles.traditionalSignInContent}>
          <label htmlFor="email">E-mail</label>
          <input type="email" />
          <label htmlFor="password">Password</label>
          <input type="password" />

          <button type="submit">Entrar</button>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.socialSignInContent}>
          <label><FcGoogle fontSize={24} />With Google</label>
          <SignInButton />
        </div>
      </div>
    </ReactModal>
  );
}
