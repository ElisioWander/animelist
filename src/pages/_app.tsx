import { AppProps } from 'next/app'
import { Header } from '../Components/Header'
import { SessionProvider } from 'next-auth/react'

import '../styles/global.scss'
import { MenuContextProvider } from '../Context/menuContext'
import { SearchBox } from '../Components/Form/SearchBox'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} >
      <MenuContextProvider>
        <Header />
        <Component {...pageProps} />
      </MenuContextProvider>
    </SessionProvider>
  )
}

export default MyApp
