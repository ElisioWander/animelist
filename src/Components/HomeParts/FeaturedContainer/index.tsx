import { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import featuredContentInfo from '../../../services/featuredContentInfo.json'

import styles from './styles.module.scss'

type FeaturedAnimeData = {
  id: string
  title: string
  description: string
  showType: string
  averageRating: string
  year: string
  status: string
  coverImage: string
}

export function FeaturedContainer() {
  const [featuredAnime, setFeaturedAnime] = useState({} as FeaturedAnimeData)

  useEffect(() => {
    const featuredData = featuredContentInfo.items
    const randomItems = Math.floor(Math.random() * featuredData.length)
    const animeChosen = featuredData[randomItems]

    setFeaturedAnime(animeChosen)
  }, [])

  return (
    <>
      {featuredAnime && (
        <section
          id="slider"
          className={styles.headerSection}
          style={{
            backgroundImage: `url(${featuredAnime.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className={styles.headerVertical}>
            <div className={styles.headerHorizontal}>
              <div className={styles.headerSectionContent}>
                <h1>{featuredAnime.title}</h1>
                <span>{featuredAnime.description}</span>
                <div className={styles.contentInfo}>
                  <span>{featuredAnime.showType}</span>
                  <span>{featuredAnime.averageRating}</span>
                  <span>{featuredAnime.year}</span>
                  <span>{featuredAnime.status}</span>
                </div>

                <Link href={`posts/anime-list/${featuredAnime.id}`}>
                  <a>
                    Details
                    <FaArrowRight fontSize={12} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
