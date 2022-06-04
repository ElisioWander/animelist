import { FaYoutube, FaArrowCircleLeft } from "react-icons/fa";
import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../../services/axios";

import stylesAnimePage from "./stylesAnimePage.module.scss";
import Link from "next/link";

interface AnimePageProps {
  anime: {
    title: string;
    poster: string;
    posterLarge: string;
    showType: string;
    episodes: string;
    status: string;
    youtubeVideo: string;
    score: string;
    description: string;
    startDate: string;
  }
}


export default function AnimePage({ anime }: AnimePageProps) {
  console.log(anime)

  return (
    <div className={stylesAnimePage.pageContainer}>
      <div
        style={{
          'backgroundImage': `linear-gradient(to bottom, transparent -50%, #121214 98%), url(${anime.posterLarge})`,
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
          <img
            src={anime.poster}
            alt="banner anime"
          />
          <h1>{anime.title}</h1>

          <ul>
            <li>Verção - {anime.showType}</li>
            <li>Nota - {anime.score}</li>
            <li>Episódios - {anime.episodes}</li>
            <li>Status - {anime.status}</li>
          </ul>

          <a href={`https://youtube.com/embed/${anime.youtubeVideo}`} target="_blank">
            <FaYoutube />
            Assistir Trailer
          </a>
        </div>
      </div>
      <div className={stylesAnimePage.animeInfo}>
        <h3>Sinopse</h3>

        <p>{anime.description}</p>

        <ul>
          <li><strong>Ano: </strong>{anime.startDate}</li>
          <li><strong>Temporada: </strong>2</li>
          <li><strong>Status: </strong>{anime.status}</li>
          <li><strong>Gênero: </strong><span>Comédia</span></li>
          <li><strong>Estúdio: </strong>UFOTABLE</li>
        </ul>
      </div>
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

  const anime = {
    ...animes.data,
    title: animes.data.attributes.canonicalTitle,
    poster: animes.data.attributes.posterImage.small,
    showType: animes.data.attributes.showType,
    episodes: animes.data.attributes.episodeCount,
    status: animes.data.attributes.status,
    youtubeVideo: animes.data.attributes.youtubeVideoId,
    score: animes.data.attributes.averageRating,
    description: animes.data.attributes.description,
    startDate: new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date(animes.data.attributes.startDate)),
    posterLarge: animes.data.attributes.posterImage.large
  }

  console.log(anime)

  return {
    props: { anime }
  }
}

// data: {
//   id: string;
//   attributes: {
//     canonicalTitle: string;
//     posterImage: {
//       small: string;
//     };
//     averageRating: string;
//     showType: string;
//     status: string;
//     episodeCount: string;
//     snopse: string;
//     startDate: string;
//     youtubeVideoId: string;
//     description: string;
//   };
// };