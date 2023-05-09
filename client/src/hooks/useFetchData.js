
import { useEffect, useState } from 'react';
import axios from 'axios';


export const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(url);
        console.log("response.data: ", response);

        // if (!response.ok) throw new Error(response.statusText);

        // const json = await response.json();
        setIsPending(false);
        setData(response.data);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, error };
}
