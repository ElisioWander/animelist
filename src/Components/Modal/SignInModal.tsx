import { SetStateAction } from "react";
import { SignInButton } from "../SignInButton";
import { FiX } from "react-icons/fi";
import { FcGoogle } from 'react-icons/fc'

import ReactModal from "react-modal";

import styles from "./signInModalStyles.module.scss"
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Logo } from "../Logo";

interface SignInModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>
}


export function SignInModal({ modalIsOpen, setModalIsOpen }: SignInModalProps) {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      ariaHideApp={false}
      overlayClassName={styles.reactModalOverlay}
      className={styles.reactModalContent}
    >
      <div className={styles.signInContent}>
        <FiX fontSize={24} onClick={() => setModalIsOpen(false)} />

        <span>
          Anime<span>.</span>List
        </span>
        <div className={styles.traditionalSignInContent}>
          <label htmlFor="email">E-mail</label>
          <input placeholder="john_doe@exemplo.com" type="email" />
          <label htmlFor="password">Password</label>
          <input placeholder="your password" type="password" />

          <button type="submit">Entrar</button>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.socialSignInContent}>
          <label><FcGoogle fontSize={24} />
          Sign in with Google
          <SignInButton />
          </label>
        </div>
      </div>
    </ReactModal>
  );
}

export const getServerSideProps: GetServerSideProps = async (req) => {

  return {
    props: {}
  }
}
