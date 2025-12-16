import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  setMenuOpen: (open: boolean) => void;
  isLoaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isMenuOpen: false,
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      setMenuOpen: (open) => set({ isMenuOpen: open }),
      isLoaded: false,
      setLoaded: (loaded) => {
        console.log('Setting isLoaded to:', loaded);
        set({ isLoaded: loaded });
      },
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        isLoaded: state.isLoaded,
      }),
      // Add storage configuration to ensure proper persistence
      storage: {
        getItem: (name) => {
          try {
            const value = localStorage.getItem(name);
            return value ? JSON.parse(value) : null;
          } catch (error) {
            console.error('Error retrieving from localStorage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error('Error saving to localStorage:', error);
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch (error) {
            console.error('Error removing from localStorage:', error);
          }
        }
      }
    }
  )
);