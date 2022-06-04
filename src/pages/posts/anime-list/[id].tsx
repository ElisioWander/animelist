import { FaYoutube, FaArrowCircleLeft } from "react-icons/fa";
import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../../services/axios";

import stylesAnimePage from "./stylesAnimePage.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

type GenreAnime = {
  id: string;
  name: string;
}

type Anime = {
  id: string;
  title?: string;
  poster?: string;
  posterLarge?: string;
  posterOriginal?: string;
  bannerOriginal?: string;
  showType?: string;
  episodes?: string;
  status?: string;
  youtubeVideo?: string;
  score?: string;
  description?: string;
  startDate?: string;
}

interface AnimePageProps {
  anime: Anime;
  genres: GenreAnime[];
}

export default function AnimePage({ anime, genres }: AnimePageProps) {
  const [wideVersion, setWideVersion] = useState<number| null>(null)

  useEffect(() => {
    const screenWidth = document.body.clientWidth

    setWideVersion(screenWidth)
  }, [])

  return (
    <div className={stylesAnimePage.pageContainer}>
      <div
        style={{
          'backgroundImage': `linear-gradient(to bottom, transparent -50%, #121214 98%),
            url(${ wideVersion < 771 ? anime.posterOriginal : anime.bannerOriginal})`,
          'backgroundSize': 'cover',
          'backgroundRepeat': 'no-repeat',
          'backgroundPosition': 'center',
        }}
        className={stylesAnimePage.pageContent}
      >
        <Link href={`/posts/anime-list`} >
          <a>
            <FaArrowCircleLeft />
          </a>
        </Link>

        <div className={stylesAnimePage.pageContentCard}>
          <div className={stylesAnimePage.cardImage} >
            <img
              src={anime.poster}
              alt="banner anime"
            />
          </div>

          <div className={stylesAnimePage.cardContent} >
            <h1>{anime.title}</h1>
            <ul>
              <li>Verção - {anime.showType}</li>
              <li>Nota - {anime.score}</li>
              <li>Episódios - {anime.episodes}</li>
              <li>Status - {anime.status}</li>
            </ul>

            <p>{anime.description}</p>

            <a href={`https://youtube.com/embed/${anime.youtubeVideo}`} target="_blank">
              <FaYoutube />
              Assistir Trailer
            </a>
          </div>
        </div>
      </div>
      <main className={stylesAnimePage.animeInfo}>
        <h3>Sinopse</h3>

        <p>{anime.description}</p>

        <ul>
          <li><strong>Ano: </strong>{anime.startDate}</li>
          <li><strong>Temporada: </strong>2</li>
          <li><strong>Status: </strong>{anime.status}</li>
          <li>
            <strong>Gênero: </strong>
            { genres && genres.map(genre => (
              <span key={genre.id} >
                <span>{genre.name}</span>
              </span>
            )) }
          </li>
          <li><strong>Estúdio: </strong>UFOTABLE</li>
        </ul>

        <ul>
          <li><strong>Verção:</strong> {anime.showType}</li>
          <li><strong>Nota:</strong> {anime.score}</li>
          <li><strong>Episódios:</strong> {anime.episodes}</li>
          <li><strong>Status:</strong> {anime.status}</li>
        </ul>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}


export const getStaticProps:GetStaticProps = async ({params}) => {
  const { id } = params

  const response = await api.get(`${id}`)
  const animes = response.data

  const results = await api.get(`${id}/genres`)
  const genres = results.data.data.map(genre => {
    return {
      id: genre.id,
      name: genre.attributes.name
    }
  })

  const anime = {
    ...animes.data,
    id: animes.data.id,
    title: animes.data.attributes.canonicalTitle,
    poster: animes.data.attributes.posterImage.small,
    showType: animes.data.attributes.showType,
    episodes: animes.data.attributes.episodeCount,
    status: animes.data.attributes.status,
    youtubeVideo: animes.data.attributes.youtubeVideoId,
    score: animes.data.attributes.averageRating,
    description: animes.data.attributes.description.substring(0, 400)+'...',
    startDate: new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(animes.data.attributes.startDate)),
    posterLarge: animes.data.attributes.posterImage.large,
    posterOriginal: animes.data.attributes.posterImage.original,
    bannerOriginal: animes.data.attributes.coverImage.original
  }

  return {
    props: { anime, genres }
  }
}