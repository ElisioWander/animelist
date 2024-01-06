import { FormEvent, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import styles from './styles.module.scss'

interface SearchBoxProps {
  onPageChange: (page: number) => void
  onChange: (query: string) => void
}

export function SearchBox({ onPageChange, onChange }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState<string>('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    onPageChange(1)
    onChange(inputValue)
    setInputValue('')
  }

  return (
    <form className={styles.searchBox} onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />

        <button type="submit">
          <FaSearch />
        </button>
      </label>
    </form>
  )
}
