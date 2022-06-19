import { FaYoutube, FaArrowCircleLeft } from "react-icons/fa";
import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../../services/axios";

import stylesAnimePage from "./stylesAnimePage.module.scss";
import Link from "next/link";
import { useState } from "react";
import { VideoModal } from "../../../Components/Modal/VideoModal";
import Head from "next/head";

type AnimePageProps = {
  anime: {
    id: string;
    title: string;
    poster: string;
    showType: string;
    episodes: number;
    status: string;
    youtubeVideo: string;
    score: number;
    description: string;
    year: number;
    season: string;
    ageRating: string;
    genres: Array<{
      id: string;
      name: string;
    }>;
    studios: Array<{
      id: string;
      name: string;
    }>;
  };
};

export default function AnimePage({ anime }: AnimePageProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  return (
    <>
      <Head>
        <title>Anime.List | {anime.title}</title>
      </Head>

      <div className={stylesAnimePage.pageContainer}>
        <div className={stylesAnimePage.pageContent}>
          <img src={anime.poster} alt="" />

          <Link href={`/posts/anime-list`}>
            <a>
              <FaArrowCircleLeft />
            </a>
          </Link>

          <div className={stylesAnimePage.pageContentCard}>
            <div className={stylesAnimePage.cardImage}>
              <img src={anime.poster} alt="banner anime" />
            </div>

            <div className={stylesAnimePage.cardContent}>
              <h1>{anime.title}</h1>
              <ul>
                <li>Type - {anime.showType}</li>
                <li>Episodes - {anime.episodes}</li>
                <li>Year - {anime.year}</li>
                <li>Score - {anime.score}</li>
              </ul>

              <p>{anime.description}</p>

              <a onClick={handleOpenModal}>
                <FaYoutube />
                Watch trailer
              </a>
            </div>
          </div>
        </div>
        <main className={stylesAnimePage.animeInfo}>
          <h3>Description</h3>

          <p>{anime.description}</p>

          <ul>
            <li>
              <strong>Year: </strong>
              {anime.year}
            </li>
            <li>
              <strong>Seasons: </strong>
              {anime.season}
            </li>
            <li>
              <strong>Type: </strong>
              {anime.showType}
            </li>
            <li>
              <strong>Genres: </strong>
              {anime.genres.map((genre) => (
                <span key={genre.id}>
                  <span>{genre.name}</span>
                </span>
              ))}
            </li>
            <li>
              <strong>Studio: </strong>
              {anime.studios.map((studio) => (
                <span key={studio.id}>
                  <span>{studio.name}</span>
                </span>
              ))}
            </li>
            <li>
              <strong>Age Rating: </strong>
              {anime.ageRating}
            </li>
          </ul>

          <ul>
            <li>
              <strong>Score: </strong>
              {anime.score}
            </li>
            <li>
              <strong>Episodes: </strong>
              {anime.episodes}
            </li>
            <li>
              <strong>Status: </strong>
              {anime.status}
            </li>
          </ul>
        </main>
      </div>

      <VideoModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        youtubeVideo={anime.youtubeVideo}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { mal_id } = params;

  //pegar o anime pelo ID
  const animesResponse = await api.get(`anime/${mal_id}`);
  const animes = animesResponse.data;

  const anime = {
    ...animes.data,
    id: animes.data.mal_id.toString(),
    title: animes.data.title,
    poster: animes.data.images.jpg.large_image_url,
    showType: animes.data.type,
    episodes: animes.data.episodes,
    status: animes.data.status,
    youtubeVideo: animes.data.trailer.youtube_id,
    score: animes.data.score,
    description: animes.data.synopsis?.substring(0, 400) + "...",
    year: animes.data.year,
    season: animes.data.season,
    ageRating: animes.data.rating,
    genres: animes.data.genres.map((genre) => {
      return {
        id: genre.mal_id.toString(),
        name: genre.name,
      };
    }),
    studios: animes.data.studios.map((studio) => {
      return {
        id: studio.mal_id.toString(),
        name: studio.name,
      };
    }),
  };

  return {
    props: { anime },
  };
};
