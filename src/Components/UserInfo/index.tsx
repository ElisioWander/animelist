import { useSession } from "next-auth/react"

import styles from './styles.module.scss'

export function UserInfo() {
    const { data: session } = useSession()

    return session ? (
        <div className={styles.userInfo} >
            <div className={styles.userProfilePhoto}>
                <img src={session.user.image} alt="foto de perfil" />
            </div>
            <span>{session.user.name}</span>
        </div>
    ): null

}