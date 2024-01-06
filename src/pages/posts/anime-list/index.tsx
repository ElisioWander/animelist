import { useState } from 'react'
import { SearchBox } from '../../../Components/Form'
import { Pagination } from '../../../Components/Pagination'
import { Spinner } from '../../../Components/Spinner/Index'
import { Animes } from '../../../Components/Animes'
import { useQuery } from '@tanstack/react-query'
import { getAnimes } from '../../../hooks/useJikanAPI'
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

type AnimesData = {
  data: AnimeInfo[]
  pagination: {
    items: {
      total?: number
    }
  }
}

export default function AnimeList() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data: animes, isFetching } = useQuery<AnimesData>(
    ['ANIMES', page, search],
    () => getAnimes(search, page),
  )

  const totalCount = animes?.pagination.items.total

  return (
    <>
      <Head>
        <title>Anime.List | List</title>
      </Head>

      <div className={styles.listContainer}>
        <h1>Search Anime</h1>

        <SearchBox
          onChange={(query) => setSearch(query)}
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
