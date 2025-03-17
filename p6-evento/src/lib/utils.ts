import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import { Evento } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function capitalize(text: string){
  return text.charAt(0).toUpperCase() + text.substring(1)
}

export async function getEvents(city: string) {
  const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,{next:{revalidate:300}})
  const events: Evento[] = await response.json()

  return events
}

export async function getEvent(slug: string){
  const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`)
  const event: Evento = await response.json()
  return event
}