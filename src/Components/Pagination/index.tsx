import { PaginationItem } from './paginationItem';
import styles from './styles.module.scss'

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}


const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from )]
      .map((_, index) => {
        return from + index + 1
      })
      .filter(page => page > 0)
}

export function Pagination({ 
  totalCountOfRegisters,
  registerPerPage = 6,
  currentPage = 1,
  onPageChange
 }: PaginationProps) {
  //Pegar a última 
  //Total de registros dividido pela quantidade de registros por página
  //O número pode ser quebrado, então, o ideal é fazer um arredondamento para cima
  const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage)

  const previousPage = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPage = currentPage < lastPage
    ? generatePagesArray(currentPage , Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <div className={styles.paginationContainer} >
      <div className={styles.paginationContent} >
        {currentPage > (1 + siblingsCount) && (
          <PaginationItem number={1} onPageChange={onPageChange} />
        )}

        {previousPage.length > 0 && previousPage.map(page => {
          return <PaginationItem key={page} number={page} onPageChange={onPageChange} />
        })}

        <PaginationItem number={currentPage} isCurrent onPageChange={onPageChange} />

        {nextPage.length > 0 && nextPage.map(page => {
          return <PaginationItem  key={page} number={page} onPageChange={onPageChange} />
        })}

        {(currentPage + siblingsCount) < lastPage && (
          <PaginationItem number={lastPage} onPageChange={onPageChange} />
        )}
      </div>
    </div>
  )
}
