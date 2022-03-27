import { FaGoogle } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SignInButton() {
    const isUserLoggedIn = true

    return isUserLoggedIn ? (
        <button type="button" className={styles.signInButton} >
            <FaGoogle color="#13C4A3" />
            Elisio Wander
            <FiX color="#000000" className={styles.closeIcon} />
        </button>
    ): (
        <button type="button" className={styles.signInButton} >
            <FaGoogle color="#EBA417" />
            Sign In with Google
        </button>
    )
}