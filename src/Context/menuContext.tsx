import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface MenuContextProviderProps {
  children: ReactNode;
}

type MenuContextProviderData = {
  activeMenu: boolean;
  handleOpenMenuToggle: () => void;
};

const MenuContext = createContext({} as MenuContextProviderData);

export function MenuContextProvider({ children }: MenuContextProviderProps) {
  //fazendo o menu toggle
  const [activeMenu, setActiveMenu] = useState(false);

  const router = useRouter();

  //verificando se o estado é "false" ou "true", caso seja false, vai para true
  //caso seja true, vai para false
  useEffect(() => {
    setActiveMenu(false);
    //verificando se após a navegação utilizando o menuToggle o overflow foi passado para initial,
    //caso não tenha, então vai ser estabelecido o valor "hidden"
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "initial"
    }
  }, [router.asPath]);

  //função para abrir o menu
  function handleOpenMenuToggle() {
    !activeMenu;

    document.body.style.overflow = !activeMenu ? "hidden" : "initial";

    setActiveMenu(!activeMenu);
  }

  return (
    <MenuContext.Provider value={{ activeMenu, handleOpenMenuToggle }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenuToggle = () => useContext(MenuContext);
