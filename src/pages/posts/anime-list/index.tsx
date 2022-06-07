import { GetServerSideProps } from "next";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { SearchBox } from "../../../Components/Form/SearchBox";
import { Spinner } from "../../../Components/Spinner/Index";
import { api } from "../../../services/axios";

import styles from "./styles.module.scss";

type AnimeInfoData = {
  data: Array<{
    mal_id: string;
    title: string;
    images: {
      jpg: {
        large_image_url: string;
      }
    }
  }>;
};

interface AnimeListProps {
  animes: Array<{
    mal_id: number;
    title: string;
    poster: string;
  }>;
}

export default function AnimeList({ animes }: AnimeListProps) {
  const [search, setSearch] = useState<null | string>(null);
  const [animeData, setAnimeData] = useState<AnimeInfoData | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  //Pegar os animes com o nome passado no import, o valor do input
  //foi atribuido ao estado "search".
  //Os dados serão enviados para o estado "animeInfoData", apenas se o estado "search"
  //estiver preenchido com alguma informação que o usuário digitou no input e enviou para a
  //função "handleSubmit"  
  useEffect(() => {
    setIsLoading(true)
    api.get(`anime?q=${search}&order_by=mal_id`)
    .then(response => {
      if(search != null) setAnimeData(response.data)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [search])

  //fazendo a filtragem dos dados, passando como parâmetro o "search", ou seja, os dados
  //que foram enviados atravez da função "handleSubmit"
  const filteredAnime = animeData?.data.filter((anime) =>
    anime.title.toLowerCase().includes(search)
  );

  return (
    <div className={styles.listContainer}>
      <h1>Procurar anime</h1>
      
      <SearchBox setSearch={setSearch} isLoading={isLoading} />

      <div className={styles.listContent}>
        <ul>
          {/* se tiver "animes" e "filteredAnimes" for vazio, então vai ser renderizado o primeiro 
              cenário, caso contrário, o segundo será renderizado com os animes filtrados pelo campo 
              de busca
          */}
          {animes && !filteredAnime
            ? animes.map((anime) => (
                <li key={anime.mal_id}>
                  <Link href={`/posts/anime-list/${anime.mal_id}`}>
                    <a>
                      <img src={anime.poster} alt="anime banner" />
                      <span>{anime.title}</span>
                    </a>
                  </Link>
                </li>
              ))
            : filteredAnime?.map((anime) => (
                <li key={anime.mal_id}>
                  <Link href={`/posts/anime-list/${anime.mal_id}` }>
                    <a>
                      <img src={anime.images.jpg.large_image_url} alt="anime banner" />
                      <span>{anime.title}</span>
                    </a>
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get(`anime?order_by=rank`);

  const animes = response.data.data.map((anime) => {
    return {
      mal_id: anime.mal_id.toString(),
      title: anime.title,
      poster: anime.images.jpg.image_url,
    };
  });

  return {
    props: { animes },
  };
};
