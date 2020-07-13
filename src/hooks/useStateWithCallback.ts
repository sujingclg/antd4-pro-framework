import { useEffect, useState, useCallback, Dispatch, SetStateAction } from 'react';

/**
 *
 */
interface UseStateWithCallbackFunc {
  <T>(initValue?: T, callback?: (value?: T) => void): [T | undefined, Dispatch<SetStateAction<T | undefined>>];
}

const useStateWithCallback: UseStateWithCallbackFunc = (initValue, callback) => {
  const [value, setValue] = useState(initValue);
  useEffect(() => {
    callback && callback(value);
  }, [value]);
  return [value, setValue];
};

export default useStateWithCallback;
