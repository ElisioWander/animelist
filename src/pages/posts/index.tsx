import { GetStaticProps } from "next";
import { prismicClient } from "../../services/prismic";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { SignInButton } from "../../Components/SignInButton";

import * as prismicH from '@prismicio/helpers'
import Link from "next/link";

import styles from "./posts.module.scss";
import { Modal } from "../../Components/Modal";

type Post = {
  slug: string;
  banner: string;
  title: string;
  summary: string;
}

interface PostsProps {
  posts: Post[],
}

export default function Posts({ posts }: PostsProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { data: session } = useSession()

  function handleOpenModal() {
    if(!session) {
      setModalIsOpen(true)
    } else {
      return
    }
  }

  return (
    <>
      <main className={styles.postsCard}>
        { posts.map(post => (
          <div className={styles.postCard}>
            <div className={styles.cardImage}>
              <img 
                src={post.banner}
                alt="bannner anime"
              />
            </div>

            <div className={styles.hero} >
              <h1>{post.title}</h1>

              <p>
                {post.summary}
              </p>

              <Link href={`/posts/${post.slug}`} key={post.slug} >
                <a onClick={handleOpenModal} >Continuar lendo</a>
              </Link>

            </div>
          </div>
        )) }
      </main>
        
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await prismicClient.getAllByType("post", {
    fetch: ["post.banner", "post.title", "post.sinopse"],
    pageSize: 100
  })

  const posts = response.map((post) => {
    return {
      slug: post.uid,
      banner: post.data.banner.url,
      title: prismicH.asText(post.data.title),
      summary: post.data.sinopse.find((sinopse) => sinopse.type === 'paragraph')?.text ?? "",
    }
  })

  return {
    props: { posts }
  }
}
