import { AppProps } from 'next/app'
import { Header } from '../Components/Header'
import { SessionProvider } from 'next-auth/react'
import { PrismicProvider } from '@prismicio/react'
import { prismicClient } from '../services/prismic'
import { Footer } from '../Components/HomeParts/Footer'
import { ModalProvider } from '../Context/ModalContext'
import { Sidebar } from '../Components/Sidebar'

import '../styles/global.scss'
import { SidebarProvider } from '../Context/SidebarContext'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <PrismicProvider client={prismicClient}>
      <SessionProvider session={session}>
        <ModalProvider>
          <SidebarProvider>
            <Header />
            <Sidebar />
            <Component {...pageProps} />
            <Footer />
          </SidebarProvider>
        </ModalProvider>
      </SessionProvider>
    </PrismicProvider>
  )
}
export default MyApp
