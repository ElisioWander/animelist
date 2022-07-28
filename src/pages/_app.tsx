import { AppProps } from 'next/app'
import { Header } from '../Components/Header'
import { SessionProvider } from 'next-auth/react'
import { PrismicProvider } from '@prismicio/react'
import { prismicClient } from '../services/prismic'
import { Footer } from '../Components/HomeParts/Footer'
import { ModalProvider } from '../Context/ModalContext'
import { Sidebar } from '../Components/Sidebar'

import '../styles/global.scss'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <PrismicProvider client={prismicClient}>
      <SessionProvider session={session}>
        <ModalProvider>
          <Header />
          <Sidebar />
          <Component {...pageProps} />
          <Footer />
        </ModalProvider>
      </SessionProvider>
    </PrismicProvider>
  )
}
export default MyApp
