import Link from "next/link";
import { ActiveLink } from "../ActiveLink";
import { Logo } from "../Logo/index";
import { SignInButton } from "../SignInButton";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Logo />

        <nav>
          <ActiveLink activeClass={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink  activeClass={styles.active} href="/posts">
            <a>Animes</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
