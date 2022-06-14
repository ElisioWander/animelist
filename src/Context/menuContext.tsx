import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface MenuContextProviderProps {
    children: ReactNode;
}

type MenuContextProviderData = {
    activeMenu: boolean;
    handleOpenMenuToggle: () => void;
}

const MenuContext = createContext({} as MenuContextProviderData)

export function MenuContextProvider({ children }: MenuContextProviderProps) {
    const [activeMenu, setActiveMenu] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setActiveMenu(false)
    }, [router.asPath])

    function handleOpenMenuToggle() {
        !activeMenu

        document.body.style.overflow = !activeMenu ? "hidden" : "initial"

        setActiveMenu(!activeMenu)
    }

    return (
        <MenuContext.Provider value={{ activeMenu, handleOpenMenuToggle }}>
            {children}
        </MenuContext.Provider>
    )
}

export const useMenuToggle = () => useContext(MenuContext)