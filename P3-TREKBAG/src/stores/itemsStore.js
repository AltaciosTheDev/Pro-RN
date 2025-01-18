import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialItems } from "../lib/constants";

//function that receives set as param to modify the object it returns.
export const useItemsStore = create(
  persist(
    (set) => ({
      items: initialItems,
      removeAllItems: () => set({ items: [] }), // obj -> b/c store can house more things
      resetToInitial: () => set({ items: initialItems }),
      markAllAsComplete: () =>
        set((state) => {
          const newItems = state.items.map((item) => {
            return { ...item, packed: true };
          });
          return { items: newItems };
        }),
      markAllAsIncomplete: () =>
        set((state) => {
          const newItems = state.items.map((item) => {
            return { ...item, packed: false };
          });
          return { items: newItems };
        }),
      addItem: (itemText) => {
        const newItem = {
          id: new Date().getTime(),
          name: itemText,
          packed: false,
        };

        set((state) => ({ items: [...state.items, newItem] }));
      },
      deleteItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id != id);
          return { items: newItems };
        }),
      toggleItem: (id) =>
        set((state) => {
          const newItems = state.items.map((item) =>
            item.id !== id ? item : { ...item, packed: !item.packed }
          );
          return { items: newItems };
        }),
    }),
    {
      name: "items",
    }
  )
);
