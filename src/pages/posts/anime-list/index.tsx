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
      };
    };
  }>;
};

export default function AnimeList() {
  const [search, setSearch] = useState<null | string>(null);
  const [searchAnimes, setSearchAnimes] = useState<AnimeInfoData | null>(null);
  const [animes, setAnimes] = useState<AnimeInfoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  //pegar os animes assim que o cliente acessar a página
  useEffect(() => {
    api
      .get(`anime?order_by=rank`)
      .then((response) => {
        setAnimes(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //Pegar os animes com o nome passado no import, o valor do input
  //foi atribuido ao estado "search".
  //Os dados serão enviados para o estado "animeInfoData", apenas se o estado "search"
  //estiver preenchido com alguma informação que o usuário digitou no input e enviou para a
  //função "handleSubmit"
  useEffect(() => {
    setIsLoading(true);
    api
      .get(`anime?q=${search}&order_by=mal_id`)
      .then((response) => {
        if (search != null) {
          setSearchAnimes(response.data);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [search]);

  //fazendo a filtragem dos dados, passando como parâmetro o "search", ou seja, os dados
  //que foram enviados atravez da função "handleSubmit"
  const filteredAnime = searchAnimes?.data.filter((anime) =>
    anime.title.toLowerCase().includes(search)
  );

  return (
    <div className={styles.listContainer}>
      <h1>Procurar anime</h1>

      <SearchBox setSearch={setSearch} />

      <div className={styles.listContent}>
        {isLoading ? (
          <Spinner />
        ) : (
          <ul>
            {animes && !filteredAnime
              ? animes.data.map((anime) => (
                  <li key={anime.mal_id}>
                    <Link href={`/posts/anime-list/${anime.mal_id}`}>
                      <a>
                        <img
                          src={anime.images.jpg.large_image_url}
                          alt="anime banner"
                        />
                        <span>{anime.title}</span>
                      </a>
                    </Link>
                  </li>
                ))
              : filteredAnime?.map((anime) => (
                  <li key={anime.mal_id}>
                    <Link href={`/posts/anime-list/${anime.mal_id}`}>
                      <a>
                        <img
                          src={anime.images.jpg.large_image_url}
                          alt="anime banner"
                        />
                        <span>{anime.title}</span>
                      </a>
                    </Link>
                  </li>
                ))}
          </ul>
        )}
      </div>
    </div>
  );
}
