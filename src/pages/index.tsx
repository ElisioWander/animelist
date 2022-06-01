import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { SignInButton } from '../Components/SignInButton'
import styles from './home.module.scss'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className={styles.homeContainer} >
      <main className={styles.hero} >
        { !session && (
          <p>
            Faça logIn e tenha acesso <br/> a <span>todo nosso conteúdo</span> 
          </p>
        ) }

        { session && (
          <div>Olá, <span>{session.user.name}</span>! Seja bem vindo! 🤗</div>
        ) }

        <h1>
          Noticias <br/> atualizadas <br/> sobre <br/> o <span>universo dos <br/> animes</span>
        </h1>

        <Link href="/posts" >
          <a>News</a>
        </Link>

        {!session && (
          <SignInButton />
        )}
      </main>
    </div>
  )
}
