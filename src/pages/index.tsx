import { getHomeList } from './../services/jikanAPI'
import { useEffect, useState } from 'react'
import { AnimeRow } from '../Components/HomeParts/AnimeRow'
import { Spinner } from '../Components/Spinner/Index'
import { FeaturedContainer } from '../Components/HomeParts/FeaturedContainer'
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
  const [animeList, setAnimeList] = useState<AnimeListData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async function () {
      // pegando a lista que contem os dados dos animes
      const list = await getHomeList()

      setAnimeList(list)
      setIsLoading(false)
    })()
  }, [])

  return (
    <>
      <Head>
        <title>Anime.List | Home</title>
      </Head>

      <div className={styles.homeContainer}>
        {isLoading && <Spinner />}
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
