import { getHomeList } from './../hooks/useJikanAPI'
import { AnimeRow } from '../Components/HomeParts/AnimeRow'
import { Spinner } from '../Components/Spinner/Index'
import { FeaturedContainer } from '../Components/HomeParts/FeaturedContainer'
import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'

import styles from './home.module.scss'

type AnimeItems = {
  mal_id: number
  title: string
  episodes: number
  images: {
    jpg: {
      image_url: string
    }
  }
}

type AnimeListData = {
  slug: string
  title: string
  items: AnimeItems[]
}

export default function Home() {
  const { data: animeList, isFetching } = useQuery<AnimeListData[]>(
    ['HOME_LIST'],
    getHomeList,
    {
      staleTime: 5000 * 60, // 5 minutos
    },
  )

  if (!animeList || isFetching) {
    return <Spinner />
  }

  return (
    <>
      <Head>
        <title>Anime.List | Home</title>
      </Head>

      <div className={styles.homeContainer}>
        <FeaturedContainer />

        <div className={styles.listContainer}>
          {animeList?.map((animeList) => (
            <div key={animeList.slug}>
              <AnimeRow animeList={animeList.items} title={animeList.title} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
