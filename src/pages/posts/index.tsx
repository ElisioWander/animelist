import styles from "./posts.module.scss";

export default function Posts() {
  return (
    <main className={styles.postsCard}>
      <div className={styles.postCard}>
        <div className={styles.cardImage}>
        </div>

        <div className={styles.hero} >
          <h1>One Piece</h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ex ipsam deserunt ad consequuntur voluptas sed at eos numquam vel, modi incidunt minus aliquid, fugiat doloremque ipsum dolores, repellat vitae?
          </p>

          <a href="/posts/post">Ver mais</a>
        </div>
      </div>
      <div className={styles.postCard}>
        <div className={styles.cardImage} >
        </div>

        <div className={styles.hero} >
          <h1>One Piece</h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ex ipsam deserunt ad consequuntur voluptas sed at eos numquam vel, modi incidunt minus aliquid, fugiat doloremque ipsum dolores, repellat vitae?
          </p>

          <a href="/post">Ver mais</a>
        </div>
      </div>
      <div className={styles.postCard}>
        <div className={styles.cardImage} >
        </div>

        <div className={styles.hero} >
          <h1>One Piece</h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ex ipsam deserunt ad consequuntur voluptas sed at eos numquam vel, modi incidunt minus aliquid, fugiat doloremque ipsum dolores, repellat vitae?
          </p>

          <a href="/post">Ver mais</a>
        </div>
      </div>
      <div className={styles.postCard}>
        <div className={styles.cardImage} >
        </div>

        <div className={styles.hero} >
          <h1>One Piece</h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ex ipsam deserunt ad consequuntur voluptas sed at eos numquam vel, modi incidunt minus aliquid, fugiat doloremque ipsum dolores, repellat vitae?
          </p>

          <a href="/post">Ver mais</a>
        </div>
      </div>
    </main>
  );
}
