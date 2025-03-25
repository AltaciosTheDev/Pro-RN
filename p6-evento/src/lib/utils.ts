import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function capitalize(text: string){
  if (!text) {
    throw new Error('Text is undefined or empty');
  }
  return text.charAt(0).toUpperCase() + text.substring(1)
}


export function determineLength<T>(items:T[]):number{
  return items.length
}