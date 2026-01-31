import { useEffect, useRef } from 'react';

/**
 * A hook that delays executing an effect until a specified time has passed
 * since the last time the dependencies changed.
 *
 * @param effect The effect function to run
 * @param deps The dependencies array that triggers the effect
 * @param delay The delay in milliseconds
 */
export function useDebouncedEffect(effect: () => void, deps: any[], delay: number) {
  const callback = useRef(effect);

  useEffect(() => {
    callback.current = effect;
  }, [effect]);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback.current();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...deps, delay]); // eslint-disable-line react-hooks/exhaustive-deps
}
