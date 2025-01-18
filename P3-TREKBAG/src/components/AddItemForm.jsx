import {useEffect, useRef, useState } from "react";
import Button from "./Button";
import { useItemsStore } from "../stores/itemsStore";

export default function AddItemForm() {
  const onAddItem = useItemsStore((state) => state.addItem)

  const [itemText, setItemText] = useState("");
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    //guard statment
    if (!itemText) {
      alert("Item can not be empty!");
      return;
    }
    onAddItem(itemText);
    setItemText("");
    inputRef.current.focus();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
        type="text"
        value={itemText}
        onChange={(e) => setItemText(e.target.value)}
      />
      <Button>Add to list</Button>
    </form>
  );
}
