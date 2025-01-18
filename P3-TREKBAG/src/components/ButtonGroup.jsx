import Button from "./Button";
import { buttons } from "../lib/constants";
import { useItemsStore } from "../stores/itemsStore";

export default function ButtonGroup() {
  const markAllAsComplete = useItemsStore((state) => state.markAllAsComplete)
  const markAllAsIncomplete = useItemsStore((state) => state.markAllAsIncomplete)
  const removeAllItems = useItemsStore((state) => state.removeAllItems)
  const resetToInitial = useItemsStore((state) => state.resetToInitial)


  const handleAllClicks = (text) => {
    switch(text){
      case "Reset to initial":
        resetToInitial()
        break;
      case "Remove all items":
        removeAllItems()
        break;
      case "Mark all as complete":
        markAllAsComplete()
        break;
      case "Mark all as incomplete":
        markAllAsIncomplete()
        break;
    }
  } 

  return (
    <section className="button-group">
      {buttons.map((text) => (
        <Button key={text} buttonType="secondary" onClick={() => handleAllClicks(text)}>{text}</Button>
      ))}
    </section>
  );
}
