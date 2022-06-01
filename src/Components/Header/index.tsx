import { useSession } from "next-auth/react";
import { useMenuToggle } from "../../Context/menuContext";
import { ActiveLink } from "../ActiveLink";
import { Logo } from "../Logo/index";
import { SignInButton } from "../SignInButton";
import { UserInfo } from "../UserInfo";

import styles from "./styles.module.scss";

export function Header() {
  const { data: session } = useSession();

  const { activeMenu, handleOpenMenuToggle } = useMenuToggle()

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Logo />

        <div className={`${styles.menuSection} ${activeMenu ? styles.on : ""}`}>
          <div className={styles.openMenuToggle} onClick={handleOpenMenuToggle}>
            <div></div>
            <div></div>
          </div>
          <nav className={`${styles.menuNav} ${styles.on}`}>
            <ul>
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
              <li>
                <ActiveLink activeClass={styles.active} href="/animesRate">
                  <a>Melhores</a>
                </ActiveLink>
              </li>
            </ul>

            <SignInButton />
          </nav>
        </div>

        <UserInfo />
      </div>
    </header>
  );
}
