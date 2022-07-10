import { useState } from "react";
import { SearchBox } from "../../../Components/Form/SearchBox";
import { Pagination } from "../../../Components/Pagination";
import { Spinner } from "../../../Components/Spinner/Index";
import { useFetch } from "../../../hooks/useFetch";
import Head from "next/head";
import Link from "next/link";

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
  pagination: {
    items: {
      total?: number;
    };
  };
};

type filteredAnime = Array<{
  mal_id: string;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
}>;

export default function AnimeList() {
  const [search, setSearch] = useState<null | string>(null);
  const [page, setPage] = useState(1);

  //pegar os animes assim que o cliente acessar a página
  const {
    data: animes,
    isFetching,
    error,
  } = useFetch<AnimeInfoData | null>(`anime?page=${page}&limit=20`, page);
  //total de animes
  const totalCount = animes?.pagination.items.total;

  //Pegar os animes com o nome passado no input
  const { data: searchAnimes } = useFetch<AnimeInfoData | null>(
    `anime?q=${search}&order_by=score&page=${page}&limit=20`,
    page,
    search
  );
  //total de animes após a busca
  const searchTotalCount = searchAnimes?.pagination.items.total

  //fazendo a filtragem dos dados, passando como parâmetro o "search", ou seja, os dados
  //que foram enviados atravez da função "handleSubmit"
  let filteredAnime: filteredAnime;

  if (search != null) {
    filteredAnime = searchAnimes?.data.filter((anime) =>
      anime.title.toLowerCase().includes(search)
    );
  }

  return (
    <>
      <Head>
        <title>Anime.List | List</title>
      </Head>

      <div className={styles.listContainer}>
        <h1>Search Anime</h1>

        <SearchBox setSearch={setSearch} onPageChange={setPage} />

        <div className={styles.listContent}>
          {isFetching ? (
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

        {!filteredAnime && animes ? (
          <Pagination
            totalCountOfRegisters={totalCount}
            currentPage={page}
            registerPerPage={20}
            onPageChange={setPage}
          />
        ) : (
          filteredAnime && (
            <Pagination
              totalCountOfRegisters={searchTotalCount}
              currentPage={page}
              registerPerPage={20}
              onPageChange={setPage}
            />
          )
        )}
      </div>
    </>
  );
}
