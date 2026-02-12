import { useState } from 'react';

export default function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });

  const setLocal = (val) => {
    try {
      const value = typeof val === 'function' ? val(state) : val;
      setState(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // ignore
    }
  };

  return [state, setLocal];
}
