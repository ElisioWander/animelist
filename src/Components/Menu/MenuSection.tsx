import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { ActiveLink } from "../ActiveLink";
import { SignInButton } from "../SignInButton";

import styles from './styles.module.scss'

export function MenuSection() {
  const [activeMenu, setActiveMenu] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setActiveMenu(false)
  }, [router.asPath])

  function handleOpenMenuToggle() {
    const isActive = !activeMenu

    document.body.style.overflow = isActive == true ? "hidden" : "initial"

    setActiveMenu(isActive)
  }

  return (
    <div className={`${styles.menuSection} ${activeMenu ? styles.on : ''}`}>
      <div className={styles.openMenuToggle} onClick={handleOpenMenuToggle} >
        <div></div>
        <div></div>
      </div>
      <nav className={`${styles.menuNav} ${styles.on}`} >
        <ul>
          <li>
            <SignInButton />
          </li>
          <li>
            <ActiveLink activeClass={styles.active} href="/">
              <a>Home</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClass={styles.active} href="/posts">
              <a>Animes</a>
            </ActiveLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}