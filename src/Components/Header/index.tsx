import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { Logo } from '../Logo/index'
import { SignInButton } from '../SignInButton'


import styles from './styles.module.scss'

export function Header() {
    const { data: session } = useSession()

    return (
        <header className={styles.headerContainer} >
            <div className={styles.headerContent} >
                <Logo />

                <nav>
                    <Link href="/">
                        <a className={styles.active} >Home</a>
                    </Link>
                    <Link href="/animes" >
                        <a >Animes</a>
                    </Link>
                </nav>

                { session && <SignInButton /> }
                
            </div>
        </header>
    )
}