import { prismicClient } from "../../services/prismic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SignInModal } from "../../Components/Modal/SignInModal";
import { Pagination } from "../../Components/Pagination";
import { Spinner } from "../../Components/Spinner/Index";
import { format } from 'date-fns'

import * as prismicH from "@prismicio/helpers";
import Link from "next/link";

import styles from "./posts.module.scss";


type Post = Array<{
  slug: string;
  banner: string;
  title: string;
  summary: string;
  publicationDate: string;
}>

export default function Posts() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [posts, setPosts] = useState<Post>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1)

  const { data: session } = useSession();

  useEffect(() => {
    (async function () {
      const per_page = 6;

      const response = await prismicClient.getAllByType("post");

      const total = response.length;
      setTotal(total)

      const pageStart = (Number(page) - 1) * Number(per_page);
      const pageEnd = pageStart + Number(per_page);

      const allPosts = response.map((post) => {
        return {
          slug: post.uid,
          banner: post.data.banner.url,
          title: prismicH.asText(post.data.title),
          publicationDate: format(new Date(post.first_publication_date), 'dd / MM / yyy'),
          summary:
            post.data.sinopse.find((sinopse) => sinopse.type === "paragraph")
              ?.text ?? "",
        };
      });

      const posts = allPosts.slice(pageStart, pageEnd);

      setPosts(posts);

      setIsLoading(false)
    })();
  }, [page]);

  //se o usuário não tiver uma sessão ativa, então, será chamado um modal
  //para que ele possa fazer a autenticação e acessar o post desejado
  function handleOpenModal() {
    if (!session) {
      setModalIsOpen(true);
    } else {
      return;
    }
  }

  return (
    <>
    {isLoading && <Spinner />}
      
      <main className={styles.postsCard}>
        {posts &&
          posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a onClick={handleOpenModal}>
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

      <SignInModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </>
  );
}
