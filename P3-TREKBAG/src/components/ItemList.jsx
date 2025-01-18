import {useMemo, useState } from "react";
import EmptyView from "./EmptyView";
import Select from "react-select";
import { useItemsStore } from "../stores/itemsStore";

const options = [
  { value: "default", label: "Sort by default" },
  { value: "packed", label: "Sort by packed" },
  { value: "unpacked", label: "Sort by unpacked" },
];

export default function ItemList() {
  //needed from store
  const deleteItem = useItemsStore((state) => state.deleteItem)
  const toggleItem = useItemsStore((state) => state.toggleItem)
  const items = useItemsStore((state) => state.items)

  //sort state
  const [selectedOption, setSelectedOption] = useState("default");

  //create sorted items variable
  let sortedItems = useMemo(() => [...items].sort((a,b) => {
    if(selectedOption == 'packed'){
      return b.packed - a.packed
    }
    else if(selectedOption == 'unpacked'){
      return a.packed - b.packed
    }
    return 
  }), [items, selectedOption])



  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}

      {items.length > 0 ? (
        <section className="sorting">
          <Select
          defaultValue={options[0]}
          onChange={(option) => setSelectedOption(option.value)} 
          options={options}
          />
        </section>
      ) : null}

      {sortedItems.map((item) => (
        <Item
          onToggleItem={toggleItem}
          onDeleteItem={deleteItem}
          key={item.id}
          item={item}
        />
      ))}
    </ul>
  );
}

export function Item({ onToggleItem, onDeleteItem, item }) {
  return (
    <li className="item">
      <label>
        <input
          checked={item.packed}
          type="checkbox"
          onChange={() => onToggleItem(item.id)}
        />
        {item.name}
      </label>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
