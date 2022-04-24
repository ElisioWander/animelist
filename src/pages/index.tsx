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
          Conheça os <span>melhores animes</span> de todos os tempos
        </h1>

        <p>
          Aqui tem algumas sugestões para você ⬇️
        </p>

        <Link href="/posts" >
          <a>Ir para a lista</a>
        </Link>

        <SignInButton />
      </main>
    </div>
  )
}
