import { FaGoogle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";

import styles from "./styles.module.scss";

export function SignInButton() {
  const { data: session } = useSession();


  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGoogle color="#13C4A3" />
      Elisio Wander
      <FiX color="#000000" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('google')}
    >
      <FaGoogle color="#EBA417" />
      Sign In with Google
    </button>
  );
}
