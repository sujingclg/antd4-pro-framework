import { useState, useCallback } from 'react';
import axios from 'axios';

async function queryUserSearch(url: string, queryString: string): Promise<string[] | void> {
  try {
    const res = await axios.get(`${url}?${queryString}`);
    return res.data;
  } catch (e) {
    console.log('Fail to search users. Details: ', e);
  }
}

interface UseSearchUsersFunc {
  <T>(props: { url: string; transformFunc: (rawData: any) => T[] }): {
    users: T[];
    loading: boolean;
    /**
     * 请求时传入的查询字符串, 即 url 中, 问号后面跟着的查询参数
     * @param queryString
     */
    onSearch: (queryString: string) => void;
  };
}

// TODO 使用函数范型方式重构
const useSearchUsers: UseSearchUsersFunc = ({ url, transformFunc }) => {
  const [value, setValue] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const onSearch = useCallback(
    async (querySting: string) => {
      setLoading(true);
      const data = await queryUserSearch(url, querySting);
      const users = transformFunc(data);
      setValue(users);
      setLoading(false);
    },
    [url, transformFunc],
  );

  return { users: value, loading, onSearch };
};

export default useSearchUsers;
