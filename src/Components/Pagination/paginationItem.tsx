import styles from './stylesItem.module.scss'

interface PaginationItemProps {
  isCurrent?: boolean
  number: number
  onPageChange: (page: number) => void
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button
        className={styles.paginationButton}
        disabled
        style={{
          cursor: 'default',
          filter: 'none',
          backgroundColor: '#141416',
        }}
      >
        {number}
      </button>
    )
  }

  if (onPageChange) window.scrollTo(0, 0)

  return (
    <a className={styles.paginationButton} onClick={() => onPageChange(number)}>
      {number}
    </a>
  )
}
