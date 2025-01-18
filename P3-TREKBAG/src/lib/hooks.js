import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContextProvider";

export function useItemsContext () {
    const context = useContext(ItemsContext)

    if(!context) {
        throw new Error(
            "UseItemsContext must be used within an ItemsContextProvider"  
        )
    }
    return context
}