import { AppProps } from 'next/app'
import { Header } from '../Components/Header'
import { SessionProvider } from 'next-auth/react'
import { PrismicProvider } from '@prismicio/react'
import { prismicClient } from '../services/prismic'
import { ModalProvider } from '../Context/ModalContext'
import { Sidebar } from '../Components/Sidebar'
import { SidebarProvider } from '../Context/SidebarContext'

import '../styles/global.scss'
import { Footer } from '../Components/Footer'

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
