import { useState } from 'react'
import { SearchBox } from '../../../Components/Form'
import { Pagination } from '../../../Components/Pagination'
import { Spinner } from '../../../Components/Spinner/Index'
import { useFetch } from '../../../hooks/useFetch'
import { Animes } from '../../../Components/Animes'
import Head from 'next/head'

import styles from './styles.module.scss'

type AnimeInfo = {
  mal_id: number
  title: string
  images: {
    jpg: {
      large_image_url: string
    }
  }
}

type AnimesDta = {
  data: AnimeInfo[]
  pagination: {
    items: {
      total?: number
    }
  }
}

export default function AnimeList() {
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState(1)

  const { data: animes, isFetching } = useFetch<AnimesDta>(
    `anime?q=${search}&order_by=score&page=${page}&limit=20`,
    page,
    search,
  )
  const totalCount = animes?.pagination.items.total

  function handleGetSearchInputValue(searchInputValue: string) {
    setSearch(searchInputValue)
  }

  return (
    <>
      <Head>
        <title>Anime.List | List</title>
      </Head>

      <div className={styles.listContainer}>
        <h1>Search Anime</h1>

        <SearchBox
          onGetSearchInputValue={handleGetSearchInputValue}
          onPageChange={setPage}
        />

        <div className={styles.listContent}>
          {isFetching && <Spinner />}
          <ul>
            {animes?.data.map((anime) => (
              <Animes
                key={anime.mal_id}
                url={`/posts/anime-list/${anime.mal_id}`}
                image={anime.images.jpg.large_image_url}
                title={anime.title}
              />
            ))}
          </ul>
        </div>

        <Pagination
          totalCountOfRegisters={totalCount}
          currentPage={page}
          registerPerPage={20}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}
