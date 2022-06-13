import { getHomeList } from "../JikanAPI";
import { useEffect, useState } from "react";
import { AnimeRow } from "../Components/AnimeRow";
import { Spinner } from "../Components/Spinner/Index";
import axios from "axios";

import styles from "./home.module.scss";
import { format } from "date-fns";

type AnimeListData = Array<{
  slug: string;
  title: string;
  items: Array<{
    mal_id: number;
    title: string;
    episodes: number;
    images: {
      jpg: {
        image_url: string;
      };
    };
  }>;
}>;

type FeaturedAnimeData = {
  id: string;
  title: string;
  rating: string;
  date: string;
  wallpapers: {
    large: string;
    original: string;
  }
  description: string;
  showType: string;
  status: string;
}

export default function Home() {
  const [animeList, setAnimeList] = useState<AnimeListData | null>(null);
  const [featuredAnime, setFeaturedAnime] = useState<FeaturedAnimeData>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async function () {
      //pegando a lista que contem os dados dos animes
      let list = await getHomeList();

      setAnimeList(list);
      setIsLoading(false)
    })();
  }, []);

  useEffect(() => {
    (async function() {
      const response = await axios.get(`https://kitsu.io/api/edge/anime`)
      let data = await response.data.data

      let animeData = data.map(anime => {
        return {
          id: anime.id,
          title: anime.attributes.canonicalTitle,
          rating: anime.attributes.averageRating,
          date: format(new Date(anime.attributes.startDate), 'yyy'),
          wallpapers: anime.attributes.coverImage,
          description: anime.attributes.synopsis,
          showType: anime.attributes.showType,
          status: anime.attributes.status
        }
      })

      let randomList = Math.floor(Math.random() * (animeData.length))
      let animeChosen = animeData[randomList]

      setFeaturedAnime(animeChosen)
    })()
  }, [])

  return (
    <div className={styles.homeContainer}>
      { featuredAnime && (
        <section 
          className={styles.headerSection}
          style={{
            'backgroundImage': `url(${featuredAnime.wallpapers?.original})`,
            'backgroundSize': 'cover',
            'backgroundPosition': 'center'
          }}
        >
          <div className={styles.headerVertical} >
            <div className={styles.headerHorizontal} >
              <div className={styles.headerSectionContent}>
                <h1>{featuredAnime.title}</h1>
                <span>{featuredAnime.description}</span>
                <div className={styles.contentInfo}>
                  <span>{featuredAnime.showType}</span>
                  <span>{featuredAnime.rating}</span>
                  <span>{featuredAnime.date}</span>
                  <span>{featuredAnime.status}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) }

      <div className={styles.listContainer}>
        { isLoading 
          ? <Spinner />
          : animeList && 
            animeList.map((animeList) => (
              <div key={animeList.slug} >
                <AnimeRow animeList={animeList.items} title={animeList.title} />
              </div>
          ))
        }
      </div>
    </div>
  );
}
