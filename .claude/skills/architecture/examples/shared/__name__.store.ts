// @ts-nocheck — template file; path aliases and types are illustrative only
// example Zustand store — devtools + persist with version
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { IExampleActions, IExampleState } from './__name__.interface'

export const useExampleStore = create<IExampleState & IExampleActions>()(
  devtools(
    persist(
      (set) => ({
        items: {},
        isInitialised: false,

        addItem: (id, value) =>
          set((state) => ({ items: { ...state.items, [id]: value } })),

        removeItem: (id) =>
          set((state) => {
            const updated = { ...state.items }
            delete updated[id]
            return { items: updated }
          }),

        setInitialised: () => set({ isInitialised: true }),

        clear: () => set({ items: {}, isInitialised: false }),
      }),
      {
        name: 'example-storage',
        version: 1,
        // exclude runtime flags from localStorage
        partialize: (state) => ({ items: state.items }),
      },
    ),
    {
      enabled: process.env.NODE_ENV !== 'production' && typeof window !== 'undefined',
      name: 'ExampleStore',
    },
  ),
)
