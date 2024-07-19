import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { BASEURL } from '../config/url';

interface UseFetchOptions extends AxiosRequestConfig {}

interface UseFetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  refetch: () => void;
}

const useFetch = <T = unknown>(url: string, options?: UseFetchOptions): UseFetchResult<T> => {
    const token = localStorage.getItem("pac_token")
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axios(`${BASEURL}/${url}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch };
};

export default useFetch;
