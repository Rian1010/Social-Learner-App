import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useAuthStore = create(
  combine(
    {
      payload: '',
      isAuthenticated: false,
    },
    (set) => ({
      setPayload: (payload: string) => set({ payload }),
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
    })
  )
);
