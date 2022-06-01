import { SetStateAction } from "react";
import { SignInButton } from "../SignInButton";
import { FiX } from "react-icons/fi";
import ReactModal from "react-modal";

import modalStyles from "./modal-styles.module.scss"

interface ModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>
}

export function Modal({ modalIsOpen, setModalIsOpen }: ModalProps) {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      overlayClassName={modalStyles.reactModalOverlay}
      className={modalStyles.reactModalContent}
    >
      <div className={modalStyles.signInContent}>
        <FiX fontSize={24} onClick={() => setModalIsOpen(false)} />

        <span>
          Faça login para <br /> acessar o conteúdo
        </span>
        <div className={modalStyles.traditionalSignInContent}>
          <label htmlFor="email">E-mail</label>
          <input type="email" />
          <label htmlFor="password">Password</label>
          <input type="password" />

          <button type="submit">Entrar</button>
        </div>

        <span>Ou</span>

        <div className={modalStyles.socialSignInContent}>
          <label>Sign In With Google</label>
          <SignInButton />
        </div>
      </div>
    </ReactModal>
  );
}
