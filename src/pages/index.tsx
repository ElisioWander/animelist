import { getHomeList } from "../JikanAPI";

import styles from "./home.module.scss";
import { useEffect, useState } from "react";
import { AnimeRow } from "../Components/AnimeRow";

type AnimeListData = Array<{
  title: string;
  items: Array<{
    mal_id: number;
    title: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  }>;
}>;

export default function Home() {
  const [animeList, setAnimeList] = useState<AnimeListData | null>(null);

  useEffect(() => {
    (async function () {
      let list = await getHomeList();

      setAnimeList(list);
    })();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <section className={styles.headerSection}>
        <img
          src="https://pbs.twimg.com/media/EVP0f8iUwAIjf4w?format=jpg&name=4096x4096"
          alt=""
        />

        <div className={styles.headerSectionContent}>
          <h1>Anime title</h1>
          <span>anime description</span>

          <a href="/">details</a>
        </div>
      </section>

      <div className={styles.listContainer}>
        {animeList && 
          animeList.map((animeList, key) => (
            <div key={key} >
              <AnimeRow animeList={animeList.items} title={animeList.title} />
            </div>
          ))
        }
      </div>
    </div>
  );
}
