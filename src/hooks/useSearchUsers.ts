import { useState, useCallback } from 'react';
import axios from 'axios';

async function queryUserSearch<T>(url: string, queryString: string): Promise<T | undefined> {
  try {
    const res = await axios.get(`${url}?${queryString}`);
    return res.data;
  } catch (e) {
    console.log('Fail to search users. Details: ', e);
  }
}

function useSearchUsers<T, S>({
  url,
  transformFunc,
}: {
  url: string;
  transformFunc: (rawData?: S) => T[];
}): {
  users: T[];
  loading: boolean;
  onSearch: (queryString: string) => void;
} {
  const [value, setValue] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const onSearch = useCallback(
    async (querySting: string) => {
      setLoading(true);
      const data = await queryUserSearch<S>(url, querySting);
      const users = transformFunc(data);
      setValue(users);
      setLoading(false);
    },
    [url, transformFunc],
  );
  return { users: value, loading, onSearch };
}

export default useSearchUsers;
