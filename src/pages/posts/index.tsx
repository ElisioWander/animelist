import { prismicClient } from '../../services/prismic'
import { useEffect, useState } from 'react'
import { Pagination } from '../../Components/Pagination'
import { Spinner } from '../../Components/Spinner/Index'
import { format } from 'date-fns'

import * as prismicH from '@prismicio/helpers'
import Link from 'next/link'

import styles from './posts.module.scss'
import Head from 'next/head'

type Post = {
  slug: string
  banner: string
  title: string
  publicationDate: string
  content: string
  sinopse: string
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(1)

  async function getAllPosts() {
    const perPage = 6

    const response = await prismicClient.getAllByType('post')

    const total = response.length
    setTotal(total)

    const pageStart = (Number(page) - 1) * Number(perPage)
    const pageEnd = pageStart + Number(perPage)

    const allPosts = response.map((post) => {
      return {
        slug: post.uid,
        banner: post.data.banner.url,
        title: prismicH.asText(post.data.title),
        publicationDate: format(
          new Date(post.first_publication_date),
          'dd / MM / yyy',
        ),
        content: prismicH.asText(post.data.content),
        sinopse: prismicH.asText(post.data.sinopse),
        summary:
          post.data.sinopse.find((sinopse) => sinopse.type === 'paragraph')
            ?.text ?? '',
      }
    })

    const posts = allPosts.slice(pageStart, pageEnd)

    setPosts(posts)

    setIsLoading(false)
  }

  useEffect(() => {
    getAllPosts()
  }, [page])

  if (!posts || isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Head>
        <title>Anime.List | Blog</title>
      </Head>

      <main className={styles.postsCard}>
        {posts?.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug}>
            <a>
              <div className={styles.postCard}>
                <div className={styles.cardImage}>
                  <img src={post.banner} alt="bannner anime" />
                </div>
                <div className={styles.hero}>
                  <span>news</span>

                  <div className={styles.cardFooter}>
                    <h1>{post.title}</h1>
                    <div>
                      <span>{post.publicationDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </main>

      <Pagination
        totalCountOfRegisters={total}
        currentPage={page}
        onPageChange={setPage}
      />
    </>
  )
}
