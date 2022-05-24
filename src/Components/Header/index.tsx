import { useSession } from "next-auth/react";
import { ActiveLink } from "../ActiveLink";
import { Logo } from "../Logo/index";
import { MenuSection } from "../Menu/MenuSection";
import { SignInButton } from "../SignInButton";
import { UserInfo } from "../UserInfo";

import styles from "./styles.module.scss";

export function Header() {
  const { data: session } = useSession()

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Logo />

        <nav>
          <ActiveLink activeClass={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClass={styles.active} href="/posts">
            <a>Animes</a>
          </ActiveLink>
        </nav>

        <MenuSection />

        <UserInfo />

        <SignInButton />
      </div>
    </header>
  );
}
