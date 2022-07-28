import { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import styles from './styles.module.scss'
import { Animes } from '../../Animes'

type AnimeListData = {
  mal_id: number
  title: string
  episodes: number
  images: {
    jpg: {
      image_url: string
    }
  }
}

interface AnimeRowProps {
  animeList: AnimeListData[]
  title: string
}

export function AnimeRow({ animeList, title }: AnimeRowProps) {
  const [scrollX, setScrollX] = useState<number>(0)

  function handleSliderLeft() {
    let axleX = scrollX + Math.round(window.innerWidth / 2)

    if (axleX > 0) {
      axleX = 0
    }

    setScrollX(axleX)
  }

  function handleSliderRight() {
    let axleX = scrollX - Math.round(window.innerWidth / 2)

    const listWidth = animeList.length * 220

    if (window.innerWidth - listWidth > axleX) {
      axleX = window.innerWidth - listWidth - 60
    }

    setScrollX(axleX)
  }

  return (
    <div className={styles.animeContainer}>
      <h2>{title}</h2>
      <div className={styles.animeContent}>
        <FaArrowLeft className={styles.arrowLeft} onClick={handleSliderLeft} />
        <FaArrowRight
          className={styles.arrowRight}
          onClick={handleSliderRight}
        />
        <ul
          style={{
            marginLeft: scrollX,
            width: animeList.length * 220,
          }}
        >
          {animeList?.map((anime) => (
            <Animes
              key={anime.mal_id}
              url={`/posts/anime-list/${anime.mal_id}`}
              image={anime.images.jpg.image_url}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
