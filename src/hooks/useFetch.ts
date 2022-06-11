import { useEffect, useState } from "react";
import { api } from "../services/axios";

export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api.get(url)
    .then(response => {
      setData(response.data.data)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [])

  return { data, isLoading }
}
