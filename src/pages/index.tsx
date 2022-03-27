import { SignInButton } from '../Components/SignInButton'
import styles from './home.module.scss'

export default function Home() {
  const isUserLoggedIn = false

  return (
    <div className={styles.homeContainer} >
      <main className={styles.hero} >
        <h1>My <span>Top 10</span> Animes</h1>

        { !isUserLoggedIn && (
          <>
            <p>
              Sign in to see the list
            </p>

            <SignInButton />
          </>
        ) }
      </main>
    </div>
  )
}
