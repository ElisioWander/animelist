import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { SignInButton } from '../Components/SignInButton'
import styles from './home.module.scss'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className={styles.homeContainer} >
      <main className={styles.hero} >
        { session && (
          <div>Olá, <span>{session.user.name}</span>! Seja bem vindo! 🤗</div>
        ) }

        <h1>
          Noticias atualizadas sobre o <span>universo dos animes</span>
        </h1>

        {/* <p>
          Aqui tem algumas sugestões para você ⬇️
        </p> */}

        <Link href="/posts" >
          <a>News</a>
        </Link>

        {!session && (
          <SignInButton />
        )}
      </main>

      <img src="/images/background-home-girl-2.png" alt="background-girl-home" />
    </div>
  )
}
