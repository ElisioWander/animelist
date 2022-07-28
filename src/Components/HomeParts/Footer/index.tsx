import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { SocialMedia } from '../../SocialMedia'
import styles from './styles.module.scss'

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <section className={styles.footerContact}>
          <SocialMedia
            url="https://www.linkedin.com/in/elisio-wander-b88b69136/"
            icon={<FaLinkedin />}
          />
          <SocialMedia
            url="https://github.com/ElisioWander"
            icon={<FaGithub />}
          />
          <SocialMedia
            url="https://api.whatsapp.com/send?phone=5532999924818"
            icon={<FaWhatsapp />}
          />
          <SocialMedia
            url="https://www.instagram.com/elisio_wander/"
            icon={<FaInstagram />}
          />
        </section>
        <span>
          This is a non-commercial website and was made for the porpose of study
          <br />
          <strong>@copyright - Elisio Wander</strong>
          <br />
          <span>
            This site uses
            <a href="https://jikan.moe/" target="_blank" rel="noreferrer">
              Jinkan
            </a>
            free API
          </span>
        </span>
      </div>
    </footer>
  )
}
