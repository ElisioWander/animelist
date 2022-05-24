import { GetServerSideProps } from 'next'
import { prismicClient } from '../../services/prismic'

import Link from 'next/link'
import * as prismicH from '@prismicio/helpers'

import styles from './post.module.scss' 

type Post = {
  slug: string;
  banner: string;
  title: string;
  sinopse: string;
  staff: {
    director: string;
    design: string;
    studio: string
  };
  content: string;
}

interface PostProps {
  post: Post
}

export default function Post({ post }: PostProps) {
  return (
    <div className={styles.postContainer} >
      <div className={styles.banner} >
        <img 
          src={post.banner}
          alt="anime banner"
        />
      </div>

      <main className={styles.hero} >
        <h1>{post.title}</h1>

        <section className={styles.animeInfo} >
          <h3>Sinopse</h3>
          <p>{post.sinopse}</p>

          {post.staff.director && (
            <>
              <h3>Staff</h3>
              <ul>
                <li><strong>Diretor: </strong>{post.staff.director}</li>
                <li><strong>Design: </strong>{post.staff.design}</li>
                <li><strong>Estúdio: </strong>{post.staff.studio}</li>
              </ul>
            </>
          )}
          
        </section>

        <div className={styles.content} >
          <h3>Mais sobre</h3>
          <p>{post.content}</p>
        </div>
      </main>

      <Link href="/posts" >
        <a>Voltar</a>
      </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params

  const response = await prismicClient.getByUID("post", String(slug))

  const post = {
    slug,
    banner: response.data.banner.url,
    title: prismicH.asText(response.data.title),
    sinopse: prismicH.asText(response.data.sinopse),
    staff: {
      director: prismicH.asText(response.data.director),
      design: prismicH.asText(response.data.design),
      studio: prismicH.asText(response.data.studio)
    },
    content: prismicH.asText(response.data.content)
  }

  return {
    props: { post }
  }
}