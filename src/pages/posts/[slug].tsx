import Link from 'next/link'

import styles from './post.module.scss'

export default function Post() {
  return (
    <div className={styles.postContainer} >
      <img 
        src="https://i.pinimg.com/564x/a6/5c/3a/a65c3a387305850479770f3c75ec61f3.jpg"
        alt="anime banner"
      />

      <main className={styles.hero} >
        <h1>One Piece</h1>

        <section className={styles.animeInfo} >
          <h3>Sinopse</h3>
          <p>
          Era uma vez um grande pirata, conhecido como o maior pirata de todos os tempos, Gol D. Roger. Ele conseguiu fama, poder, dinheiro. Só que um dia ele foi capturado pelas forças da Marinha. Antes de ser executado ele disse “Vocês querem meu tesouro? Tudo bem. Meu maior tesouro, One Piece, está no final da Grande Linha”. Assim começou a Era dos Piratas. Todo mundo se dirige para a Grande Linha, pois diz a lenda que quem conseguir o One Piece será o maior pirata de todos os tempos. 
          </p>

          <h3>Staff</h3>
          <ul>
            <li><strong>Diretor: </strong>Nobody</li>
            <li><strong>Design: </strong>Nobody</li>
            <li><strong>Estúdio: </strong>MAPA</li>
          </ul>
        </section>

        <div className={styles.content} >
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo molestias accusamus impedit magnam molestiae ut sint aspernatur consequuntur incidunt amet qui earum officia, reprehenderit, architecto libero voluptas officiis natus alias.
          </p>
        </div>
      </main>

      <Link href="/posts" >
        <a>Voltar</a>
      </Link>
    </div>
  )
}