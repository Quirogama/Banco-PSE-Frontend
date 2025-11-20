import { useState, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';
import { api } from '../services';

export default function useApi<T = unknown>(config: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.request<T>(config)
      .then(res => { if (mounted) setData(res.data); })
      .catch(err => { if (mounted) setError(err); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [JSON.stringify(config)]);

  return { data, loading, error };
}
