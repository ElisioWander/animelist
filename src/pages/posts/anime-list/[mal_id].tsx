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
  title: string;
  poster?: string;
  showType?: string;
  episodes: string;
  status?: string;
  youtubeVideo?: string;
  score?: string;
  description?: string;
  year?: string;
  season?: string
  ageRating?: string;
}

interface AnimePageProps {
  anime: Anime;
  genres: GenreAnime[];
}

export default function AnimePage({ anime, genres }: AnimePageProps) {
  const [wideVersion, setWideVersion] = useState<number| null>(null)

  // useEffect(() => {
  //   fetch("https://api.jikan.moe/v4/anime/1")
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.log(err))
  // }, [])

  useEffect(() => {
    const screenWidth = document.body.clientWidth

    setWideVersion(screenWidth)
  }, [])

  return (
    <div className={stylesAnimePage.pageContainer}>
      <div
        style={{
          'backgroundImage': `linear-gradient(to bottom, transparent -50%, #121214 98%),
            url(${ wideVersion < 771 ? anime.poster : anime.poster})`,
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
              <li>Episódios - {anime.episodes}</li>
              <li>Status - {anime.status}</li>
              <li>Nota - {anime.score}</li>
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
          <li><strong>Ano: </strong>{anime.year}</li>
          <li><strong>Temporada: </strong>{anime.season}</li>
          <li><strong>Verção:</strong> {anime.showType}</li>
          <li>
            <strong>Gênero: </strong>
            { genres && genres.map(genre => (
              <span key={genre.id} >
                <span>{genre.name}</span>
              </span>
            )) }
          </li>
          <li><strong>Estúdio: </strong>UFOTABLE</li>
          <li><strong>Censura: </strong>{anime.ageRating}</li>
        </ul>

        <ul>
          
          <li><strong>Nota:</strong> {anime.score}</li>
          <li><strong>Episódios:</strong> {anime.episodes}</li>
          <li><strong>Status: </strong>{anime.status}</li>
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
  const { mal_id } = params

  //pegar o anime pelo ID
  const animesResponse = await api.get(`anime/${mal_id}`)
  const animes = animesResponse.data

  console.log(animes.data)

  const anime = {
    ...animes.data,
    id: animes.data.mal_id,
    title: animes.data.title,
    poster: animes.data.images.jpg.large_image_url,
    showType: animes.data.type,
    episodes: animes.data.episodes,
    status: animes.data.status,
    youtubeVideo: animes.data.trailer.youtube_id,
    score: animes.data.score,
    description: animes.data.synopsis.substring(0, 600)+'...',
    year: animes.data.year,
    season: animes.data.season,
    posterLarge: animes.data.images.jpg.large_image_url,
    ageRating: animes.data.rating,
  }

  return {
    props: { anime }
  }
}