import { MutableRefObject, useLayoutEffect } from 'react';

export function useLockRefScroll(ref: MutableRefObject<HTMLElement>): void {
  useLayoutEffect(() => {
    if (ref) {
      const originalStyle = ref.current.style.overflow;
      ref.current.style.overflow = 'hidden';
      return (): any => { ref.current.style.overflow = originalStyle; };
    }
  }, [ref]);
}
