import { useEffect, useState } from "react";

/**
 * Adapted from https://bit.dev/giladshoham/react-hooks/use/use-local-storage/~code
 * @param key local storage key
 * @param initialValue default value if key not found in store
 * @param reviver function to deserialize stored value
 * @returns deserialized value in local storage (if present)
 */
const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  reviver = JSON.parse
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    try {
      const localStorageValue = localStorage.getItem(key);
      if (typeof localStorageValue !== "string") {
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      } else {
        return reviver(localStorageValue);
      }
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch {
      // do nothing on write error
    }
  });

  return [state, setState];
};

export default useLocalStorage;
