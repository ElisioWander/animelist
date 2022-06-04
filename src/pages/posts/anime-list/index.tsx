import { GetServerSideProps } from "next";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { SearchBox } from "../../../Components/Form/searchBox";
import { api } from "../../../services/axios";

import styles from "./styles.module.scss";

type AnimeInfoData = {
  data?: Array<{
    id: string;
    attributes: {
      slug: string;
      canonicalTitle: string;
      posterImage: {
        small: string;
      };
    };
  }>;
};

interface AnimeListProps {
  animes: Array<{
    id: string;
    slug: string;
    title: string;
    poster: string;
  }>;
}

export default function AnimeList({ animes }: AnimeListProps) {
  const [search, setSearch] = useState<null | string>(null);
  const [value, setValue] = useState<null | string>(null);
  const [animeData, setAnimeData] = useState<AnimeInfoData | null>(null);
  const [error, setError] = useState<Error>(null);

  //Pegar os animes com o nome passado no import, o valor do input
  //foi atribuido ao estado "search".
  //Os dados serão enviados para o estado "animeInfoData", apenas se o estado "search"
  //estiver preenchido com alguma informação que o usuário digitou no input e enviou para a
  //função "handleSubmit"
  useEffect(() => {
    api
      .get(`?filter[text]=${search}`)
      .then((response) => {
        if (search != null) setAnimeData(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [search]);

  console.log(animeData)

  //fazendo a filtragem dos dados, passando como parâmetro o "search", ou seja, os dados
  //que foram enviados atravez da função "handleSubmit"
  const filteredAnime = animeData?.data.filter((anime) =>
    anime.attributes.canonicalTitle.toLowerCase().includes(search)
  );

  //função responsável por enviar o formulário e setar o valor do input dentro
  //do estado "search"
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setSearch(value);
  }

  return (
    <div className={styles.listContainer}>
      <form onSubmit={handleSubmit}>
        <h1>Procurar anime</h1>

        <SearchBox setValue={setValue} />
      </form>

      <div className={styles.listContent}>
        <ul>
          {/* se tiver "animes" e "filteredAnimes" for vazio, então vai ser renderizado o primeiro 
              cenário, caso contrário, o segundo será renderizado com os animes filtrados pelo campo 
              de busca
          */}
          {animes && !filteredAnime
            ? animes.map((anime) => (
                <li key={anime.id}>
                  <Link href={`/posts/anime-list/${anime.id}`}>
                    <a>
                      <img src={anime.poster} alt="anime banner" />
                      <span>{anime.title}</span>
                    </a>
                  </Link>
                </li>
              ))
            : filteredAnime?.map((anime) => (
                <li key={anime.id}>
                  <Link href={`/posts/anime-list/${anime.id}` }>
                    <a>
                      <img src={anime.attributes.posterImage.small} alt="anime banner" />
                      <span>{anime.attributes.canonicalTitle}</span>
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
  const response = await api.get(``);
  const responseData = response.data;

  const animes = responseData.data.map((anime) => {
    return {
      id: anime.id,
      slug: anime.attributes.slug,
      title: anime.attributes.canonicalTitle,
      poster: anime.attributes.posterImage.small,
    };
  });

  return {
    props: { animes },
  };
};
