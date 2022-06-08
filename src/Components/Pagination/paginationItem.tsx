interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

import styles from './stylesItem.module.scss'

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange
}: PaginationItemProps) {
  if (isCurrent) {
    return( 
      <button 
        className={styles.paginationButton}
        disabled
        style={{
          cursor: 'default',
          filter: 'none',
          backgroundColor: '#141416'
        }}
      >
        {number}
      </button>
    );
  }

  return (
    <button 
      className={styles.paginationButton}
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  )
}
