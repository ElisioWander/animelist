import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";

import styles from "./styles.module.scss";
import { UserInfo } from "../UserInfo";

export function SignInButton() {
  const { data: session } = useSession();


  return session ? (
    <>
      <button
        type="button"
        className={styles.signOutButton}
        onClick={() => signOut()}
      >
        <FaSignOutAlt color="#13C4A3" fontSize={20} />
      </button>
    </>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('google')}
    >
      <FaSignInAlt color="#EBA417" />
      Sign In
    </button>
  );
}
