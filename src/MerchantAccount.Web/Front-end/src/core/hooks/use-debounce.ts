import { useEffect, useState } from 'react';
/**
 * This hook prevent setSate immediately
 * @param value this value represent for the input value
 * @param delay this value represent for the delay time
 * @returns return the value after setState
 */
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
