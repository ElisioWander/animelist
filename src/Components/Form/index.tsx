import { ChangeEvent, FormEvent, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import styles from './styles.module.scss'

interface SearchBoxProps {
  onPageChange: (page: number) => void
  onGetSearchInputValue: (searchInputValue: string) => void
}

export function SearchBox({
  onPageChange,
  onGetSearchInputValue,
}: SearchBoxProps) {
  const [searchInputValue, setSearchInputValue] = useState<string>('')

  function handleGetSearchInputValue(event: ChangeEvent<HTMLInputElement>) {
    setSearchInputValue(event.target.value)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    onPageChange(1)
    onGetSearchInputValue(searchInputValue)
    setSearchInputValue('')
  }

  return (
    <form className={styles.searchBox} onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          onChange={handleGetSearchInputValue}
          value={searchInputValue}
        />

        <button type="submit">
          <FaSearch />
        </button>
      </label>
    </form>
  )
}
