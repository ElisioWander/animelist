import Link from 'next/link'

import styles from './styles.module.scss'

export function Logo() {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <a>
          Anime<span>.</span>List
        </a>
      </Link>
    </div>
  )
}
