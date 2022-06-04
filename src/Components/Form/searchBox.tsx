import { FaSearch } from "react-icons/fa";

import styles from './styles.module.scss'

interface SearchBoxProps {
  setValue?: (e) => void;
}

export function SearchBox({ setValue }: SearchBoxProps) {
  return (
    <label className={styles.searchBox} >
      <input
        type="text"
        onChange={(e) => setValue(e.target.value.toLowerCase())}
      />

      <button type="submit">
        <FaSearch />
      </button>
    </label>
  );
}
