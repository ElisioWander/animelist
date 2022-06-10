import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchBox } from "../../../Components/Form/SearchBox";
import { Pagination } from "../../../Components/Pagination";
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
  const [total, setTotal] = useState<number>()
  const [page, setPage] = useState(1)
  const [filteredTotalPage, setFilteredTotalPage] = useState<number>()

  //pegar os animes assim que o cliente acessar a página
  useEffect(() => {
    api
      .get(`anime?page=${page}&type=tv`)
      .then((response) => {
        const page = response.data.pagination.current_page

        const total = response.data.pagination.items?.total
        
        setTotal(total)
        setPage(page)
        setAnimes(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  //Pegar os animes com o nome passado no import, o valor do input
  //foi atribuido ao estado "search".
  //Os dados serão enviados para o estado "animeInfoData", apenas se o estado "search"
  //estiver preenchido com alguma informação que o usuário digitou no input e enviou para a
  //função "handleSubmit"
  useEffect(() => {
    setIsLoading(true);
    api
      .get(`anime?q=${search}&order_by=mal_id&page=${page}`)
      .then((response) => {
        const page = response.data.pagination.current_page
        const filteredTotalPage = response.data.pagination.items.total

        setPage(page)
        setFilteredTotalPage(filteredTotalPage)

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
  }, [search, page]);

  //fazendo a filtragem dos dados, passando como parâmetro o "search", ou seja, os dados
  //que foram enviados atravez da função "handleSubmit"
  const filteredAnime = searchAnimes?.data.filter((anime) =>
    anime.title.toLowerCase().includes(search)
  );

  return (
    <div className={styles.listContainer}>
      <h1>Procurar anime</h1>

      <SearchBox setSearch={setSearch} onPageChange={setPage} />

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

      {!filteredAnime && animes ? (
        <Pagination 
        totalCountOfRegisters={total}
        currentPage={page}
        registerPerPage={20}
        onPageChange={setPage}
      />
      ): filteredAnime && (
        <Pagination 
        totalCountOfRegisters={filteredTotalPage}
        currentPage={page}
        registerPerPage={20}
        onPageChange={setPage}
      />
      )}
    </div>
  );
}
