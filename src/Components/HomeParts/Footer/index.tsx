import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import styles from './styles.module.scss'

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <section className={styles.footerContact}>
          <a
            href="https://www.linkedin.com/in/elisio-wander-b88b69136/"
            target="_blank"
          >
            <FaLinkedin />
          </a>
          <a href="https://github.com/ElisioWander" target="_blank">
            <FaGithub />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=5532999924818"
            target="_blank"
          >
            <FaWhatsapp />
          </a>
          <a href="https://www.instagram.com/elisio_wander/" target="_blank">
            <FaInstagram />
          </a>
        </section>
        <span>
          This is a non commercial site and was made with porpose of study
          <br />
          <strong>@copyright - Elisio Wander</strong>
          <br />
          <span>
            This site uses <a href="https://jikan.moe/" target="_blank" >Jinkan</a> free API
          </span>
        </span>
      </div>
    </footer>
  );
}
