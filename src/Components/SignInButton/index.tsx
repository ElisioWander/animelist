import { FaSignInAlt, FaPowerOff } from 'react-icons/fa'
import { useSession, signIn, signOut } from 'next-auth/react'

import styles from './styles.module.scss'

export function SignInButton() {
  const { data: session } = useSession()

  return session ? (
    <button
      type="button"
      className={styles.signOutButton}
      onClick={() => signOut()}
    >
      <FaPowerOff color="#EBA417" />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('google')}
    >
      <FaSignInAlt color="#13C4A3" />
      Sign In
    </button>
  )
}
