import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Spinner } from "../Spinner/Index";

import styles from "./styles.module.scss";

interface SearchBoxProps {
  setSearch?: Dispatch<SetStateAction<string>>;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

export function SearchBox({ setSearch, isLoading, onPageChange }: SearchBoxProps) {
  const [value, setValue] = useState<null | string>(null);

  //função responsável por enviar o formulário e setar o valor do input dentro
  //do estado "search"
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setSearch(value);
    onPageChange(1)
  }

  return (
    <form className={styles.searchBox} onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value.toLowerCase())}
        />

        <button type="submit">
          <FaSearch />
        </button>
      </label>

      {isLoading && <Spinner />}
    </form>
  );
}
