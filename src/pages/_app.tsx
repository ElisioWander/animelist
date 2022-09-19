import { AppProps } from 'next/app'
import { Header } from '../Components/Header'
import { SessionProvider } from 'next-auth/react'
import { PrismicProvider } from '@prismicio/react'
import { prismicClient } from '../services/prismic'
import { ModalProvider } from '../Context/ModalContext'
import { Sidebar } from '../Components/Sidebar'
import { SidebarProvider } from '../Context/SidebarContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../services/reactQuery'

import '../styles/global.scss'
import { Footer } from '../Components/Footer'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <PrismicProvider client={prismicClient}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <SidebarProvider>
              <Header />
              <Sidebar />
              <Component {...pageProps} />
              <Footer />
            </SidebarProvider>
          </ModalProvider>
        </QueryClientProvider>
      </SessionProvider>
    </PrismicProvider>
  )
}
export default MyApp
