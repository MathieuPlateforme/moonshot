import { useState } from 'react';

const useLocalStorage = (key: string, initialValue?: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      let item = window.localStorage.getItem(key);
      try {
        if (item) {
          item = JSON.parse(item);
        }
      } catch (e) {
        // eslint-disable-next-line no-console

      }
      return item || initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // eslint-disable-next-line no-console

    }
  };

  const removeValue = () => {
    window.localStorage.removeItem(key);
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;