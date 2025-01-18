import { createContext, useEffect, useState } from "react";
import { initialItems } from "../lib/constants";

export const ItemsContext = createContext(); //create context

export default function ItemsContextProvider({children}) {
  const itemsFromLC = JSON.parse(localStorage.getItem("items"));
  const [items, setItems] = useState(itemsFromLC || initialItems);

  const handleAddItem = (itemText) => {//zustand
    const newItem = {
      id: new Date().getTime(),
      name: itemText,
      packed: false,
    };

    setItems((prev) => [...prev, newItem]);//zustand
  };

  const handleDeleteItem = (id) => {//zustand
    const newItems = items.filter((item) => item.id != id);
    setItems(newItems);
  };

  const handleToggleItem = (id) => {//zustand
    const newItems = items.map((item) =>
      item.id !== id ? item : { ...item, packed: !item.packed }
    );
    setItems(newItems);
  };

  const handleRemoveAllItems = () => {//zustand
    setItems([]);
  };

  const handleResetToInitial = () => {//zustand
    setItems(initialItems);
  };

  const handleMarkAllAsComplete = () => { //zustand
    const newItems = items.map((item) => {
      return { ...item, packed: true };
    });
    setItems(newItems);
  };

  const handleMarkAllAsIncomplete = () => { //zustand
    const newItems = items.map((item) => {
      return { ...item, packed: false };
    });
    setItems(newItems);
  };

  const totalNumberOfItems = items.length;
  const numberOfItemsPacked = items.filter((item) => item.packed).length;

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        handleAddItem,
        handleDeleteItem,
        handleMarkAllAsComplete,
        handleMarkAllAsIncomplete,
        handleRemoveAllItems,
        handleResetToInitial,
        handleToggleItem,
        totalNumberOfItems,
        numberOfItemsPacked
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
