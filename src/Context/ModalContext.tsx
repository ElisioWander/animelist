import { useRouter } from 'next/router'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type ModalContextData = {
  openModal: boolean
  handleOpenModal: () => void
  handleCloseModal: () => void
}

interface ModalProviderProps {
  children: ReactNode
}

const ModalContext = createContext({} as ModalContextData)

export function ModalProvider({ children }: ModalProviderProps) {
  const [openModal, setOpenModal] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setOpenModal(false)
  }, [router.asPath])

  function handleOpenModal() {
    const modalIsOpen = !openModal
    setOpenModal(modalIsOpen)
  }

  function handleCloseModal() {
    setOpenModal(false)
  }

  return (
    <ModalContext.Provider
      value={{ handleOpenModal, handleCloseModal, openModal }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
