import Link from 'next/link';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import styles from './styles.module.scss'

interface AnimeRowProps {
  animeList: Array<{
    mal_id: number;
    title: string;
    episodes: number;
    images: {
      jpg: {
        image_url: string;
      };
    };
  }>;
  title: string;
}

export function AnimeRow({ animeList, title }: AnimeRowProps) {
  const [scrollX, setScrollX] = useState<number>(-400)

  function handleSliderLeft() {
    let axleX = scrollX + Math.round(window.innerWidth / 2)

    if(axleX > 0) {
      axleX = 0
    }

    setScrollX(axleX)
  }

  function handleSliderRight() {
    let axleX = scrollX - Math.round(window.innerWidth / 2)

    let listWidth = animeList.length * 220

    if((window.innerWidth - listWidth) > axleX) {
      axleX = (window.innerWidth - listWidth) - 60
    }

    setScrollX(axleX)
  }

  return (
    <div className={styles.animeContainer} >
      <div className={styles.animeContent} >
        <h2>{title}</h2>
        <FaArrowLeft className={styles.arrowLeft} onClick={handleSliderLeft} />
        <FaArrowRight className={styles.arrowRight} onClick={handleSliderRight} />
        <ul style={{
          marginLeft: scrollX,
          width: animeList.length * 220
        }} >
          {animeList && animeList.map(anime => (
            <li key={anime.mal_id} >
              <Link href={`/posts/anime-list/${anime.mal_id}`} >
                <a>
                  <img src={anime.images.jpg.image_url} alt="animes poster" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
