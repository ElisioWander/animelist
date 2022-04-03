import { useSession } from 'next-auth/react'
import Link from 'next/link'
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
          Tem dúvidas sobre quais animes assistir? <br />
          Aqui tem algumas sugestões para você
        </p>

        <Link href="/animes" >
          <a>Ir para a lista</a>
        </Link>
      </main>
    </div>
  )
}
