import { AppProps } from 'next/app'
import { Header } from '../Components/Header'
import { SessionProvider } from 'next-auth/react'
import { MenuContextProvider } from '../Context/menuContext'
import { PrismicProvider } from '@prismicio/react'
import { prismicClient } from '../services/prismic'

import '../styles/global.scss'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <PrismicProvider client={prismicClient} >
      <SessionProvider session={session} >
        <MenuContextProvider>
          <Header />
          <Component {...pageProps} />
        </MenuContextProvider>
      </SessionProvider>
    </PrismicProvider>
  )
}

export default MyApp
