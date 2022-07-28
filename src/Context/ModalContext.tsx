import { createContext, ReactNode, useContext, useState } from 'react'

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
