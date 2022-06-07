import { GetStaticProps } from "next";
import { prismicClient } from "../../services/prismic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SignInModal } from "../../Components/Modal/SignInModal";
import { SearchBox } from "../../Components/Form/SearchBox";

import * as prismicH from "@prismicio/helpers";
import Link from "next/link";

import * as prismic from '@prismicio/client'

import styles from "./posts.module.scss";

type Post = {
  slug: string;
  banner: string;
  title: string;
  summary: string;
};

type PostInfoData = Array<{
  id: string;
  title: string;
  banner: string;
}>

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [search, setSearch] = useState<string>(null)
  const [postReceived, setPostReceived] = useState<PostInfoData | null>(null)

  const { data: session } = useSession();

  useEffect(() => {
    (async function(){
      const response = await prismicClient.getAllByType('post', {
        predicates: [prismic.predicate.fulltext(`document`, `${search}`)]
      })
      
      const postData = response.map(post => {
        return {
          id: post.id,
          title: prismicH.asText(post.data.title),
          banner: post.data.banner.url
        }
      })
  
      if(search != null) {
        setPostReceived(postData)
      }
    })()
  }, [search])

  function handleOpenModal() {
    if (!session) {
      setModalIsOpen(true);
    } else {
      return;
    }
  }

  return (
    <>
      <div className={styles.searchBox} >
        <h1>Buscar post</h1>
        <SearchBox setSearch={setSearch} />
      </div>
      <main className={styles.postsCard}>
        {posts && !postReceived
          ? posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a onClick={handleOpenModal}>
                <div className={styles.postCard}>
                  <div className={styles.cardImage}>
                    <img src={post.banner} alt="bannner anime" />
                  </div>
                  <div className={styles.hero}>
                    <span>news</span>

                    <div className={styles.cardFooter} >
                      <h1>{post.title}</h1>
                      <div><span>há 10 dias . 5 min</span></div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          )) : postReceived.map(post => (
            <Link href={`/posts/`} key={post.id}>
              <a onClick={handleOpenModal}>
                <div className={styles.postCard}>
                  <div className={styles.cardImage}>
                    <img src={post.banner} alt="bannner anime" />
                  </div>
                  <div className={styles.hero}>
                    <span>news</span>

                    <div className={styles.cardFooter} >
                      <h1>{post.title}</h1>
                      <div><span>há 10 dias . 5 min</span></div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))
        }
      </main>

      <SignInModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await prismicClient.getAllByType("post", {
    fetch: ["post.banner", "post.title", "post.sinopse"],
    pageSize: 100,
  });

  const posts = response.map((post) => {
    return {
      slug: post.uid,
      banner: post.data.banner.url,
      title: prismicH.asText(post.data.title),
      summary:
        post.data.sinopse.find((sinopse) => sinopse.type === "paragraph")
          ?.text ?? "",
    };
  });

  return {
    props: { posts },
  };
};
