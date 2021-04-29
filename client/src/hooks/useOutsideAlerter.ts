import { RefObject, useEffect } from 'react';

export function useOutsideAlerter(ref: RefObject<HTMLElement>, f: () => void): void {
  useEffect(() => {
    // TODO: define type further
    function handleClickOutside(event: any): void {
      if (ref.current && !ref.current.contains(event.target)) {
        f();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
