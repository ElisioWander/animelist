import { Spinner } from '../Components/Spinner/Index';
import { useFetch } from '../hooks/useFetch'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import styles from './home.module.scss'

type AnimeInfoData = {
  mal_id: string;
  title: string;
  images: {
    jpg: {
      image_url: string;
    }
  }
};

export default function Home() {
  const { data: seasonsNow } = useFetch<AnimeInfoData[]>(`seasons/now`)
  const { data: topAnimes } = useFetch<AnimeInfoData[]>(`top/anime`)
  const { data: upcoming } = useFetch<AnimeInfoData[]>(`seasons/upcoming`)

  return (
    <div className={styles.homeContainer} >
      <section className={styles.headerSection} >
        <img src="https://pbs.twimg.com/media/EVP0f8iUwAIjf4w?format=jpg&name=4096x4096" alt="" />

        <div className={styles.headerSectionContent} >
          <h1>Anime title</h1>
          <span>anime description</span>

          <a href="/">
            details
          </a>
        </div>
      </section>

      <div className={styles.cardContainer} >
        <div className={styles.cardContent} >
          <ul className="slider" >
            <FaArrowLeft className={styles.arrowLeft} fontSize={24} />
            { seasonsNow && seasonsNow.map(anime => (
              <li>
                <img key={anime.mal_id} src={anime.images.jpg.image_url} alt="poster anime" />
              </li> 
            )) }
            <FaArrowRight fontSize={24} />
          </ul>
          <ul>
            <FaArrowLeft className={styles.arrowLeft} fontSize={24} />
            <FaArrowRight fontSize={24} />
            { seasonsNow && seasonsNow.map(anime => (
              <li>
                <img key={anime.mal_id} src={anime.images.jpg.image_url} alt="poster anime" />
              </li> 
            )) }
          </ul>
        </div>
      </div>
    </div>
  )
}



