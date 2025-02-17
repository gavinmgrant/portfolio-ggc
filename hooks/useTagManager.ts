'use client'

import { useCallback } from 'react';

export function useTagManager() {
  const fireEvent = useCallback((eventName: string, eventParams: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...eventParams,
      });
    }
  }, []);

  return { fireEvent };
}
