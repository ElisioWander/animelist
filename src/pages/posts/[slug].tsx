import { GetServerSideProps } from 'next'
import { prismicClient } from '../../services/prismic'
import { getSession } from 'next-auth/react'
import { format } from 'date-fns'

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
  video: string;
  date: string;
}

interface PostProps {
  post: Post
}

export default function Post({ post }: PostProps) {
  const contentText = post.content + post.sinopse
  const wordCount = contentText.split(" ").length

  const readTime = Math.ceil(wordCount / 200)

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

        <time>
          <span>{`${readTime} min`} de leitura</span>
          <span>{post.date}</span>
        </time>

        <section className={styles.animeInfo} >
          { post.sinopse && (
            <>
              <h3>Sinopse</h3>
              <p>{post.sinopse}</p>
            </>
          ) }

          {post.staff.director && (
            <>
              <h3>Staff</h3>
              <ul>
                <li><strong>Diretor: </strong><span>{post.staff.director}</span></li>
                <li><strong>Design: </strong><span>{post.staff.design}</span></li>
                <li><strong>Estúdio: </strong><span>{post.staff.studio}</span></li>
              </ul>
            </>
          )}
          
        </section>

        <div className={styles.content} >
          <h3>Mais sobre</h3>
          <p>{post.content}</p>

          {post.video && (
            <div className={styles.iframeContainer} >
              <iframe
                src={post.video}
                frameBorder="0"
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const session = await getSession({req})

  const { slug } = params

  const response = await prismicClient.getByUID("post", String(slug))

  console.log(response)

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
    content: prismicH.asText(response.data.content),
    video: response.data?.video.url || null,
    date: format(new Date(response.first_publication_date), 'dd / MM / yyy')
  }


  //redirecionar para a página de fazer login caso a pessoa não esteja logada
  if(!session) {
    return {
      redirect: {
        destination: `/posts`,
        permanent: false
      }
    }
  }

  return {
    props: { post }
  }
}