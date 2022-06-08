import { GetStaticProps } from "next";
import { prismicClient } from "../../services/prismic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SignInModal } from "../../Components/Modal/SignInModal";
import { SearchBox } from "../../Components/Form/SearchBox";

import * as prismicH from "@prismicio/helpers";
import Link from "next/link";

import * as prismic from "@prismicio/client";

import styles from "./posts.module.scss";
import { Pagination } from "../../Components/Pagination";

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
}>;

interface PostsProps {
  posts: Post[];
  total: number;
  per_page: number;
  page: number;
}

export default function Posts({ posts, total, per_page }: PostsProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [search, setSearch] = useState<string>(null);
  const [postReceived, setPostReceived] = useState<PostInfoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  console.log(page)

  const { data: session } = useSession();

  //buscar os dados no prismic atravez do conteúdo que foi digitado
  //no input e enviado via formulário para o estado "search"
  useEffect(() => {
    (async function () {
      const response = await prismicClient.getAllByType("post", {
        predicates: [prismic.predicate.fulltext(`document`, `${search}`)],
      });

      const postData = response.map((post) => {
        return {
          id: post.id,
          title: prismicH.asText(post.data.title),
          banner: post.data.banner.url,
        };
      });

      if (search != null) {
        setPostReceived(postData);
      }

      setIsLoading(false);
    })();
  }, [search, page]);

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
      <div className={styles.searchBox}>
        <h1>Buscar post</h1>
        <SearchBox setSearch={setSearch} />
      </div>
      <main className={styles.postsCard}>
        {posts && !postReceived
          ? posts.map((post) => (
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
                          <span>há 10 dias . 5 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))
          : postReceived.map((post) => (
              <Link href={`/posts/`} key={post.id}>
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
                          <span>há 10 dias . 5 min</span>
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

export const getStaticProps: GetStaticProps = async () => {
  const page = 1;
  const per_page = 6;

  const response = await prismicClient.getAllByType("post", {
    pageSize: 2,
  });

  const total = response.length;

  console.log(total);

  const pageStart = (Number(page) - 1) * Number(per_page);
  const pageEnd = pageStart + Number(per_page);

  const allPosts = response.map((post) => {
    return {
      slug: post.uid,
      banner: post.data.banner.url,
      title: prismicH.asText(post.data.title),
      publicationDate: post.first_publication_date,
      summary:
        post.data.sinopse.find((sinopse) => sinopse.type === "paragraph")
          ?.text ?? "",
    };
  });

  const posts = allPosts.slice(pageStart, pageEnd);

  return {
    props: { posts, total, per_page },
  };
};
