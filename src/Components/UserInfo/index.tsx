import { useSession } from "next-auth/react";
import { SignInButton } from "../SignInButton";
import { FaUserCircle } from 'react-icons/fa'

import styles from "./styles.module.scss";

export function UserInfo() {
  const { data: session } = useSession();

  return session ? (
    <div className={styles.userInfoContainer}>
      <span>{session.user.name}</span>
      <div className={styles.userProfilePhoto}>
        <img src={session.user.image} alt="foto de perfil" />
      </div>

      <SignInButton />
    </div>
  ) : (
    <div className={styles.userInfoContainer} >
      <div className={styles.signInSession} >
        <FaUserCircle />
        <SignInButton />
      </div>
    </div>
  );
}
