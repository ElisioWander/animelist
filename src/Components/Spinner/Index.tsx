import styles from './styles.module.scss'

export function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  )
}
