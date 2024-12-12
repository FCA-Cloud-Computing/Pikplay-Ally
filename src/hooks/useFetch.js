import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchingData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, controller);
        if (!response.ok) throw new Error("Error fetching data");
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
    return () => controller.abort();
  }, [url]);
  return { data, error, loading };
};
