import { FcGoogle } from 'react-icons/fc'
import { FiX } from 'react-icons/fi'
import { Logo } from '../Logo/index'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
    const isUserLoggedIn = true

    return (
        <header className={styles.headerContainer} >
            <div className={styles.headerContent} >
                <Logo />

                <nav>
                    <a href="#" className={styles.active} >Home</a>
                    <a href="#">Animes</a>
                </nav>

                { isUserLoggedIn && <SignInButton /> }
                
            </div>
        </header>
    )
}