import { FormEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import styles from "./styles.module.scss";

type AnimeInfoData = {
  data: Array<{
    id: string;
    attributes: {
      canonicalTitle: string;
      posterImage: {
        small: string;
      };
    };
  }>;
};

export default function AnimeList() {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const [animeInfo, setAnimeInfo] = useState<AnimeInfoData>();

  useEffect(() => {
    fetch(`https://kitsu.io/api/edge/anime?filter[text]=${search}`)
      .then((response) => response.json())
      .then((data) => setAnimeInfo(data));
  }, [search]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setSearch(value);
  }

  return (
    <div className={styles.listContainer}>
      <form onSubmit={handleSubmit} className={styles.searchBox}>
        <h1>Procurar anime</h1>
        <label>
          <input type="text" onChange={(e) => setValue(e.target.value)} />

          <button type="submit">
            <FaSearch />
          </button>
        </label>
      </form>

      <div className={styles.listContent}>
        <ul>
          {animeInfo?.data &&
            animeInfo.data.map((anime) => {
              return (
                <li key={anime.id}>
                  <img 
                    src={anime.attributes.posterImage.small} 
                    alt="poster anime"
                  />
                  <span>
                    {anime.attributes.canonicalTitle}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
