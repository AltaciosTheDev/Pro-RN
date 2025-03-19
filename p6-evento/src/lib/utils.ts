import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import prisma from "./db";

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
  //const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,{next:{revalidate:300}})
  //const events: Evento[] = await response.json()
  const events = await prisma.evento.findMany({
    where:{
      city: city === "all"? undefined :capitalize(city) //must match exactly 
    },
    orderBy: {
      date: "asc"
    }
  })
  return events
}

export async function getEvent(slug: string){
  // const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`)
  // const event: Evento = await response.json()

  //DIFFERENCE B/C of NEXT - without it we would need to fetch normally through a route
  const event = await prisma.evento.findUnique({
    where:{
      slug:slug
    }
  })
  return event
}