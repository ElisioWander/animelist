import { getHomeList } from "./../services/jikanAPI";
import { useEffect, useState } from "react";
import { AnimeRow } from "../Components/HomeParts/AnimeRow";
import { Spinner } from "../Components/Spinner/Index";
import { FeaturedContainer } from "../Components/HomeParts/FeaturedContainer";

import styles from "./home.module.scss";
import axios from "axios";
import Head from "next/head";

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

export default function Home() {
  const [animeList, setAnimeList] = useState<AnimeListData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      //pegando a lista que contem os dados dos animes
      let list = await getHomeList();

      const response = await axios.get(
        `https://kitsu.io/api/edge/anime?filter[text]=shingeki`
      );

      setAnimeList(list);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Anime.List | Home</title>
      </Head>

      <div className={styles.homeContainer}>
        {isLoading && <Spinner />}
        <FeaturedContainer />

        <div className={styles.listContainer}>
          {animeList &&
            animeList.map((animeList) => (
              <div key={animeList.slug}>
                <AnimeRow animeList={animeList.items} title={animeList.title} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
