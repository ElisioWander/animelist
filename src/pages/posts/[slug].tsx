import { GetServerSideProps } from "next";
import { prismicClient } from "../../services/prismic";
import { format } from "date-fns";

import * as prismicH from "@prismicio/helpers";

import styles from "./post.module.scss";
import Head from "next/head";

type Post = {
  slug: string;
  banner: string;
  title: string;
  sinopse: string;
  staff: {
    director: string;
    design: string;
    studio: string;
  };
  content: string;
  video: string;
  date: string;
};

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const contentText = post.content + post.sinopse;
  const wordCount = contentText.split(" ").length;

  const readTime = Math.ceil(wordCount / 200);

  return (
    <>
      <Head>
        <title>Anime.List | {post.title}</title>
      </Head>

      <div className={styles.postContainer}>
        <div className={styles.banner}>
          <img src={post.banner} alt="anime banner" />
        </div>

        <main className={styles.hero}>
          <h1>{post.title}</h1>

          <time>
            <span>{`${readTime} min`} reading</span>
            <span>{post.date}</span>
          </time>

          <section className={styles.animeInfo}>
            {post.sinopse && (
              <>
                <h3>Description</h3>
                <p>{post.sinopse}</p>
              </>
            )}

            {post.staff.director && (
              <>
                <h3>Staff</h3>
                <ul>
                  <li>
                    <strong>Director: </strong>
                    <span>{post.staff.director}</span>
                  </li>
                  <li>
                    <strong>Design: </strong>
                    <span>{post.staff.design}</span>
                  </li>
                  <li>
                    <strong>Studio: </strong>
                    <span>{post.staff.studio}</span>
                  </li>
                </ul>
              </>
            )}
          </section>

          <div className={styles.content}>
            <h3>More about</h3>
            <p>{post.content}</p>

            {post.video && (
              <div className={styles.iframeContainer}>
                <iframe src={post.video} frameBorder="0" />
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;

  const response = await prismicClient.getByUID("post", String(slug));

  const post = {
    slug,
    banner: response.data.banner.url,
    title: prismicH.asText(response.data.title),
    sinopse: prismicH.asText(response.data.sinopse),
    staff: {
      director: prismicH.asText(response.data.director),
      design: prismicH.asText(response.data.design),
      studio: prismicH.asText(response.data.studio),
    },
    content: prismicH.asText(response.data.content),
    video: response.data?.video.url || null,
    date: format(new Date(response.first_publication_date), "yyy / dd / MM"),
  };

  return {
    props: { post },
  };
};
