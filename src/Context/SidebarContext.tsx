import { useRouter } from 'next/router'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type SidebarContextData = {
  isSidebarOpen: boolean
  handleOpenSidebar: () => void
}

interface SidebarProviderProps {
  children: ReactNode
}

const SidebarContext = createContext({} as SidebarContextData)

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setIsSidebarOpen(false)
  }, [router.asPath])

  function handleOpenSidebar() {
    const openSidebar = !isSidebarOpen
    setIsSidebarOpen(openSidebar)
  }

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, handleOpenSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
